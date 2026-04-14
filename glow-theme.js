(function () {
  var isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');

  // ── Moon/Sun toggle ──────────────────────────────────────────────
  var btn = document.createElement('button');
  btn.id = 'glow-theme-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');

  var baseStyle = [
    'position:fixed', 'top:16px', 'right:20px', 'z-index:99999',
    'width:34px', 'height:34px', 'border-radius:50%',
    'border:1px solid #ddd', 'background:#fff',
    'font-size:16px', 'line-height:34px', 'text-align:center',
    'cursor:pointer', 'padding:0',
    'box-shadow:0 1px 6px rgba(0,0,0,0.1)',
    'transition:all 0.2s',
    'font-family:sans-serif'
  ].join(';');
  btn.style.cssText = baseStyle;

  // ── Back button (non-index pages only) ───────────────────────────
  var back = null;
  if (!isIndex) {
    back = document.createElement('a');
    back.href = 'index.html';
    back.className = 'glow-tools-back';
    back.textContent = '← All Tools';
    back.style.cssText = [
      'position:fixed', 'top:58px', 'right:14px', 'z-index:99998',
      'background:#fff', 'border:1px solid #e0e0e0',
      'color:#ff1482', 'border-radius:12px',
      'font-size:10px', 'font-weight:700', 'letter-spacing:0.12em',
      'text-transform:uppercase', 'text-decoration:none',
      'padding:5px 11px',
      'box-shadow:0 1px 6px rgba(0,0,0,0.08)',
      'transition:all 0.2s',
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
      btn.style.boxShadow = '0 1px 6px rgba(0,0,0,0.4)';
      if (back) {
        back.style.background = '#141414';
        back.style.borderColor = '#2a2a2a';
        back.style.boxShadow = '0 1px 6px rgba(0,0,0,0.4)';
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      btn.textContent = '🌙';
      btn.style.background = '#fff';
      btn.style.borderColor = '#ddd';
      btn.style.color = '#333';
      btn.style.boxShadow = '0 1px 6px rgba(0,0,0,0.1)';
      if (back) {
        back.style.background = '#fff';
        back.style.borderColor = '#e0e0e0';
        back.style.boxShadow = '0 1px 6px rgba(0,0,0,0.08)';
      }
    }
    localStorage.setItem('glow-theme', dark ? 'dark' : 'light');
  }

  btn.addEventListener('click', function () {
    applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
  });

  // Apply saved preference immediately (before paint)
  var saved = localStorage.getItem('glow-theme');
  applyTheme(saved === 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(btn);
    if (back) document.body.appendChild(back);
    // Re-sync button appearance after DOM ready
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark');
  });
})();
