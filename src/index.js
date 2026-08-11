import {
  clearSessionCookie,
  createSessionToken,
  hashPassword,
  hashSessionToken,
  normalizeEmail,
  readCookie,
  sameOriginOrNonBrowser,
  sessionCookie,
  sessionExpiry,
  validatePassword,
  verifyPassword,
} from './security.js';

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' };
const MAX_JSON_BODY_BYTES = 64 * 1024;
const DUMMY_PASSWORD_HASH = 'pbkdf2-sha256$310000$Ho4IA8tU5tt+PSPVV9ST/g==$KEt6Ci+jY9spJSJcxTOdiRc4FuiQ73azzMDJPa79VnU=';

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...JSON_HEADERS, 'Cache-Control': 'no-store', ...headers },
  });
}

function publicJson(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...JSON_HEADERS, 'Cache-Control': 'public, max-age=60' },
  });
}

async function bodyJson(request) {
  const type = request.headers.get('Content-Type') ?? '';
  if (!type.toLowerCase().startsWith('application/json')) throw new Error('invalid_content_type');
  const declaredLength = Number(request.headers.get('Content-Length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_JSON_BODY_BYTES) {
    throw new Error('request_body_too_large');
  }

  const reader = request.body?.getReader();
  if (!reader) throw new Error('invalid_json');
  const chunks = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_JSON_BODY_BYTES) {
      await reader.cancel();
      throw new Error('request_body_too_large');
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

function invalidJsonResponse(error) {
  if (error?.message === 'request_body_too_large') return json({ error: 'request_body_too_large' }, 413);
  return json({ error: 'invalid_json_request' }, 400);
}

function validEmail(email) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function getSession(request, env) {
  const token = readCookie(request, 'hl_session');
  if (!token) return null;
  const tokenHash = await hashSessionToken(token);
  const now = new Date().toISOString();
  const row = await env.DB.prepare(`
    SELECT s.id AS session_id, s.user_id, s.expires_at, u.email
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ? AND s.expires_at > ?
  `).bind(tokenHash, now).first();
  if (!row) return null;
  await env.DB.prepare('UPDATE sessions SET last_seen_at = ? WHERE id = ?').bind(now, row.session_id).run();
  return row;
}

async function requireSession(request, env) {
  const session = await getSession(request, env);
  if (!session) return { error: json({ error: 'authentication_required' }, 401) };
  return { session };
}

async function createSession(env, userId) {
  const rawToken = createSessionToken();
  const tokenHash = await hashSessionToken(rawToken);
  const now = new Date();
  const expires = sessionExpiry(now);
  await env.DB.prepare(`
    INSERT INTO sessions (id, user_id, token_hash, created_at, expires_at, last_seen_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(crypto.randomUUID(), userId, tokenHash, now.toISOString(), expires.toISOString(), now.toISOString()).run();
  return { rawToken, expires };
}

async function register(request, env) {
  if (!sameOriginOrNonBrowser(request)) return json({ error: 'invalid_origin' }, 403);
  let input;
  try { input = await bodyJson(request); } catch (error) { return invalidJsonResponse(error); }
  const email = normalizeEmail(input.email);
  const password = input.password;
  if (!validEmail(email)) return json({ error: 'invalid_email' }, 400);
  if (!validatePassword(password)) return json({ error: 'password_must_be_12_to_128_characters' }, 400);
  const exists = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
  if (exists) return json({ error: 'account_already_exists' }, 409);
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const passwordHash = await hashPassword(password);
  try {
    await env.DB.prepare(`
      INSERT INTO users (id, email, password_hash, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `).bind(id, email, passwordHash, now, now).run();
  } catch {
    return json({ error: 'account_already_exists' }, 409);
  }
  const session = await createSession(env, id);
  return json({ user: { id, email } }, 201, { 'Set-Cookie': sessionCookie(session.rawToken, session.expires) });
}

async function login(request, env) {
  if (!sameOriginOrNonBrowser(request)) return json({ error: 'invalid_origin' }, 403);
  let input;
  try { input = await bodyJson(request); } catch (error) { return invalidJsonResponse(error); }
  const email = normalizeEmail(input.email);
  const password = input.password;
  if (!validEmail(email) || typeof password !== 'string') return json({ error: 'invalid_credentials' }, 401);
  const user = await env.DB.prepare('SELECT id, email, password_hash FROM users WHERE email = ?').bind(email).first();
  const passwordMatches = await verifyPassword(password, user?.password_hash ?? DUMMY_PASSWORD_HASH);
  if (!user || !passwordMatches) return json({ error: 'invalid_credentials' }, 401);
  const session = await createSession(env, user.id);
  return json({ user: { id: user.id, email: user.email } }, 200, { 'Set-Cookie': sessionCookie(session.rawToken, session.expires) });
}

async function logout(request, env) {
  if (!sameOriginOrNonBrowser(request)) return json({ error: 'invalid_origin' }, 403);
  const token = readCookie(request, 'hl_session');
  if (token) {
    const tokenHash = await hashSessionToken(token);
    await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(tokenHash).run();
  }
  return json({ ok: true }, 200, { 'Set-Cookie': clearSessionCookie() });
}

async function me(request, env) {
  const auth = await requireSession(request, env);
  if (auth.error) return auth.error;
  return json({ user: { id: auth.session.user_id, email: auth.session.email } });
}

async function courses(env) {
  const { results } = await env.DB.prepare(`
    SELECT id, slug, title, description
    FROM courses
    WHERE published = 1
    ORDER BY sort_order, title
  `).all();
  return publicJson({ courses: results });
}

async function courseResources(env, slug) {
  const course = await env.DB.prepare('SELECT id, slug, title FROM courses WHERE slug = ? AND published = 1').bind(slug).first();
  if (!course) return publicJson({ error: 'course_not_found' }, 404);
  const { results } = await env.DB.prepare(`
    SELECT id, slug, title, description, resource_type, version
    FROM course_resources
    WHERE course_id = ? AND published = 1
    ORDER BY sort_order, title
  `).bind(course.id).all();
  return publicJson({ course, resources: results });
}

async function myLearning(request, env) {
  const auth = await requireSession(request, env);
  if (auth.error) return auth.error;
  const { results } = await env.DB.prepare(`
    SELECT c.id, c.slug, c.title, c.description, uc.added_at, uc.updated_at
    FROM user_courses uc
    JOIN courses c ON c.id = uc.course_id
    WHERE uc.user_id = ? AND uc.active = 1 AND c.published = 1
    ORDER BY uc.updated_at DESC, c.sort_order, c.title
  `).bind(auth.session.user_id).all();
  return json({ courses: results });
}

async function addToMyLearning(request, env, slug) {
  if (!sameOriginOrNonBrowser(request)) return json({ error: 'invalid_origin' }, 403);
  const auth = await requireSession(request, env);
  if (auth.error) return auth.error;
  const course = await env.DB.prepare('SELECT id, slug, title FROM courses WHERE slug = ? AND published = 1').bind(slug).first();
  if (!course) return json({ error: 'course_not_found' }, 404);
  const now = new Date().toISOString();
  await env.DB.prepare(`
    INSERT INTO user_courses (user_id, course_id, active, added_at, removed_at, updated_at)
    VALUES (?, ?, 1, ?, NULL, ?)
    ON CONFLICT(user_id, course_id) DO UPDATE SET
      active = 1,
      removed_at = NULL,
      updated_at = excluded.updated_at
  `).bind(auth.session.user_id, course.id, now, now).run();
  return json({ course, active: true });
}

async function removeFromMyLearning(request, env, slug) {
  if (!sameOriginOrNonBrowser(request)) return json({ error: 'invalid_origin' }, 403);
  const auth = await requireSession(request, env);
  if (auth.error) return auth.error;
  const course = await env.DB.prepare('SELECT id FROM courses WHERE slug = ?').bind(slug).first();
  if (!course) return json({ error: 'course_not_found' }, 404);
  const now = new Date().toISOString();
  await env.DB.prepare(`
    UPDATE user_courses
    SET active = 0, removed_at = ?, updated_at = ?
    WHERE user_id = ? AND course_id = ?
  `).bind(now, now, auth.session.user_id, course.id).run();
  return json({ slug, active: false });
}

function methodNotAllowed() {
  return json({ error: 'method_not_allowed' }, 405);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/api/health') return publicJson({ ok: true });
    if (path === '/api/auth/register') return request.method === 'POST' ? register(request, env) : methodNotAllowed();
    if (path === '/api/auth/login') return request.method === 'POST' ? login(request, env) : methodNotAllowed();
    if (path === '/api/auth/logout') return request.method === 'POST' ? logout(request, env) : methodNotAllowed();
    if (path === '/api/me') return request.method === 'GET' ? me(request, env) : methodNotAllowed();
    if (path === '/api/courses') return request.method === 'GET' ? courses(env) : methodNotAllowed();
    if (path === '/api/my-learning') return request.method === 'GET' ? myLearning(request, env) : methodNotAllowed();

    const resourceMatch = path.match(/^\/api\/courses\/([^/]+)\/resources$/);
    if (resourceMatch) return request.method === 'GET' ? courseResources(env, decodeURIComponent(resourceMatch[1])) : methodNotAllowed();

    const myLearningMatch = path.match(/^\/api\/my-learning\/([^/]+)$/);
    if (myLearningMatch) {
      const slug = decodeURIComponent(myLearningMatch[1]);
      if (request.method === 'PUT') return addToMyLearning(request, env, slug);
      if (request.method === 'DELETE') return removeFromMyLearning(request, env, slug);
      return methodNotAllowed();
    }

    return json({ error: 'not_found' }, 404);
  },
};
