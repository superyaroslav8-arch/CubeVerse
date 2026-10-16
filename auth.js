// ===== Авторизация (localStorage) =====

function getUsers() {
  try { return JSON.parse(localStorage.getItem('ks_users') || '{}'); }
  catch { return {}; }
}

function saveUsers(users) {
  localStorage.setItem('ks_users', JSON.stringify(users));
}

function getCurrentUser() {
  return localStorage.getItem('ks_current') || null;
}

function setCurrentUser(name) {
  if (name) localStorage.setItem('ks_current', name);
  else localStorage.removeItem('ks_current');
}

function updateAuthUI() {
  const area = document.getElementById('authArea');
  if (!area) return;
  const user = getCurrentUser();

  if (user) {
    area.innerHTML = `
      <div class="user-badge">
        <div class="avatar">${user[0].toUpperCase()}</div>
        <span>${user}</span>
      </div>
      <button class="btn btn-ghost" onclick="logout()">Выйти</button>
    `;
  } else {
    area.innerHTML = `
      <button class="btn btn-ghost" onclick="openAuth('login')">Войти</button>
      <button class="btn btn-primary" onclick="openAuth('register')">Регистрация</button>
    `;
  }
}

function openAuth(mode) {
  document.getElementById('authModal').classList.add('show');
  if (mode === 'register') showRegister();
  else showLogin();
  document.getElementById('authError').classList.remove('show');
}

function closeAuth() {
  document.getElementById('authModal').classList.remove('show');
}

function showLogin() {
  document.getElementById('modalTitle').textContent = 'Вход';
  document.getElementById('modalSubtitle').textContent = 'Войди в свой аккаунт';
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('authError').classList.remove('show');
}

function showRegister() {
  document.getElementById('modalTitle').textContent = 'Регистрация';
  document.getElementById('modalSubtitle').textContent = 'Создай новый аккаунт';
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('authError').classList.remove('show');
}

function showError(msg) {
  const el = document.getElementById('authError');
  el.textContent = msg;
  el.classList.add('show');
}

function doRegister() {
  const name = document.getElementById('regName').value.trim();
  const pass = document.getElementById('regPass').value;
  const pass2 = document.getElementById('regPass2').value;

  if (!name || name.length < 2) return showError('Логин слишком короткий');
  if (!pass || pass.length < 3) return showError('Пароль слишком короткий');
  if (pass !== pass2) return showError('Пароли не совпадают');

  const users = getUsers();
  if (users[name.toLowerCase()]) return showError('Такой логин уже занят');

  users[name.toLowerCase()] = { name, pass };
  saveUsers(users);
  setCurrentUser(name);
  closeAuth();
  updateAuthUI();
}

function doLogin() {
  const name = document.getElementById('loginName').value.trim();
  const pass = document.getElementById('loginPass').value;

  if (!name || !pass) return showError('Заполни все поля');

  const users = getUsers();
  const user = users[name.toLowerCase()];

  if (!user || user.pass !== pass) return showError('Неверный логин или пароль');

  setCurrentUser(user.name);
  closeAuth();
  updateAuthUI();
}

function logout() {
  setCurrentUser(null);
  updateAuthUI();
}

// Закрытие по клику вне модалки
document.addEventListener('click', e => {
  const modal = document.getElementById('authModal');
  if (e.target === modal) closeAuth();
});
