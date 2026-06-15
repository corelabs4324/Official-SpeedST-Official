(function () {
  var FALLBACKS = {
    'line-blackout-plates.png': 'kit-dual.png',
    'line-underglow.png': 'underglow-car.png',
    'line-interior-glow.png': 'interior-glow-car.png',
    'kit-dual-dark.png': 'kit-dual.png',
    'hero-lifestyle-hypercar.png': 'lifestyle-rear.png',
    'underglow-pro-marketing.png': 'underglow-pro-kit.png',
    'interior-glow-full-kit.png': 'interior-glow-kit.png',
    'bundle-plates-underglow-interior.png': 'bundle-hero.png',
    'lifestyle-underglow-m3.png': 'lifestyle-rear.png',
    'underglow-gtr-banner.png': 'underglow-pro-kit.png',
    'underglow-porsche-banner.png': 'underglow-pro-kit.png',
    'interior-installed.png': 'interior-glow-open-box.png',
    'meets-night-booth.png': 'meets-hero.png',
    'meets-warehouse.png': 'meets-hero.png'
  };

  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG' || img.dataset.assetFallback) return;
    var src = img.currentSrc || img.src || '';
    var match = src.match(/\/assets\/([^/?#]+)$/);
    if (!match) return;
    var fb = FALLBACKS[match[1]];
    if (!fb) return;
    img.dataset.assetFallback = '1';
    img.src = src.replace(/\/[^/]+$/, '/' + fb);
  }, true);
})();
