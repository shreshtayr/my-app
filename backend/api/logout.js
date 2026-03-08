const { sessions, clearSessionCookie, parseCookies, writeJson } = require('./_lib/authStore');

module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    writeJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const cookies = parseCookies(req.headers.cookie || '');
  const sid = cookies.auth_sid;
  if (sid) {
    sessions.delete(sid);
  }
  clearSessionCookie(res);
  writeJson(res, 200, { ok: true });
};
