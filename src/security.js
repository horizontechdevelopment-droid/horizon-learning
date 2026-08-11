const encoder = new TextEncoder();
const PBKDF2_ITERATIONS = 310000;
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

function toBase64(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function fromBase64(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function randomBytes(length) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

export function normalizeEmail(email) {
  return String(email ?? '').trim().toLowerCase();
}

export function validatePassword(password) {
  if (typeof password !== 'string') return false;
  return password.length >= 12 && password.length <= 128;
}

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const material = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: PBKDF2_ITERATIONS },
    material,
    256
  );
  return `pbkdf2-sha256$${PBKDF2_ITERATIONS}$${toBase64(salt)}$${toBase64(new Uint8Array(bits))}`;
}

export async function verifyPassword(password, encoded) {
  const [algorithm, iterationsText, saltText, expectedText] = String(encoded ?? '').split('$');
  if (algorithm !== 'pbkdf2-sha256') return false;
  const iterations = Number(iterationsText);
  if (!Number.isInteger(iterations) || iterations < 100000) return false;
  const salt = fromBase64(saltText);
  const expected = fromBase64(expectedText);
  const material = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const actual = new Uint8Array(await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
    material,
    expected.length * 8
  ));
  if (actual.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < actual.length; i += 1) mismatch |= actual[i] ^ expected[i];
  return mismatch === 0;
}

export function createSessionToken() {
  return toBase64(randomBytes(32)).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

export async function hashSessionToken(token) {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(token));
  return toBase64(new Uint8Array(digest));
}

export function sessionExpiry(now = new Date()) {
  return new Date(now.getTime() + SESSION_TTL_SECONDS * 1000);
}

export function sessionCookie(token, expires) {
  return `hl_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=${expires.toUTCString()}`;
}

export function clearSessionCookie() {
  return 'hl_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0';
}

export function readCookie(request, name) {
  const cookie = request.headers.get('Cookie') ?? '';
  for (const item of cookie.split(';')) {
    const [key, ...value] = item.trim().split('=');
    if (key === name) return value.join('=');
  }
  return null;
}

export function sameOriginOrNonBrowser(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return true;
  return origin === new URL(request.url).origin;
}
