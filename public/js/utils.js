// ── Shared utility functions ──

function showToast(msg, type = 'success') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.borderLeftColor = type === 'error' ? '#ef4444' : '#22c55e';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

function showAlert(id, msg, type = 'error') {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = `alert alert-${type} show`;
  el.textContent = msg;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideAlert(id) {
  const el = document.getElementById(id);
  if (el) el.className = 'alert';
}

function validateField(inputId, errorMsg) {
  const input = document.getElementById(inputId);
  if (!input) return true;
  const group = input.closest('.form-group');
  const errEl = group ? group.querySelector('.field-error') : null;
  if (!input.value.trim()) {
    if (group) group.classList.add('error');
    if (errEl) errEl.textContent = errorMsg || 'This field is required.';
    return false;
  }
  if (group) group.classList.remove('error');
  return true;
}

function validateEmail(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return true;
  const group = input.closest('.form-group');
  const errEl = group ? group.querySelector('.field-error') : null;
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
  if (!valid) {
    if (group) group.classList.add('error');
    if (errEl) errEl.textContent = 'Please enter a valid email address.';
    return false;
  }
  if (group) group.classList.remove('error');
  return true;
}

function validatePassword(inputId, minLen = 6) {
  const input = document.getElementById(inputId);
  if (!input) return true;
  const group = input.closest('.form-group');
  const errEl = group ? group.querySelector('.field-error') : null;
  if (input.value.length < minLen) {
    if (group) group.classList.add('error');
    if (errEl) errEl.textContent = `Password must be at least ${minLen} characters.`;
    return false;
  }
  if (group) group.classList.remove('error');
  return true;
}

// Save to sessionStorage (simulate login state for prototype)
function saveSession(user) {
  sessionStorage.setItem('sc_user', JSON.stringify(user));
}

function getSession() {
  const u = sessionStorage.getItem('sc_user');
  return u ? JSON.parse(u) : null;
}

function clearSession() {
  sessionStorage.removeItem('sc_user');
}

function requireAuth(redirectTo = '/login') {
  const user = getSession();
  if (!user) window.location.href = redirectTo;
  return user;
}

function logout() {
  clearSession();
  window.location.href = '/';
}

// Post JSON helper
async function postJSON(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// Step form progress updater
function setStep(steps, current) {
  steps.forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i < current) s.classList.add('done');
    else if (i === current) s.classList.add('active');
  });
}

// Password toggle
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? '👁' : '🙈';
    });
  });
});
