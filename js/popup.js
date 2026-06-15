(function () {
  if (sessionStorage.getItem('sst-promo-dismissed')) return;

  var overlay = document.createElement('div');
  overlay.className = 'promo-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', '10% off promotion');
  overlay.innerHTML =
    '<div class="promo-modal">' +
      '<button type="button" class="promo-close" aria-label="Close">&times;</button>' +
      '<a href="shop.html" id="promoLink">' +
        '<img src="assets/promo-10off.png" alt="10% off your order — use code SpeedST10">' +
      '</a>' +
    '</div>';

  function close() {
    overlay.classList.remove('show');
    sessionStorage.setItem('sst-promo-dismissed', '1');
    setTimeout(function () { overlay.remove(); }, 260);
  }

  overlay.querySelector('.promo-close').addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    close();
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('show')) close();
  });

  document.body.appendChild(overlay);

  setTimeout(function () {
    overlay.classList.add('show');
  }, 1500);
})();
