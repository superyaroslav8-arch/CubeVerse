function getUsers(){try{return JSON.parse(localStorage.getItem('ks_users')||'{}')}catch{return{}}}
function saveUsers(u){localStorage.setItem('ks_users',JSON.stringify(u))}
function getUser(){return localStorage.getItem('ks_user')||null}
function setUser(n){n?localStorage.setItem('ks_user',n):localStorage.removeItem('ks_user')}

function getProgress(){
  const u=getUser();if(!u)return{};
  try{return JSON.parse(localStorage.getItem('ks_prog_'+u)||'{}')}catch{return{}}
}
function saveProgress(data){
  const u=getUser();if(!u)return;
  localStorage.setItem('ks_prog_'+u,JSON.stringify(data));
}
function setScore(game,score){
  const p=getProgress();
  if(!p[game]||score>p[game]){p[game]=score;saveProgress(p)}
}
function getScore(game){return getProgress()[game]||0}

function updateAuthUI(){
  const a=document.getElementById('authArea');if(!a)return;
  const u=getUser();
  if(u){
    a.innerHTML=`<div class="user-badge"><div class="ava">${u[0].toUpperCase()}</div><span>${u}</span></div>
      <button class="btn btn-ghost" onclick="logout()">Выйти</button>`;
  }else{
    a.innerHTML=`<button class="btn btn-ghost" onclick="openAuth('login')">Войти</button>
      <button class="btn btn-primary" onclick="openAuth('reg')">Регистрация</button>`;
  }
}
function openAuth(m){document.getElementById('authModal').classList.add('show');m==='reg'?showReg():showLogin();document.getElementById('authErr').classList.remove('show')}
function closeAuth(){document.getElementById('authModal').classList.remove('show')}
function showLogin(){document.getElementById('mTitle').textContent='Вход';document.getElementById('mSub').textContent='Войди, чтобы сохранять прогресс';document.getElementById('loginForm').style.display='block';document.getElementById('regForm').style.display='none';document.getElementById('authErr').classList.remove('show')}
function showReg(){document.getElementById('mTitle').textContent='Регистрация';document.getElementById('mSub').textContent='Создай аккаунт для сохранения';document.getElementById('loginForm').style.display='none';document.getElementById('regForm').style.display='block';document.getElementById('authErr').classList.remove('show')}
function err(m){const e=document.getElementById('authErr');e.textContent=m;e.classList.add('show')}

function doReg(){
  const n=document.getElementById('regName').value.trim(),p=document.getElementById('regPass').value,p2=document.getElementById('regPass2').value;
  if(n.length<2)return err('Логин слишком короткий');
  if(p.length<3)return err('Пароль слишком короткий');
  if(p!==p2)return err('Пароли не совпадают');
  const u=getUsers();
  if(u[n.toLowerCase()])return err('Логин уже занят');
  u[n.toLowerCase()]={name:n,pass:p};saveUsers(u);setUser(n);closeAuth();updateAuthUI();
}
function doLogin(){
  const n=document.getElementById('loginName').value.trim(),p=document.getElementById('loginPass').value;
  if(!n||!p)return err('Заполни все поля');
  const u=getUsers()[n.toLowerCase()];
  if(!u||u.pass!==p)return err('Неверный логин или пароль');
  setUser(u.name);closeAuth();updateAuthUI();
}
function logout(){setUser(null);updateAuthUI()}
document.addEventListener('click',e=>{if(e.target.id==='authModal')closeAuth()});
