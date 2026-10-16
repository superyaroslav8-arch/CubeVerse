// ===== НЕКСУС — Общая логика =====

const DEFAULT_GAMES = [
  { id: 'obby', name: 'Obby Adventure', desc: 'Пройди сложные препятствия и доберись до финиша!', emoji: '🏃', color: 'linear-gradient(135deg,#ff6b6b,#ee5a24)', players: 1247, rating: 4.8, file: 'games/obby.html' },
  { id: 'tycoon', name: 'Click Tycoon', desc: 'Зарабатывай монеты, покупай улучшения и стань самым богатым!', emoji: '💰', color: 'linear-gradient(135deg,#f9ca24,#f0932b)', players: 892, rating: 4.6, file: 'games/tycoon.html' },
  { id: 'racing', name: 'Speed Race', desc: 'Гонки на скорость. Обгони соперников и приди первым!', emoji: '🏎️', color: 'linear-gradient(135deg,#4834d4,#686de0)', players: 654, rating: 4.5, file: 'games/racing.html' },
  { id: 'hangout', name: 'Hangout Plaza', desc: 'Гуляй, танцуй и общайся в уютном плазе!', emoji: '👫', color: 'linear-gradient(135deg,#6ab04c,#badc58)', players: 2103, rating: 4.9, file: 'games/hangout.html' },
  { id: 'pets', name: 'Pet Simulator', desc: 'Собирай питомцев, качай их и стань легендой!', emoji: '🐶', color: 'linear-gradient(135deg,#eb4d4b,#ff7979)', players: 1789, rating: 4.7, file: 'games/pets.html' },
  { id: 'obby2', name: 'Sky Obby', desc: 'Ещё один сложный паркур в небе. Не упади!', emoji: '🏗️', color: 'linear-gradient(135deg,#22a6b3,#7ed6df)', players: 543, rating: 4.4, file: 'games/obby2.html' },
  { id: 'parkour', name: 'Extreme Parkour', desc: 'Самый сложный паркур на платформе. Только для профи!', emoji: '🧗', color: 'linear-gradient(135deg,#e17055,#d63031)', players: 321, rating: 4.3, file: 'games/obby.html' },
  { id: 'farm', name: 'Ферма Кликер', desc: 'Выращивай урожай, продавай и расширяй ферму.', emoji: '🌾', color: 'linear-gradient(135deg,#00b894,#55efc4)', players: 876, rating: 4.5, file: 'games/tycoon.html' }
];

function getAllGames() {
  return DEFAULT_GAMES;
}

function getPublishedGames() {
  try {
    return JSON.parse(localStorage.getItem('nexus_published') || '[]');
  } catch { return []; }
}

function savePublishedGames(list) {
  localStorage.setItem('nexus_published', JSON.stringify(list));
}

function publishGame(game) {
  const list = getPublishedGames();
  game.id = 'user_' + Date.now();
  game.players = Math.floor(Math.random() * 50) + 1;
  game.rating = (4 + Math.random()).toFixed(1);
  game.isUser = true;
  list.unshift(game);
  savePublishedGames(list);
  return game;
}

function deletePublished(id) {
  let list = getPublishedGames().filter(g => g.id !== id);
  savePublishedGames(list);
}

function renderGameCards(containerId, games) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  games.forEach(g => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.onclick = () => {
      if (g.file) location.href = g.file;
      else if (g.template) playUserGame(g);
      else alert('Игра скоро будет доступна!');
    };

    card.innerHTML = `
      <div class="game-thumb" style="background:${g.color || 'linear-gradient(135deg,#333,#555)'}">
        ${g.emoji || '🎮'}
        <div class="players">👤 ${g.players || 0}</div>
      </div>
      <div class="game-info">
        <h3>${g.name}</h3>
        <p>${g.desc || ''}</p>
        <div class="game-meta">
          <span>⭐ ${g.rating || '4.5'}</span>
          <button class="play-btn-sm" onclick="event.stopPropagation(); ${g.file ? `location.href='${g.file}'` : `playUserGame(${JSON.stringify(g).replace(/"/g, '&quot;')})`}">Играть</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function playUserGame(g) {
  // Простой запуск пользовательской игры по шаблону
  if (g.template === 'obby') location.href = 'games/obby.html';
  else if (g.template === 'tycoon') location.href = 'games/tycoon.html';
  else if (g.template === 'racing') location.href = 'games/racing.html';
  else if (g.template === 'hangout') location.href = 'games/hangout.html';
  else if (g.template === 'pets') location.href = 'games/pets.html';
  else alert('Игра «' + g.name + '» запущена! (шаблон: ' + (g.template || 'кастом') + ')');
}

// ===== Пользователь =====
function loadUser() {
  const name = localStorage.getItem('nexus_username') || 'Игрок';
  const avatar = localStorage.getItem('nexus_avatar') || '😎';
  const elName = document.getElementById('userName');
  const elAvatar = document.getElementById('userAvatarIcon');
  if (elName) elName.textContent = name;
  if (elAvatar) elAvatar.textContent = avatar;
}

function saveUser(name, avatar) {
  if (name) localStorage.setItem('nexus_username', name);
  if (avatar) localStorage.setItem('nexus_avatar', avatar);
  loadUser();
}

// Настройки
function getSettings() {
  return JSON.parse(localStorage.getItem('nexus_settings') || '{"sound":true,"music":true,"graphics":"high","lang":"ru"}');
}

function saveSettings(s) {
  localStorage.setItem('nexus_settings', JSON.stringify(s));
}
