(function () {
  // Create toggle button
  var btn = document.createElement('button');
  btn.id = 'glow-theme-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');
  btn.style.cssText = [
    'position:fixed', 'top:16px', 'right:20px', 'z-index:99999',
    'width:34px', 'height:34px', 'border-radius:50%',
    'border:1px solid #ddd', 'background:#fff',
    'font-size:16px', 'line-height:34px', 'text-align:center',
    'cursor:pointer', 'padding:0',
    'box-shadow:0 1px 6px rgba(0,0,0,0.1)',
    'transition:all 0.2s',
    'font-family:sans-serif'
  ].join(';');

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      btn.textContent = '☀';
      btn.style.background = '#1a1a1a';
      btn.style.borderColor = '#333';
      btn.style.color = '#fff';
    } else {
      document.documentElement.removeAttribute('data-theme');
      btn.textContent = '🌙';
      btn.style.background = '#fff';
      btn.style.borderColor = '#ddd';
      btn.style.color = '#333';
    }
    localStorage.setItem('glow-theme', dark ? 'dark' : 'light');
  }

  btn.addEventListener('click', function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(!isDark);
  });

  // Apply saved theme before paint
  var saved = localStorage.getItem('glow-theme');
  applyTheme(saved === 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(btn);
    // Re-apply so button is correct after DOM ready
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark');
  });
})();
