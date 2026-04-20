(function () {
  'use strict';
  var section = document.querySelector('.events-section');
  if (!section) return;

  fetch('data/events.json')
    .then(function (r) { return r.json(); })
    .then(function (events) {
      if (!events.length) return;
      var list = section.querySelector('.events-list');
      list.innerHTML = '';
      events.forEach(function (ev) {
        var d = new Date(ev.date + 'T00:00:00');
        var day = String(d.getDate()).padStart(2, '0');
        var mon = d.toLocaleString('en-IE', { month: 'short' }).toUpperCase();
        var linkHtml = ev.link
          ? '<a class="event-link" href="' + ev.link + '" target="_blank" rel="noopener">Register \u2192</a>'
          : '';
        var locHtml = ev.location
          ? '<div class="event-loc">' + ev.location + '</div>'
          : '';
        var descHtml = ev.description
          ? '<div class="event-desc">' + ev.description + '</div>'
          : '';
        list.insertAdjacentHTML('beforeend',
          '<li class="event-card">' +
            '<div class="event-date-badge">' +
              '<div class="event-date-day">' + day + '</div>' +
              '<div class="event-date-mon">' + mon + '</div>' +
            '</div>' +
            '<div class="event-body">' +
              '<div class="event-name">' + ev.title + '</div>' +
              locHtml + descHtml +
            '</div>' +
            linkHtml +
          '</li>'
        );
      });
    })
    .catch(function () { /* keep static fallback on error */ });
}());
