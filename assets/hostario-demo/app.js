(() => {
  // Only public listing photos and invented demo records are used here.
  // No private details or statistics from the reference screenshots are copied.
  const app = document.querySelector('#app');
  const baseProperties = [
    { name: 'La Boutique Residence', image: '../hospitality/boutique.jpg', city: 'Gallarate, VA' },
    { name: 'Lovely & Modern Flat', image: '../hospitality/modern.jpg', city: 'Gallarate, VA' },
    { name: 'Lovely Apartment', image: '../hospitality/residence.jpg', city: 'Gallarate, VA' }
  ];
  const samples = [
    { first: 'Emma', last: 'Martin', birth: '1994-05-18', country: 'France', doc: 'DEMO001' },
    { first: 'Lucas', last: 'Martin', birth: '1992-08-04', country: 'France', doc: 'DEMO002' },
    { first: 'Alex', last: 'Taylor', birth: '1996-03-12', country: 'United Kingdom', doc: 'DEMO003' }
  ];
  const paths = {
    house: '<path d="m2 11 10-8 10 8M17 4v3" stroke-width="2.2"/><path d="M5 10v11h5v-7h4v7h5V10l-7-5Z" fill="currentColor" stroke="none"/>',
    calendar: '<rect x="3" y="3" width="18" height="19" rx="2.5" stroke-width="2.2"/><path d="M3 8h18"/><path d="M7 12h1m4 0h1m4 0h1M7 16h1m4 0h1m4 0h1" stroke-width="2.5"/>',
    calendarTab: '<rect x="3" y="2" width="18" height="20" rx="2.5" stroke-width="2.3"/><path d="M3 6h18" stroke-width="2.5"/><text x="12" y="18" text-anchor="middle" font-size="11" font-family="-apple-system, sans-serif" font-weight="600" fill="currentColor" stroke="none">22</text>',
    person: '<circle cx="12" cy="7" r="3.5" fill="currentColor" stroke="none"/><path d="M5 21v-2a7 7 0 0 1 14 0v2Z" fill="currentColor" stroke="none"/>',
    people: '<circle cx="9" cy="7" r="3.5" fill="currentColor" stroke="none"/><circle cx="18" cy="6" r="3" fill="currentColor" stroke="none"/><path d="M1 21v-2a8 8 0 0 1 16 0v2Zm17 0v-2a9 9 0 0 0-3-6 6 6 0 0 1 8 6v2Z" fill="currentColor" stroke="none"/>',
    gear: '<path d="m10 2-.5 3-2 .9L5 4.3 2.8 7l2.1 2.2-.4 2.4L2 13l1.2 3.3 2.9-.1 1.6 1.7-.1 3 3.5 1 1.5-2.6 2.3-.3 2.2 2 2.7-2.3-1.6-2.6.8-2 3-.6V10l-3-.6-.9-2.1L19.7 5 17 2.8l-2.2 2.1-2.2-.4L11 2Z" stroke-width="1.5"/><circle cx="12" cy="12" r="5"/><path d="m9 8 3 4h5m-5 0-2 4" stroke-width="1.4"/>',
    scan: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M2 12h20"/>',
    check: '<path d="m5 12 4 4L19 6"/>', arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    back: '<path d="m15 5-7 7 7 7" stroke-width="2.6"/>', chevron: '<path d="m9 5 7 7-7 7"/>',
    plus: '<path d="M12 4v16M4 12h16" stroke-width="2.4"/>',
    doc: '<path d="M14 2H5v20h14V7Zm0 0v5h5M8 12h8M8 16h6"/>',
    shield: '<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6Z"/><path d="m8 12 3 3 5-6"/>',
    chart: '<path d="M4 20V4m0 16h17M9 16v-5m5 5V7m5 9v-8"/>',
    moon: '<path d="M20 14A9 9 0 0 1 10 3a9 9 0 1 0 10 11Z" fill="currentColor" stroke="none"/>',
    pin: '<circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><circle cx="12" cy="8" r="2" stroke="white"/><path d="M12 10v8" stroke="white"/>',
    number: '<circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><path d="m10 6-2 12m8-12-2 12M6 10h12M5 14h12" stroke="white" stroke-width="1.4"/>',
    building: '<path d="M3 21V2h11v19m0-14h7v14M1 21h22M7 6h3m-3 4h3m-3 4h3m-3 4h3m7-7h1m-1 4h1m-1 3h1"/>',
    download: '<path d="M12 2v12m-4-4 4 4 4-4M7 6H5l-3 8v7h20v-7l-3-8h-2M2 14h5l2 3h6l2-3h5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
    send: '<path d="m2 11 20-9-8 20-3-9Zm9 2L22 2" fill="currentColor" stroke-width="1"/>',
    flag: '<path d="M5 22V3c5-4 9 4 15 0v10c-6 4-10-4-15 0"/>',
    bed: '<path d="M2 21V8m20 13V8M2 17h20M5 12V4h14v8M2 12h20v5H2Z"/><path d="M6 7h4m4 0h4"/>',
    down: '<circle cx="12" cy="12" r="11" fill="currentColor" stroke="none"/><path d="M12 5v13m-5-5 5 5 5-5" stroke="white"/>',
    up: '<circle cx="12" cy="12" r="11" fill="currentColor" stroke="none"/><path d="M12 19V6m-5 5 5-5 5 5" stroke="white"/>',
    help: '<circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><path d="M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 3v.1" stroke="white"/>',
    euro: '<circle cx="12" cy="12" r="10"/><path d="M16 6a6 6 0 1 0 0 12M5 10h9M5 14h9"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.doc}</svg>`;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const dateLabel = (value, long = false) => new Date(`${value}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: long ? 'long' : 'short', ...(long ? { year: 'numeric' } : {}) });
  const fullDate = value => new Date(`${value}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const days = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
  const nights = n => `${n} ${n === 1 ? 'night' : 'nights'}`;
  const euro = n => n.toLocaleString('en-GB', { style: 'currency', currency: 'EUR' });
  const blankGuest = () => ({ first: '', last: '', birth: '', country: 'France', doc: '' });
  const newDraft = () => ({ property: null, arrival: '2026-11-09', departure: '2026-11-12', count: 1, guests: [blankGuest()], sent: false });
  const tabItems = [['properties', 'Properties', 'house'], ['checkins', 'Check-ins', 'calendarTab'], ['settings', 'Settings', 'gear']];
  let state, timer, properties;
  app.innerHTML = '<div id="screen"></div><nav class="tabs glass" aria-label="Hostario navigation"></nav>';
  const screen = app.querySelector('#screen');
  const tabBar = app.querySelector('.tabs');
  tabBar.innerHTML = `<span class="tab-lens" aria-hidden="true"></span>${tabItems.map(([key, title, symbol]) => `<button data-action="${key}">${icon(symbol)}<span>${title}</span></button>`).join('')}`;

  function reset() {
    clearTimeout(timer);
    properties = structuredClone(baseProperties);
    state = {
      screen: 'properties', tab: 'properties', step: 0, guest: 0, selectedProperty: 0, draft: newDraft(), active: 0,
      filter: 'all', statsProperty: 'all', statsPeriod: 'monthly', expanded: new Set(['2026-11']), settingsPage: '', returnScreen: 'settings',
      records: [
        { property: 0, arrival: '2026-11-09', departure: '2026-11-12', count: 2, guests: [{ ...samples[0] }, { ...samples[1] }], sent: false },
        { property: 1, arrival: '2026-10-12', departure: '2026-10-16', count: 1, guests: [{ ...samples[2] }], sent: true },
        { property: 2, arrival: '2026-09-07', departure: '2026-09-10', count: 2, guests: [{ ...samples[0] }, { ...samples[1] }], sent: true },
        { property: 0, arrival: '2026-08-14', departure: '2026-08-19', count: 1, guests: [{ ...samples[2] }], sent: true },
        { property: 1, arrival: '2026-07-03', departure: '2026-07-06', count: 1, guests: [{ ...samples[1] }], sent: true }
      ]
    };
    render();
  }
  function stage() {
    if (['detail', 'send', 'receipt', 'receipts'].includes(state.screen)) return 2;
    if (state.screen === 'scanner' || (state.screen === 'wizard' && state.step === 2)) return 1;
    return 0;
  }
  function toolbar(title, backAction, trailing = '') {
    return `<div class="toolbar">${backAction ? `<button class="icon-button glass" data-action="${backAction}" aria-label="Back">${icon('back')}</button>` : '<span></span>'}<strong>${title}</strong>${trailing || '<span></span>'}</div>`;
  }
  function rootPage(title, content, extra = '') {
    return `<div class="root-toolbar"><strong>${title}</strong>${extra}</div><div class="scroll root-scroll">${pageTitle(title)}${content}</div>`;
  }
  function pageTitle(title, subtitle = '') {
    return `<div class="page-title"><h1 tabindex="-1">${title}</h1>${subtitle ? `<p>${subtitle}</p>` : ''}</div>`;
  }
  function propertyImage(p) {
    return p.image ? `<img src="${p.image}" alt="">` : `<span class="property-placeholder">${icon('house')}</span>`;
  }
  function propertyCard(p, index, select = false) {
    return `<button class="property-card card ${select && state.draft.property === index ? 'selected' : ''}" data-action="${select ? 'select-property' : 'property'}" data-index="${index}" ${select ? `aria-pressed="${state.draft.property === index}"` : ''}>${propertyImage(p)}<span class="property-copy"><strong>${escape(p.name)}</strong><small>${icon('pin')} ${escape(p.city.toUpperCase())}</small><small>${icon('number')} Apartment ${String(index + 1).padStart(2, '0')}</small></span></button>`;
  }
  function actionBox(action, label, symbol, color) {
    return `<button class="action-box ${color}" data-action="${action}" ${action === 'add-property' && properties.length >= 5 ? 'disabled' : ''}>${icon(symbol)}<span>${label}</span></button>`;
  }
  function filterSelect(name, value, title = 'All properties') {
    return `<label class="filter-control glass">${icon('building')}<select name="${name}" aria-label="Filter ${name === 'statsProperty' ? 'statistics' : 'check-ins'} by property"><option value="all">${title}</option>${properties.map((p, i) => `<option value="${i}" ${value === String(i) ? 'selected' : ''}>${escape(p.name)}</option>`).join('')}</select><span aria-hidden="true">⌄</span></label>`;
  }
  function stayCard(r, i) {
    return `<button class="stay-card card" data-action="record" data-index="${i}"><strong>${escape(properties[r.property].name)}</strong><small>${dateLabel(r.arrival)} – ${dateLabel(r.departure)}</small><div class="guest-row">${icon('person')} ${escape(r.guests[0].first)} ${escape(r.guests[0].last)} ${r.count > 1 ? `<span>(+${r.count - 1})</span>` : ''}</div><div class="stay-meta"><span>${icon('moon')} ${nights(days(r.arrival, r.departure))}</span>${r.arrival >= '2026-11-01' ? '<span class="blue">● Upcoming</span>' : ''}<span class="service-dots"><i class="${r.sent ? 'green' : 'red'}">●</i> AW &nbsp;<i class="${r.sent ? 'green' : 'red'}">●</i> ROSS</span></div></button>`;
  }
  function checkins() {
    const filtered = state.records.map((r, i) => [r, i]).filter(([r]) => state.filter === 'all' || r.property === Number(state.filter));
    const months = [...new Set(filtered.map(([r]) => r.arrival.slice(0, 7)))].sort().reverse();
    const content = `<div class="action-bar">${actionBox('receipts', 'View receipts', 'download', 'indigo')}${actionBox('new', 'New check-in', 'plus', 'teal')}</div>${months.map(month => {
      const records = filtered.filter(([r]) => r.arrival.startsWith(month));
      const label = new Date(`${month}-01T12:00:00`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
      return `<section class="month-group"><button class="month-heading" data-action="month" data-month="${month}" aria-expanded="${state.expanded.has(month)}"><h2>${label[0].toUpperCase() + label.slice(1)}</h2><span>${records.length} ${icon('chevron')}</span></button>${state.expanded.has(month) ? records.map(([r, i]) => stayCard(r, i)).join('') : ''}</section>`;
    }).join('')}${!filtered.length ? '<p class="quiet-note">No check-ins for this property.</p>' : ''}`;
    return rootPage('Check-ins', content, filterSelect('filter', state.filter));
  }
  function chart(metric) {
    // Independently invented statistics; never derived from the user's screenshots.
    const base = metric === 'guests' ? [3, 5, 4, 8, 6, 11, 9, 14, 10, 7, 4, 0] : [310, 520, 380, 970, 660, 1210, 850, 1370, 1060, 590, 430, 0];
    const values = state.statsProperty === 'all' ? base : base.map((v, i) => Math.round(v * (.22 + ((i + Number(state.statsProperty)) % 3) * .08)));
    const shown = state.statsPeriod === 'quarterly' ? [0, 3, 6, 9].map(i => values.slice(i, i + 3).reduce((a, b) => a + b, 0)) : values;
    const labels = state.statsPeriod === 'quarterly' ? ['Q1', 'Q2', 'Q3', 'Q4'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const max = Math.ceil(Math.max(...shown) / (metric === 'guests' ? 10 : 500)) * (metric === 'guests' ? 10 : 500);
    const total = values.reduce((a, b) => a + b, 0);
    const col = 280 / shown.length;
    return `<div class="card chart-card ${metric === 'guests' ? 'blue-chart' : 'green-chart'}"><div class="chart-controls"><span>${icon(metric === 'guests' ? 'people' : 'euro')} ${metric === 'guests' ? 'Guests' : 'Revenue'}</span><label>${icon('calendar')}<select name="statsPeriod" aria-label="${metric === 'guests' ? 'Guest' : 'Revenue'} chart period"><option value="monthly" ${state.statsPeriod === 'monthly' ? 'selected' : ''}>Monthly</option><option value="quarterly" ${state.statsPeriod === 'quarterly' ? 'selected' : ''}>Quarterly</option></select></label></div><div class="chart-total"><span>Total: <strong>${metric === 'guests' ? total : euro(total)}</strong></span><span>2026</span></div><svg class="statistics-chart" viewBox="0 0 310 205" role="img" aria-label="${metric === 'guests' ? 'Guests' : 'Revenue'} by ${state.statsPeriod === 'monthly' ? 'month' : 'quarter'}, sample data"><defs><linearGradient id="bars-${metric}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="currentColor"/><stop offset="1" stop-color="currentColor" stop-opacity=".58"/></linearGradient></defs>${[0, 1, 2, 3].map(i => `<line x1="0" y1="${8 + i * 58}" x2="280" y2="${8 + i * 58}"/><text x="284" y="${12 + i * 58}" class="axis-label">${metric === 'guests' ? Math.round(max * (1 - i / 3)) : (max * (1 - i / 3) / 1000).toFixed(1) + 'k'}</text>`).join('')}${shown.map((n, i) => `<rect x="${i * col + col * .15}" y="${182 - n / max * 174}" width="${col * .7}" height="${n / max * 174}" rx="4" fill="url(#bars-${metric})"/><text x="${i * col + col / 2}" y="198" text-anchor="middle" class="axis-label">${labels[i]}</text>`).join('')}</svg></div>`;
  }
  function propertiesScreen() {
    return rootPage('Properties', `<div class="action-bar">${actionBox('add-property', 'New property', 'plus', 'orange')}</div><div class="section-heading"><h2>Your properties</h2><span class="count-badge">${properties.length}</span></div>${properties.map((p, i) => propertyCard(p, i)).join('')}<div class="section-heading stats-heading"><h2>Statistics</h2>${filterSelect('statsProperty', state.statsProperty)}</div>${chart('guests')}${chart('revenue')}`);
  }
  function propertyDetail() {
    const p = properties[state.selectedProperty];
    return `${toolbar('Properties', 'properties')}<div class="scroll detail-scroll"><div class="property-cover">${propertyImage(p)}</div>${pageTitle(escape(p.name), escape(p.city))}<h2 class="section-title">Portals</h2><div class="card"><div class="data-row"><span>Alloggiati Web</span><span class="green">Configured</span></div><div class="data-row"><span>ROSS1000</span><span class="green">Configured</span></div></div><button class="primary" data-action="new-property">New check-in ${icon('plus')}</button></div>`;
  }
  function addProperty() {
    return `${toolbar('New property', 'properties')}<div class="scroll sheet-content">${pageTitle('Your property', 'The essentials, all in one place.')}<form id="property-form" autocomplete="off"><div class="card"><label class="field"><span>Name</span><input name="property-name" placeholder="Lakeside Apartment" required maxlength="65"></label><label class="field"><span>City</span><input name="property-city" placeholder="Como, CO" required maxlength="40"></label></div><button class="primary" type="submit">Add property ${icon('plus')}</button></form></div>`;
  }
  function navFooter(nextLabel = 'Continue', disabled = false) {
    return `<div class="actions">${state.step > 0 ? `<button class="round-back glass" data-action="back" aria-label="Previous step">${icon('back')}</button>` : ''}<button class="primary" data-action="next" ${disabled ? 'disabled' : ''}>${nextLabel} ${icon(nextLabel === 'Save check-in' ? 'check' : 'arrow')}</button></div>`;
  }
  function progress() {
    const current = state.step === 2 ? 2 + state.guest : state.step;
    const labels = ['Property', 'Stay', ...Array.from({ length: state.draft.count }, (_, i) => `Guest ${i + 1}`)];
    return `<div class="progress" aria-label="Step ${current + 1} of ${labels.length}: ${labels[current]}">${labels.map((label, i) => `<span class="${current === i ? 'active glass' : current > i ? 'done' : ''}">${current === i ? label : current > i ? icon('check') : i + 1}</span>`).join('')}</div>`;
  }
  function dateField(key, label, value, min, max, color, symbol) {
    return `<label class="date-field"><span class="${color}">${icon(symbol)}</span><span class="date-copy"><small>${label}</small><strong data-date-label="${key}">${fullDate(value)}</strong></span>${icon('chevron')}<input type="date" name="${key}" aria-label="${key === 'arrival' ? 'Arrival' : 'Departure'} date" value="${value}" min="${min}" max="${max}" required></label>`;
  }
  function stayFields() {
    const d = state.draft;
    return `${pageTitle('Stay details', 'When are they arriving, and how many guests?')}<div class="card"><h2><span class="blue">${icon('calendar')}</span> Stay dates</h2>${dateField('arrival', 'Check-in', d.arrival, '2026-11-01', '2026-11-29', 'green', 'down')}<div class="nights"><span id="night-count">${nights(days(d.arrival, d.departure))}</span></div>${dateField('departure', 'Check-out', d.departure, nextDate(d.arrival), '2026-11-30', 'orange', 'up')}</div><div class="card"><h2><span class="purple">${icon('people')}</span> Number of guests</h2><div class="guest-count"><button data-action="less" aria-label="Remove a guest" ${d.count === 1 ? 'disabled' : ''}>−</button><div><strong>${d.count}</strong><small>${d.count === 1 ? 'Guest' : 'Guests'}</small></div><button data-action="more" aria-label="Add a guest" ${d.count === 3 ? 'disabled' : ''}>+</button></div></div>`;
  }
  function nextDate(value) { return new Date(Date.parse(value) + 86400000).toISOString().slice(0, 10); }
  function guestValid() {
    const g = state.draft.guests[state.guest];
    return !!(g.first.trim() && g.last.trim() && g.birth && g.birth < '2026-01-01' && g.doc.trim());
  }
  function guestFields() {
    const g = state.draft.guests[state.guest];
    return `${pageTitle(state.guest === 0 ? 'Lead guest' : `Guest ${state.guest + 1}`, 'Enter the guest’s details')}<button class="scan-button" data-action="scan">${icon('scan')}<span>Scan document</span>${icon('chevron')}</button><form id="guest-form" autocomplete="off"><div class="card"><h2><span class="blue">${icon('person')}</span> Personal details</h2><label class="field"><span>First name</span><input name="first" value="${escape(g.first)}" placeholder="Emma" maxlength="35" required></label><label class="field"><span>Last name</span><input name="last" value="${escape(g.last)}" placeholder="Martin" maxlength="35" required></label><label class="field"><span>Date of birth</span><input type="date" name="birth" value="${g.birth}" min="1900-01-01" max="2025-12-31" required></label><label class="field"><span>Citizenship</span><select name="country">${['France', 'Italy', 'United Kingdom', 'Germany'].map(c => `<option ${g.country === c ? 'selected' : ''}>${c}</option>`).join('')}</select></label></div><div class="card"><h2><span class="orange">${icon('doc')}</span> Document</h2><label class="field"><span>Number</span><input name="doc" value="${escape(g.doc)}" placeholder="DEMO001" maxlength="20" required></label></div></form>`;
  }
  function wizard() {
    const last = state.guest === state.draft.count - 1;
    return `<div class="toolbar sheet-toolbar"><button class="cancel-button glass" data-action="cancel">Cancel</button><strong>New check-in</strong><span></span></div>${progress()}<div class="scroll wizard-content">${state.step === 0 ? `${pageTitle('Choose your property', 'Select the listing for this check-in')}<div class="property-list">${properties.map((p, i) => propertyCard(p, i, true)).join('')}</div>` : state.step === 1 ? stayFields() : guestFields()}</div>${navFooter(state.step === 2 && last ? 'Save check-in' : 'Continue', state.step === 0 ? state.draft.property === null : state.step === 2 && !guestValid())}`;
  }
  function scanner() {
    const g = samples[state.guest];
    return `${toolbar('Document scan', 'scan-cancel')}<div class="scroll scanner">${pageTitle('Position the document in the frame')}<div class="scan-frame"><div class="sample-id"><span>SAMPLE DOCUMENT</span><div><div class="id-avatar">${icon('person')}</div><p><strong>${g.last.toUpperCase()}<br>${g.first.toUpperCase()}</strong><small>${g.birth}<br>${g.doc}</small></p></div><code>DEMO&lt;&lt;${g.last.toUpperCase()}&lt;&lt;${g.first.toUpperCase()}<br>SAMPLE&lt;DATA&lt;ONLY&lt;&lt;&lt;</code></div><div class="scan-line"></div></div><p class="scan-status" role="status">${icon('scan')} Reading details…</p></div>`;
  }
  function guestRows(r) {
    return r.guests.map((g, i) => `<div class="data-row portal-guest"><span class="secondary">${i + 1}</span><span>${escape(g.first)} ${escape(g.last)}</span><span class="secondary">Complete</span></div>`).join('');
  }
  function portal(r, title, ross = false) {
    return `<h2 class="section-title">${title}</h2>${ross ? `<div class="card room-row"><span class="indigo">${icon('bed')}</span><span>Rooms</span><strong>1</strong></div>` : ''}<div class="card">${guestRows(r)}</div><div class="card portal-status"><span>${icon(r.sent ? 'check' : 'info')} ${r.sent ? 'Sent' : 'Not sent'}</span>${r.sent ? '<span class="green">Complete</span>' : `<button class="text-button" data-action="send-prompt">${icon('send')} Send</button>`}</div>`;
  }
  function detail() {
    const r = state.records[state.active], p = properties[r.property];
    return `${toolbar('Check-in', 'checkins')}<div class="scroll detail-scroll"><div class="card checkin-summary"><div class="summary-property">${propertyImage(p)}<h1 tabindex="-1">${escape(p.name)}</h1></div><div class="summary-counts"><div>${icon('calendar')}<strong>${days(r.arrival, r.departure)}</strong><span>Nights</span></div><div>${icon('people')}<strong>${r.count}</strong><span>Guests</span></div></div></div><h2 class="section-title">Stay</h2><div class="card"><div class="data-row"><span>Arrival</span><strong>${dateLabel(r.arrival, true)}</strong></div><div class="data-row"><span>Departure</span><strong>${dateLabel(r.departure, true)}</strong></div></div><h2 class="section-title">Guests</h2>${r.guests.map((g, i) => `<div class="card guest-detail"><div><strong>${i + 1}. ${escape(g.first)} ${escape(g.last)}</strong>${i === 0 ? '<span class="primary-badge">Lead guest</span>' : ''}</div><p>${icon('person')} ${r.count === 1 ? 'Individual guest' : i === 0 ? 'Group leader' : 'Group member'}</p><hr><p>${icon('calendar')} Born on ${dateLabel(g.birth, true)}</p><p>${icon('flag')} ${escape(g.country.toUpperCase())}</p></div>`).join('')}${portal(r, 'Alloggiati Web')}${portal(r, 'ROSS1000', true)}<h2 class="section-title">Documents</h2><button class="card document-button" data-action="receipt"><span class="orange">${icon('doc')}</span><span><strong>Stay receipt</strong><small>Host and payment details</small></span>${icon('chevron')}</button></div>`;
  }
  function sendScreen() {
    const r = state.records[state.active];
    return `${toolbar('Submit to portals', 'detail')}<div class="scroll send-screen"><div class="success-symbol">${icon(state.sending ? 'send' : 'check')}</div>${pageTitle(state.sending ? 'Sending…' : 'Check-in saved', state.sending ? 'Preparing guest details' : 'Send guest details to the portals?')}<div class="card"><div class="data-row"><strong>Alloggiati Web</strong><span>${state.sending ? 'In progress…' : 'Ready'}</span></div><div class="data-row"><strong>ROSS1000</strong><span>${state.sending ? 'In progress…' : 'Ready'}</span></div><div class="data-row"><span>Guests</span><strong>${r.count}</strong></div></div></div><div class="send-actions">${state.sending ? '<button class="primary" disabled>Sending…</button>' : '<button class="primary" data-action="send">Send to portals</button><button class="text-button" data-action="detail">Not now, view summary</button>'}</div>`;
  }
  function receipt() {
    const r = state.records[state.active], n = days(r.arrival, r.departure);
    return `${toolbar('Receipt preview', 'receipt-back')}<div class="scroll receipt-wrap"><article class="receipt"><div class="receipt-brand">HOSTARIO<span>SAMPLE RECEIPT</span></div><h1 tabindex="-1">One stay.<br>Everything in order.</h1><span class="receipt-number">DEMO / 2026 · 001</span><hr><small>PROPERTY</small><h2>${escape(properties[r.property].name)}</h2><p>${escape(properties[r.property].city)}</p><small>GUEST</small><p>${escape(r.guests[0].first)} ${escape(r.guests[0].last)}</p><hr><div class="data-row"><span>Arrival</span><strong>${dateLabel(r.arrival, true)}</strong></div><div class="data-row"><span>Departure</span><strong>${dateLabel(r.departure, true)}</strong></div><div class="data-row"><span>${nights(n)} × ${euro(95)}</span><strong>${euro(n * 95)}</strong></div><div class="receipt-total"><span>Total</span><strong>${euro(n * 95)}</strong></div><p class="receipt-disclaimer">SAMPLE · NOT VALID FOR TAX PURPOSES<br>Amounts and guests are fictional.</p></article></div>`;
  }
  function receipts() {
    return `${toolbar('Receipts', 'receipts-back')}<div class="scroll detail-scroll">${pageTitle('Stay receipts')}${state.records.map((r, i) => `<button class="card document-button" data-action="open-receipt" data-index="${i}"><span class="orange">${icon('doc')}</span><span><strong>${escape(r.guests[0].first)} ${escape(r.guests[0].last)}</strong><small>${dateLabel(r.arrival)} · ${escape(properties[r.property].name)}</small></span>${icon('chevron')}</button>`).join('')}</div>`;
  }
  const settingItems = [
    ['plan', 'Hostario Start', 'Up to 5 properties.', 'house', 'teal'],
    ['documents', 'Documents and receipts', 'PDF styles and Alloggiati Web receipts', 'doc', 'orange'],
    ['privacy', 'Privacy and security', 'Manage your data', 'shield', 'green'],
    ['info', 'About the app', 'Version and details', 'info', 'blue'],
    ['support', 'Support', 'Help and feedback', 'help', 'purple']
  ];
  function settings() {
    const row = ([key, title, subtitle, symbol, color]) => `<button class="card settings-row" data-action="setting" data-key="${key}"><span class="settings-icon ${color}">${icon(symbol)}</span><span><strong>${title}</strong><small>${subtitle}</small></span>${icon('chevron')}</button>`;
    return rootPage('Settings', `<h2 class="section-title">General</h2>${settingItems.slice(0, 3).map(row).join('')}<h2 class="section-title">About and support</h2>${settingItems.slice(3).map(row).join('')}`);
  }
  function settingDetail() {
    const item = settingItems.find(item => item[0] === state.settingsPage);
    const content = {
      plan: `<div class="card"><div class="data-row"><span>Plan</span><strong>Hostario Start</strong></div><div class="data-row"><span>Properties</span><strong>${properties.length} / 5</strong></div></div>`,
      documents: `<button class="card document-button" data-action="settings-receipts">${icon('doc')}<span><strong>Stay receipts</strong><small>View previews</small></span>${icon('chevron')}</button>`,
      privacy: `<div class="card"><h2>Session data</h2><p>Changes stay in this session and are cleared when you reload the page.</p><button class="text-button" data-action="reset-prompt">Reset session</button></div>`,
      info: `<div class="card"><h2>Hostario</h2><p>Properties, guests and documents.<br>A native app for your check-ins.</p><div class="data-row"><span>Created by</span><strong>Jad Taljabini</strong></div></div>`,
      support: `<div class="card"><h2>Getting started</h2><p>Open Check-ins, choose a property and add your guests. Try scanning a sample document, then review everything in the summary.</p><button class="text-button" data-action="new">Create a check-in ${icon('arrow')}</button></div>`
    };
    return `${toolbar(item[1], 'settings')}<div class="scroll detail-scroll">${pageTitle(item[1])}${content[state.settingsPage]}</div>`;
  }
  function resetPrompt() {
    return `${toolbar('Session data', 'setting-back')}<div class="scroll sheet-content">${pageTitle('Start again?', 'This will reset the changes you made in this demo.')}<button class="primary" data-action="reset-confirm">Reset session</button><button class="text-button" data-action="setting-back">Cancel</button></div>`;
  }
  function render(focus = true, preserveScroll = false) {
    clearTimeout(timer);
    const offset = preserveScroll ? screen.querySelector('.scroll')?.scrollTop || 0 : 0;
    const screens = { checkins, properties: propertiesScreen, property: propertyDetail, wizard, scanner, detail, send: sendScreen, receipt, receipts, settings, setting: settingDetail, 'add-property': addProperty, 'reset-prompt': resetPrompt };
    screen.innerHTML = screens[state.screen]();
    app.dataset.screen = state.screen;
    const isSheet = ['wizard', 'scanner', 'send', 'add-property', 'reset-prompt'].includes(state.screen);
    document.body.classList.toggle('is-sheet', isSheet);
    screen.classList.toggle('sheet', isSheet);
    tabBar.hidden = isSheet || state.screen === 'receipt';
    app.dataset.tab = state.tab;
    tabItems.forEach(([key]) => {
      const button = tabBar.querySelector(`[data-action="${key}"]`);
      if (key === state.tab) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    const scroller = screen.querySelector('.scroll');
    if (scroller) {
      scroller.scrollTop = offset;
      const updateHeader = () => screen.classList.toggle('is-scrolled', scroller.scrollTop > 65);
      scroller.addEventListener('scroll', updateHeader, { passive: true });
      updateHeader();
    }
    if (focus) screen.querySelector('h1')?.focus({ preventScroll: true });
    parent.postMessage({ type: 'hostario-stage', stage: stage() }, location.origin);
    if (state.screen === 'scanner') timer = setTimeout(() => {
      state.draft.guests[state.guest] = { ...samples[state.guest] };
      state.screen = 'wizard'; render();
    }, 1600);
  }
  function start(property = null) {
    state.draft = newDraft(); state.draft.property = property;
    state.step = 0; state.guest = 0; state.screen = 'wizard'; state.tab = 'checkins';
  }
  app.addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (!button || button.disabled) return;
    const action = button.dataset.action;
    switch (action) {
      case 'properties': case 'checkins': case 'settings': state.screen = state.tab = action; break;
      case 'new': start(); break;
      case 'new-property': start(state.selectedProperty); break;
      case 'add-property': state.screen = 'add-property'; break;
      case 'property': state.selectedProperty = Number(button.dataset.index); state.screen = 'property'; break;
      case 'select-property': state.draft.property = Number(button.dataset.index); render(false, true); screen.querySelector(`[data-index="${state.draft.property}"]`)?.focus({ preventScroll: true }); return;
      case 'cancel': state.screen = state.tab = 'checkins'; break;
      case 'month': {
        const month = button.dataset.month;
        state.expanded.has(month) ? state.expanded.delete(month) : state.expanded.add(month);
        render(false, true); screen.querySelector(`[data-month="${month}"]`)?.focus({ preventScroll: true }); return;
      }
      case 'less': case 'more': {
        state.draft.count += action === 'more' ? 1 : -1;
        while (state.draft.guests.length < state.draft.count) state.draft.guests.push(blankGuest());
        state.draft.guests.length = state.draft.count;
        render(false, true);
        (screen.querySelector(`[data-action="${action}"]:not(:disabled)`) || screen.querySelector(`[data-action="${action === 'more' ? 'less' : 'more'}"]`))?.focus({ preventScroll: true }); return;
      }
      case 'next':
        if (state.step === 0 && state.draft.property === null) return;
        if (state.step === 1 && ![...screen.querySelectorAll('input')].every(input => input.reportValidity())) return;
        if (state.step < 2) state.step++;
        else {
          if (!guestValid() || !screen.querySelector('form').reportValidity()) return;
          if (state.guest < state.draft.count - 1) state.guest++;
          else { state.records.unshift(structuredClone(state.draft)); state.active = 0; state.filter = 'all'; state.expanded.add('2026-11'); state.sending = false; state.screen = 'send'; }
        }
        break;
      case 'back': if (state.step === 2 && state.guest > 0) state.guest--; else state.step--; break;
      case 'scan': state.screen = 'scanner'; break;
      case 'scan-cancel': state.screen = 'wizard'; break;
      case 'record': state.active = Number(button.dataset.index); state.screen = 'detail'; break;
      case 'detail': state.screen = 'detail'; break;
      case 'send-prompt': state.sending = false; state.screen = 'send'; break;
      case 'send':
        state.sending = true; render();
        timer = setTimeout(() => { state.records[state.active].sent = true; state.sending = false; state.screen = 'detail'; render(); }, 1100); return;
      case 'receipt': state.receiptReturn = 'detail'; state.screen = 'receipt'; break;
      case 'open-receipt': state.active = Number(button.dataset.index); state.receiptReturn = 'receipts'; state.screen = 'receipt'; break;
      case 'receipt-back': state.screen = state.receiptReturn || 'detail'; break;
      case 'receipts': state.receiptsReturn = 'checkins'; state.screen = 'receipts'; break;
      case 'settings-receipts': state.receiptsReturn = 'setting'; state.screen = 'receipts'; break;
      case 'receipts-back': state.screen = state.receiptsReturn; break;
      case 'setting': state.settingsPage = button.dataset.key; state.screen = 'setting'; break;
      case 'setting-back': state.screen = 'setting'; break;
      case 'reset-prompt': state.screen = 'reset-prompt'; break;
      case 'reset-confirm': reset(); return;
      default: return;
    }
    render();
  });
  app.addEventListener('input', event => {
    const field = event.target;
    if (state.screen === 'wizard' && state.step === 2 && Object.hasOwn(blankGuest(), field.name)) {
      state.draft.guests[state.guest][field.name] = field.value;
      screen.querySelector('[data-action="next"]').disabled = !guestValid();
    }
  });
  app.addEventListener('change', event => {
    const field = event.target;
    if (['filter', 'statsProperty', 'statsPeriod'].includes(field.name)) {
      state[field.name] = field.value; render(false, true);
      screen.querySelector(`[name="${field.name}"]`)?.focus({ preventScroll: true }); return;
    }
    if (state.screen !== 'wizard' || state.step !== 1 || !['arrival', 'departure'].includes(field.name)) return;
    if (!field.value || !field.validity.valid) return;
    state.draft[field.name] = field.value;
    if (days(state.draft.arrival, state.draft.departure) < 1) state.draft.departure = nextDate(state.draft.arrival);
    const departure = screen.querySelector('[name="departure"]');
    departure.value = state.draft.departure; departure.min = nextDate(state.draft.arrival);
    screen.querySelector('#night-count').textContent = nights(days(state.draft.arrival, state.draft.departure));
    ['arrival', 'departure'].forEach(key => { screen.querySelector(`[data-date-label="${key}"]`).textContent = fullDate(state.draft[key]); });
  });
  app.addEventListener('submit', event => {
    event.preventDefault();
    if (event.target.id === 'property-form') {
      const name = event.target.elements['property-name'].value.trim();
      const city = event.target.elements['property-city'].value.trim();
      if (!name || !city || properties.length >= 5) return;
      properties.push({ name, city, image: '' }); state.screen = state.tab = 'properties'; render();
    } else screen.querySelector('[data-action="next"]')?.click();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') parent.postMessage({ type: 'hostario-close' }, location.origin); });
  window.addEventListener('message', event => { if (event.origin === location.origin && event.source === parent && event.data?.type === 'hostario-reset') reset(); });
  reset();
})();
