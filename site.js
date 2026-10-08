/* Offramp Software — shared behavior: mobile nav, FAQ open/close animation. */

(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;

  function close() {
    btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    document.body.classList.toggle('nav-open', !open);
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();

(function () {
  var items = document.querySelectorAll('.faq details');
  if (!items.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  items.forEach(function (d) {
    var summary = d.querySelector('summary');
    var body = d.querySelector('.faq-body');
    if (!summary || !body || !body.animate) return;

    summary.addEventListener('click', function (e) {
      if (reduce.matches) return; /* native instant toggle */
      e.preventDefault();
      if (d.dataset.animating) return;
      d.dataset.animating = '1';

      if (d.open) {
        var anim = body.animate(
          [
            { height: body.offsetHeight + 'px', opacity: 1, paddingBottom: '1.3rem' },
            { height: '0px', opacity: 0, paddingBottom: '0rem' }
          ],
          { duration: 200, easing: 'ease' }
        );
        anim.onfinish = function () {
          d.open = false;
          delete d.dataset.animating;
        };
      } else {
        d.open = true;
        var h = body.offsetHeight;
        var anim2 = body.animate(
          [
            { height: '0px', opacity: 0, paddingBottom: '0rem' },
            { height: h + 'px', opacity: 1, paddingBottom: '1.3rem' }
          ],
          { duration: 240, easing: 'ease' }
        );
        anim2.onfinish = function () {
          delete d.dataset.animating;
        };
      }
    });
  });
})();
