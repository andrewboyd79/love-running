(function () {
  'use strict';
  var buttons = document.querySelectorAll('.filter-btn');
  var sections = document.querySelectorAll('.gallery-section[data-type]');

  if (!buttons.length) return;

  // Populate photo counts in filter buttons
  buttons.forEach(function (btn) {
    var filter = btn.dataset.filter;
    var countEl = btn.querySelector('.filter-count');
    if (!countEl) return;
    if (filter === 'all') {
      countEl.textContent = document.querySelectorAll('.gallery-section[data-type] .photo').length;
    } else {
      var sec = document.querySelector('.gallery-section[data-type="' + filter + '"]');
      countEl.textContent = sec ? sec.querySelectorAll('.photo').length : 0;
    }
  });

  // Filter on click
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.dataset.filter;
      sections.forEach(function (sec) {
        sec.hidden = filter !== 'all' && sec.dataset.type !== filter;
      });
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });
}());
