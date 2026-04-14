(function () {
  var isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');

  // ── Moon/Sun toggle — top right ───────────────────────────────────
  var btn = document.createElement('button');
  btn.id = 'glow-theme-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');
  btn.style.cssText = [
    'position:fixed', 'top:16px', 'right:16px', 'z-index:99999',
    'width:30px', 'height:30px', 'border-radius:50%',
    'border:1px solid #ddd', 'background:#fff',
    'font-size:14px', 'line-height:30px', 'text-align:center',
    'cursor:pointer', 'padding:0',
    'box-shadow:0 1px 6px rgba(0,0,0,0.08)',
    'transition:background 0.2s,border-color 0.2s',
    'font-family:sans-serif'
  ].join(';');

  // ── Back button — below moon, right aligned (non-index only) ──────
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

  // ── Theme application ─────────────────────────────────────────────
  function applyTheme(dark) {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      btn.textContent = '☀';
      btn.style.background = '#1a1a1a';
      btn.style.borderColor = '#333';
      btn.style.color = '#fff';
      if (back) { back.style.background = '#141414'; back.style.borderColor = '#2a2a2a'; }
    } else {
      document.documentElement.removeAttribute('data-theme');
      btn.textContent = '🌙';
      btn.style.background = '#fff';
      btn.style.borderColor = '#ddd';
      btn.style.color = '#333';
      if (back) { back.style.background = '#fff'; back.style.borderColor = '#e0e0e0'; }
    }
    localStorage.setItem('glow-theme', dark ? 'dark' : 'light');
  }

  btn.addEventListener('click', function () {
    applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
  });

  // Apply saved preference before paint
  applyTheme(localStorage.getItem('glow-theme') === 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(btn);
    if (back) document.body.appendChild(back);
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark');
  });
})();
