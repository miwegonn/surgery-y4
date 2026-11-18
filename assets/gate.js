/* Simple access gate: asks for a PIN once per device/browser. Not real security (static site). */
(function(){
  var H = '7295f252', K = 'sy4:gate';
  function fnv(s){ var h = 0x811c9dc5; for (var i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h.toString(16); }
  var ok = false; try { ok = localStorage.getItem(K) === H; } catch(e){}
  if (!ok) { try { ok = document.cookie.indexOf(K.replace(':','_') + '=' + H) >= 0; } catch(e){} }
  if (ok) return;
  var d = document.documentElement; d.classList.add('sy4-locked');
  var st = document.createElement('style');
  st.textContent = 'html.sy4-locked body>*:not(#sy4gate){display:none!important}' +
    '#sy4gate{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:16px;background:var(--bg,#f6f5f1);z-index:9999}' +
    '#sy4gate form{background:var(--surface,#fff);border:1px solid var(--line,#e2dfd6);border-radius:16px;padding:28px 24px;width:100%;max-width:340px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.08)}' +
    '#sy4gate h2{margin:6px 0 4px;font-size:20px;color:var(--ink,#1d2329)}#sy4gate p{margin:0 0 16px;color:var(--ink-3,#7a8590);font-size:14px}' +
    '#sy4gate input{width:100%;box-sizing:border-box;font-size:22px;letter-spacing:8px;text-align:center;padding:10px;border:1px solid var(--line,#e2dfd6);border-radius:10px;background:var(--surface-2,#f0eee8);color:var(--ink,#1d2329)}' +
    '#sy4gate button{margin-top:12px;width:100%;padding:11px;border:0;border-radius:10px;background:var(--accent,#0f766e);color:var(--accent-ink,#fff);font-weight:700;font-size:15px;cursor:pointer}' +
    '#sy4gate .err{color:#dc2626;min-height:20px;margin:8px 0 0;font-size:14px}';
  document.head.appendChild(st);
  function mount(){
    var g = document.createElement('div'); g.id = 'sy4gate';
    g.innerHTML = '<form><div style="font-size:34px">🔒</div><h2>Surgery Y4</h2><p>ใส่รหัสผ่านเพื่อเข้าใช้งาน (ใส่ครั้งเดียวต่อเครื่อง)</p>' +
      '<input type="password" inputmode="numeric" autocomplete="current-password" maxlength="12" aria-label="รหัสผ่าน" autofocus>' +
      '<button type="submit">เข้าเว็บ</button><div class="err"></div></form>';
    document.body.appendChild(g);
    var f = g.querySelector('form'), inp = g.querySelector('input'), err = g.querySelector('.err');
    inp.focus();
    f.onsubmit = function(e){
      e.preventDefault();
      if (fnv('sy4|' + inp.value.trim()) === H) {
        try { localStorage.setItem(K, H); } catch(x){}
        try { document.cookie = K.replace(':','_') + '=' + H + ';max-age=31536000;path=/;SameSite=Lax'; } catch(x){}
        d.classList.remove('sy4-locked'); g.remove();
      } else { err.textContent = 'รหัสไม่ถูกต้อง'; inp.value = ''; inp.focus(); }
    };
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
