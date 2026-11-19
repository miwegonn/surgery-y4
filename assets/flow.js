/* Clickable clinical flowchart renderer: SY4.flow(el, flowObject) */
(function(){
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  window.SY4 = window.SY4 || {};
  window.SY4.flow = function(el, F){
    el.classList.add('flow');
    el.innerHTML = (F.intro ? `<p class="flow-intro">${esc(F.intro)}</p>` : '') +
      `<div class="flow-grid"><div class="flow-steps">` +
      F.steps.map((s, si) => `<div class="fstep" data-s="${si}"><div class="fstep-h"><span class="fstep-n">STEP ${esc(s.l)}</span><span>${esc(s.t)}</span></div>` +
        `<div class="fnodes">` + s.nodes.map((n, ni) => `<button type="button" class="fnode t-${n.t || 'n'}" data-k="${si}-${ni}"><b>${esc(n.n)}</b>${n.s ? `<small>${esc(n.s)}</small>` : ''}</button>`).join('') + `</div></div>` +
        (si < F.steps.length - 1 ? '<div class="farrow" aria-hidden="true">↓</div>' : '')).join('') +
      `</div><aside class="fpanel" aria-live="polite"></aside></div>`;
    const grid = el.querySelector('.flow-grid'), panel = el.querySelector('.fpanel'), side = grid;
    let cur = '0-0';
    function place(){
      const narrow = el.clientWidth < 760;
      el.classList.toggle('narrow', narrow);
      if (narrow) { const st = el.querySelector(`.fstep[data-s="${cur.split('-')[0]}"]`); st.appendChild(panel); }
      else if (panel.parentNode !== side) side.appendChild(panel);
    }
    function sel(k, scroll){
      cur = k; const [si, ni] = k.split('-').map(Number), s = F.steps[si], n = s.nodes[ni];
      el.querySelectorAll('.fnode').forEach(b => b.classList.toggle('on', b.dataset.k === k));
      panel.className = 'fpanel t-' + (n.t || 'n');
      panel.innerHTML = `<div class="fpanel-h"><span class="fpanel-step">STEP ${esc(s.l)} · ${esc(s.t)}</span><h4>${esc(n.n)}</h4>${n.s ? `<p class="muted">${esc(n.s)}</p>` : ''}</div><div class="fpanel-b">${n.h}</div>`;
      place();
      if (scroll && el.classList.contains('narrow')) panel.scrollIntoView({block: 'nearest', behavior: 'smooth'});
    }
    el.querySelector('.flow-steps').addEventListener('click', e => { const b = e.target.closest('.fnode'); if (b) sel(b.dataset.k, true); });
    if (window.ResizeObserver) new ResizeObserver(place).observe(el); else window.addEventListener('resize', place);
    sel(cur, false);
  };
})();
