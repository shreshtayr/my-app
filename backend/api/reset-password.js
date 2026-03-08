const {
  users,
  updatePassword,
  normalizeUsername,
  writeJson,
  getRequestBody,
} = require('./_lib/authStore');

module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    writeJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const body = getRequestBody(req);
  const username = normalizeUsername(body.username);
  const newPassword = String(body.newPassword || '');

  if (!username || newPassword.length < 6) {
    writeJson(res, 400, { error: 'Invalid username or password' });
    return;
  }

  if (!users.has(username)) {
    writeJson(res, 404, { error: 'Username not found' });
    return;
  }

  updatePassword(username, newPassword);
  writeJson(res, 200, { ok: true });
};
