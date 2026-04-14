(function () {
  var isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');

  // ── Moon/Sun toggle (top-right) ───────────────────────────────────
  var btn = document.createElement('button');
  btn.id = 'glow-theme-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');
  btn.style.cssText = [
    'position:fixed', 'top:14px', 'right:16px', 'z-index:99999',
    'width:32px', 'height:32px', 'border-radius:50%',
    'border:1px solid #ddd', 'background:#fff',
    'font-size:15px', 'line-height:32px', 'text-align:center',
    'cursor:pointer', 'padding:0',
    'box-shadow:0 1px 6px rgba(0,0,0,0.08)',
    'transition:background 0.2s,border-color 0.2s',
    'font-family:sans-serif'
  ].join(';');

  // ── Back button — stacked below moon (non-index only) ─────────────
  var back = null;
  if (!isIndex) {
    back = document.createElement('a');
    back.href = 'index.html';
    back.className = 'glow-tools-back';
    back.textContent = '← All Tools';
    back.style.cssText = [
      'position:fixed', 'top:52px', 'right:10px', 'z-index:99998',
      'background:#fff', 'border:1px solid #e0e0e0',
      'color:#ff1482', 'border-radius:10px',
      'font-size:9px', 'font-weight:700', 'letter-spacing:0.1em',
      'text-transform:uppercase', 'text-decoration:none',
      'padding:4px 10px',
      'box-shadow:0 1px 4px rgba(0,0,0,0.07)',
      'transition:background 0.2s,border-color 0.2s',
      'font-family:Helvetica Neue,Helvetica,Arial,sans-serif',
      'white-space:nowrap'
    ].join(';');
  }

  // ── CONFIDENTIAL label — centered top (non-index only) ────────────
  var conf = null;
  if (!isIndex) {
    conf = document.createElement('div');
    conf.id = 'glow-conf-label';
    conf.textContent = 'CONFIDENTIAL';
    conf.style.cssText = [
      'position:fixed', 'top:20px', 'left:50%',
      'transform:translateX(-50%)',
      'z-index:99997',
      'font-family:Helvetica Neue,Helvetica,Arial,sans-serif',
      'font-size:10px', 'font-weight:700',
      'letter-spacing:0.22em', 'text-transform:uppercase',
      'color:#ccc', 'pointer-events:none',
      'white-space:nowrap'
    ].join(';');
  }

  // ── Theme application ─────────────────────────────────────────────
  function applyTheme(dark) {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      btn.textContent = '☀';
      btn.style.background = '#1a1a1a';
      btn.style.borderColor = '#333';
      btn.style.color = '#fff';
      if (back) { back.style.background = '#141414'; back.style.borderColor = '#2a2a2a'; }
      if (conf) conf.style.color = '#444';
    } else {
      document.documentElement.removeAttribute('data-theme');
      btn.textContent = '🌙';
      btn.style.background = '#fff';
      btn.style.borderColor = '#ddd';
      btn.style.color = '#333';
      if (back) { back.style.background = '#fff'; back.style.borderColor = '#e0e0e0'; }
      if (conf) conf.style.color = '#ccc';
    }
    localStorage.setItem('glow-theme', dark ? 'dark' : 'light');
  }

  btn.addEventListener('click', function () {
    applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
  });

  // Apply saved preference before paint
  applyTheme(localStorage.getItem('glow-theme') === 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    // Remove any "Confidential" text baked into page headers to avoid duplication
    document.querySelectorAll('.header-label, .header-right').forEach(function(el) {
      if (el.textContent.trim().toLowerCase() === 'confidential') el.style.display = 'none';
    });
    document.body.appendChild(btn);
    if (back) document.body.appendChild(back);
    if (conf) document.body.appendChild(conf);
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark');
  });
})();
