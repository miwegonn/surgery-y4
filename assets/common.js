/* Surgery Y4 — shared helpers */
(function(){
  const store = {
    get(k, d){ try{ const v = localStorage.getItem('sy4:' + k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
    set(k, v){ try{ localStorage.setItem('sy4:' + k, JSON.stringify(v)); }catch(e){} }
  };
  window.SY4 = { store };

  // theme
  const t = store.get('theme', null);
  if (t) document.documentElement.setAttribute('data-theme', t);
  window.SY4.toggleTheme = function(){
    const cur = document.documentElement.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const nx = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nx); store.set('theme', nx);
  };

  window.SY4.esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  window.SY4.cat = id => (window.CATS || []).find(c => c.id === id) || {id, name:id, icon:'•'};
  window.SY4.qs = () => new URLSearchParams(location.search);
  window.SY4.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  window.SY4.header = function(active){
    const links = [['index.html','หน้าแรก','home'],['summary.html','สรุปเนื้อหา','summary'],['flashcards.html','Flashcard & Quiz','flash'],['exam.html','ข้อสอบเก่า','exam']];
    const el = document.createElement('header');
    el.className = 'topbar';
    el.innerHTML = '<div class="topbar-in"><a class="brand" href="index.html"><span class="logo">Sx</span><span>Surgery Y4<span class="full"> · PSU</span></span></a>' +
      '<nav class="nav">' + links.map(l => `<a href="${l[0]}" class="${l[2] === active ? 'on' : ''}">${l[1]}</a>`).join('') + '</nav>' +
      '<button class="theme-btn" title="สลับโหมดมืด/สว่าง" aria-label="toggle theme">◐</button></div>';
    document.body.prepend(el);
    el.querySelector('.theme-btn').onclick = window.SY4.toggleTheme;
  };

  window.SY4.lightbox = function(src){
    const d = document.createElement('div'); d.className = 'lightbox';
    d.innerHTML = `<img src="${src}" alt="">`; d.onclick = () => d.remove(); document.body.appendChild(d);
  };
})();
