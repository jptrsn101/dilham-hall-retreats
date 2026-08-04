/* Group bookings: whole-calendar availability grid for every pod.
   Reads live availability from the same SuperControl calendar API the booking
   widget uses (public calendar key, CORS open). Booking itself stays in
   SuperControl: Book buttons preselect the pod in the widget below, and the
   tick-boxes feed the one-request group form (Luke then creates it in
   SuperControl admin as a single multi-property booking). */
(function () {
  'use strict';

  var card = document.getElementById('avail-card');
  if (!card) return;

  var API = 'https://api.supercontrol.co.uk/v3/Calendar/GetDates';
  var KEY = '90C22083FA8947B6BDBE764CD901F4E98018FBA57CDE3D5C194100A887820A345815B5CC9BF1FD21F4BB55539F0B21E97D390E91399ADB7D';
  var LAST_MONTH = new Date(2027, 11, 1); /* SuperControl publishes calendars to end of 2027 */

  var PODS = [
    { id: 633842, name: 'Water Vole', sleeps: 4, beds: 'King + bunk, open plan', group: 'tonnage' },
    { id: 633841, name: 'Moor Hen', sleeps: 4, beds: 'King + bunk, open plan', group: 'tonnage' },
    { id: 633839, name: 'Shrew', sleeps: 4, beds: 'King + bunk, open plan', group: 'tonnage' },
    { id: 633838, name: 'Kingfisher', sleeps: 4, beds: 'King + bunk, open plan', group: 'tonnage' },
    { id: 633837, name: 'Otter', sleeps: 4, beds: 'King + bunk, open plan', group: 'tonnage' },
    { id: 633853, name: 'Heron', sleeps: 4, beds: 'King + twin, 2 rooms', group: 'tonnage' },
    { id: 633854, name: 'Hedgehog', sleeps: 5, beds: 'King + single + bunk, 2 rooms', group: 'tonnage' },
    { id: 633856, name: 'Coot', sleeps: 4, beds: 'King + twin, 2 rooms', group: 'tonnage' },
    { id: 633857, name: 'Harvest Mouse', sleeps: 4, beds: 'King + twin, 2 rooms', group: 'tonnage' },
    { id: 633858, name: 'Bittern', sleeps: 5, beds: 'King + single + bunk, 2 rooms', group: 'tonnage' },
    { id: 579899, name: 'Damselfly', sleeps: 2, beds: 'King bed, hot tub', group: 'broadfen' },
    { id: 579885, name: 'Dragonfly', sleeps: 2, beds: 'King bed, hot tub', group: 'broadfen' },
    { id: 579884, name: 'Swallowtail', sleeps: 2, beds: 'King bed, hot tub', group: 'broadfen' }
  ];

  var GROUP_LABELS = {
    tonnage: 'Tonnage Bridge · waterside · families &amp; dogs welcome',
    broadfen: 'Broad Fen · couples only · adults only, no dogs'
  };

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  var DAY_INITIALS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  var today = new Date();
  var view = new Date(today.getFullYear(), today.getMonth(), 1);
  var cache = {}; /* '633853:2026-08' -> { '2026-08-14': {arrival, booked} } */
  var selected = {}; /* pod id -> pod, survives month changes */

  var monthLabel = card.querySelector('.avail-month');
  var prevBtn = card.querySelector('[data-avail-prev]');
  var nextBtn = card.querySelector('[data-avail-next]');
  var scroller = card.querySelector('.avail-scroll');
  var bar = document.getElementById('avail-bar');
  var barLabel = document.getElementById('avail-bar-label');
  var barGo = document.getElementById('avail-bar-go');
  var podsField = document.getElementById('g-pods');

  prevBtn.addEventListener('click', function () { shift(-1); });
  nextBtn.addEventListener('click', function () { shift(1); });

  function shift(dir) {
    view = new Date(view.getFullYear(), view.getMonth() + dir, 1);
    render();
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function iso(y, m, d) { return y + '-' + pad(m + 1) + '-' + pad(d); }

  function monthKey(pod) {
    return pod.id + ':' + view.getFullYear() + '-' + pad(view.getMonth() + 1);
  }

  function fetchMonth(pod, y, m, days) {
    var key = pod.id + ':' + y + '-' + pad(m + 1);
    if (cache[key]) return Promise.resolve();
    var url = API + '?cottageIDS=' + pod.id +
      '&startdate=' + iso(y, m, 1) + '&enddate=' + iso(y, m, days) + '&key=' + KEY;
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('availability request failed');
      return r.json();
    }).then(function (data) {
      var map = {};
      ((data.dates || {})[pod.id] || []).forEach(function (d) {
        map[d.dateTime] = { arrival: !!d.arrival, booked: !!d.booked };
      });
      cache[key] = map;
    });
  }

  function render() {
    var y = view.getFullYear(), m = view.getMonth();
    var days = new Date(y, m + 1, 0).getDate();

    monthLabel.textContent = MONTHS[m] + ' ' + y;
    prevBtn.disabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
    nextBtn.disabled = view >= LAST_MONTH;

    scroller.setAttribute('aria-busy', 'true');
    var token = y + '-' + m;
    render.token = token;

    Promise.all(PODS.map(function (pod) { return fetchMonth(pod, y, m, days); }))
      .then(function () {
        if (render.token !== token) return; /* user moved on to another month */
        scroller.innerHTML = buildTable(y, m, days);
        scroller.removeAttribute('aria-busy');
        wireRows();
      })
      .catch(function () {
        if (render.token !== token) return;
        scroller.innerHTML = '<p class="avail-error">The live grid could not load just now. ' +
          'The booking calendar below still works, or call <a href="tel:01692513889">01692 513889</a>.</p>';
        scroller.removeAttribute('aria-busy');
      });
  }

  function buildTable(y, m, days) {
    var todayIso = iso(today.getFullYear(), today.getMonth(), today.getDate());
    var head = '<tr><th class="avail-pod" scope="col"><span class="visually-hidden">Pod</span></th>';
    for (var d = 1; d <= days; d++) {
      var wd = DAY_INITIALS[new Date(y, m, d).getDay()];
      head += '<th scope="col"><span>' + wd + '</span><b>' + d + '</b></th>';
    }
    head += '<th class="avail-cta-col"><span class="visually-hidden">Book</span></th></tr>';

    var body = '';
    var lastGroup = '';
    PODS.forEach(function (pod) {
      if (pod.group !== lastGroup) {
        lastGroup = pod.group;
        body += '<tr class="avail-group"><td colspan="' + (days + 2) + '">' +
          GROUP_LABELS[pod.group] + '</td></tr>';
      }
      var map = cache[monthKey(pod)] || {};
      body += '<tr><th class="avail-pod" scope="row"><label class="avail-pick">' +
        '<input type="checkbox" data-pick="' + pod.id + '"' +
        (selected[pod.id] ? ' checked' : '') +
        ' aria-label="Add ' + pod.name + ' to a group request">' +
        '<span class="avail-pod-txt"><span class="avail-pod-name">' + pod.name +
        '</span><span class="avail-pod-meta">Sleeps ' + pod.sleeps + ' · ' + pod.beds +
        '</span></span></label></th>';
      for (var d = 1; d <= days; d++) {
        var date = iso(y, m, d);
        var info = map[date];
        var cls, label;
        if (date < todayIso) { cls = 'past'; label = 'past'; }
        else if (!info) { cls = 'booked'; label = 'not available'; }
        else if (info.booked && info.arrival) { cls = 'cho'; label = 'changeover, arrive this day'; }
        else if (info.booked) { cls = 'booked'; label = 'booked'; }
        else { cls = 'free'; label = 'free'; }
        body += '<td class="avail-day avail-day--' + cls + '" title="' +
          pod.name + ', ' + d + ' ' + MONTHS[m] + ': ' + label + '"></td>';
      }
      body += '<td class="avail-cta-col"><button type="button" class="avail-book" data-pod-id="' +
        pod.id + '" data-pod-name="' + pod.name + '">Book</button></td></tr>';
    });

    return '<table class="avail"><caption class="visually-hidden">Availability for ' +
      MONTHS[m] + ' ' + y + '. Green days are free. Tick pods to add them to a group request.</caption>' +
      '<thead>' + head + '</thead><tbody>' + body + '</tbody></table>';
  }

  function wireRows() {
    scroller.querySelectorAll('.avail-book').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var holder = document.getElementById('sc-widget');
        if (holder) {
          holder.setAttribute('data-calendar-preselect-id', btn.getAttribute('data-pod-id'));
          if (typeof superControlCalendarWidgetManualBootstrap === 'function') {
            superControlCalendarWidgetManualBootstrap();
          }
        }
        var note = document.getElementById('sc-widget-note');
        if (note) {
          note.textContent = 'Now booking ' + btn.getAttribute('data-pod-name') +
            '. Pick your nights below, then come back up and add the next pod.';
          note.hidden = false;
        }
        document.getElementById('book').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    scroller.querySelectorAll('[data-pick]').forEach(function (box) {
      box.addEventListener('change', function () {
        var id = box.getAttribute('data-pick');
        var pod = PODS.filter(function (p) { return String(p.id) === id; })[0];
        if (box.checked) { selected[id] = pod; } else { delete selected[id]; }
        updateBar();
      });
    });
  }

  function updateBar() {
    var pods = Object.keys(selected).map(function (id) { return selected[id]; });
    if (!bar) return;
    if (!pods.length) {
      bar.hidden = true;
      if (podsField) podsField.value = '';
      return;
    }
    var sleeps = pods.reduce(function (n, p) { return n + p.sleeps; }, 0);
    var names = pods.map(function (p) { return p.name; });
    barLabel.innerHTML = '<b>' + pods.length + (pods.length === 1 ? ' pod' : ' pods') +
      ' ticked</b> · sleeps up to ' + sleeps + ' · ' + names.join(', ');
    bar.hidden = false;
    if (podsField) {
      podsField.value = pods.map(function (p) { return p.name + ' (sleeps ' + p.sleeps + ')'; }).join(', ');
    }
  }

  if (barGo) {
    barGo.addEventListener('click', function () {
      document.getElementById('group-request').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* Group request form: sane date limits (arrival from tomorrow, departure after arrival) */
  var arrive = document.getElementById('g-arrive');
  var depart = document.getElementById('g-depart');
  if (arrive && depart) {
    var t = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    arrive.min = iso(t.getFullYear(), t.getMonth(), t.getDate());
    arrive.addEventListener('change', function () {
      if (!arrive.value) return;
      var a = new Date(arrive.value);
      a.setDate(a.getDate() + 2); /* 2 night minimum */
      depart.min = iso(a.getFullYear(), a.getMonth(), a.getDate());
      if (depart.value && depart.value < depart.min) depart.value = depart.min;
    });
  }

  render();
})();
