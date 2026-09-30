/* FlexShare: browser database, service/controller, and presentation layers. */
(() => {
  const STORAGE_KEY = 'flexshare-db-v1';
  const BUILDINGS = ['IT Building', 'Engineering Building', 'Architecture Studio', 'Nursing Building', 'CBA Building'];
  const seedData = () => {
    const now = Date.now();
    const data = {
      users: [
        { id: 'u-1001', name: 'Alex Reyes', schoolId: '2022-01482', department: 'College of Sciences', roles: ['Borrower', 'Lender', 'FlexRunner'], activeRole: 'Borrower', walletBalance: 2450, verified: true },
        { id: 'u-1002', name: 'Mia Santos', schoolId: '2021-00831', department: 'College of Engineering', roles: ['Borrower', 'Lender'], activeRole: 'Lender', walletBalance: 1820, verified: true },
        { id: 'u-1003', name: 'Paolo Cruz', schoolId: '2023-02206', department: 'College of Architecture', roles: ['Borrower', 'FlexRunner'], activeRole: 'FlexRunner', walletBalance: 760, verified: true },
        { id: 'u-1004', name: 'Jamie Dizon', schoolId: '2022-01872', department: 'College of Nursing', roles: ['Borrower', 'Lender'], activeRole: 'Borrower', walletBalance: 3200, verified: true },
        { id: 'u-1005', name: 'Bea Lim', schoolId: '2021-00519', department: 'College of Business and Accountancy', roles: ['Borrower', 'FlexRunner'], activeRole: 'FlexRunner', walletBalance: 1250, verified: true }
      ],
      equipment: [
        { id: 'eq-001', name: 'Casio fx-991EX ClassWiz', category: 'Calculators', symbol: '▦', art: 'art-calc', hourlyRate: 8, dailyRate: 45, replacementValue: 1800, location: 'IT Building', ownerId: 'u-1002', condition: 'Very good', available: true, rating: 4.9 },
        { id: 'eq-002', name: 'Canon EOS 250D DSLR', category: 'Camera & media', symbol: '▣', art: 'art-camera', hourlyRate: 55, dailyRate: 320, replacementValue: 28000, location: 'CBA Building', ownerId: 'u-1004', condition: 'Excellent', available: true, rating: 5.0 },
        { id: 'eq-003', name: 'Wacom Intuos S tablet', category: 'Design tools', symbol: '▱', art: 'art-design', hourlyRate: 28, dailyRate: 160, replacementValue: 4600, location: 'Architecture Studio', ownerId: 'u-1003', condition: 'Very good', available: true, rating: 4.8 },
        { id: 'eq-004', name: 'Arduino Uno starter kit', category: 'Electronics', symbol: '⌁', art: 'art-electronics', hourlyRate: 18, dailyRate: 100, replacementValue: 2400, location: 'Engineering Building', ownerId: 'u-1002', condition: 'Good', available: true, rating: 4.7 },
        { id: 'eq-005', name: 'Vernier digital caliper', category: 'Lab equipment', symbol: '⊣', art: 'art-lab', hourlyRate: 14, dailyRate: 85, replacementValue: 3100, location: 'Nursing Building', ownerId: 'u-1004', condition: 'Very good', available: true, rating: 4.9 },
        { id: 'eq-006', name: 'TI-84 Plus CE calculator', category: 'Calculators', symbol: '▦', art: 'art-calc', hourlyRate: 12, dailyRate: 65, replacementValue: 5800, location: 'Engineering Building', ownerId: 'u-1003', condition: 'Good', available: true, rating: 4.8 },
        { id: 'eq-007', name: 'LED panel light + stand', category: 'Camera & media', symbol: '◉', art: 'art-camera', hourlyRate: 20, dailyRate: 115, replacementValue: 3900, location: 'IT Building', ownerId: 'u-1004', condition: 'Excellent', available: true, rating: 4.6 },
        { id: 'eq-008', name: 'Architect scale + set square', category: 'Design tools', symbol: '△', art: 'art-design', hourlyRate: 10, dailyRate: 55, replacementValue: 1200, location: 'Architecture Studio', ownerId: 'u-1002', condition: 'Good', available: true, rating: 4.7 }
      ],
      rentals: [
        { id: 'rent-demo-active', itemId: 'eq-006', borrowerId: 'u-1001', lenderId: 'u-1003', duration: 6, durationType: 'hourly', baseCost: 72, commissionRate: .12, platformCommission: 8.64, protectionTier: 'Standard', protectionRate: .07, protectionFee: 5.04, latePenaltyPerHour: 9.75, lateHours: 0, latePenalty: 0, handoff: 'Self-Meetup', deliveryFee: 0, classroom: '', paymentMethod: 'GCash', paymentStatus: 'Paid (demo)', total: 85.68, amountDue: 85.68, status: 'Active', qrToken: 'FS-PSU-DEMO-6842', createdAt: new Date(now - 2 * 3600000).toISOString(), dueAt: new Date(now + 4 * 3600000).toISOString(), returnedAt: null },
        { id: 'rent-demo-complete', itemId: 'eq-008', borrowerId: 'u-1003', lenderId: 'u-1002', duration: 1, durationType: 'daily', baseCost: 55, commissionRate: .12, platformCommission: 6.6, protectionTier: 'Essential', protectionRate: .04, protectionFee: 2.2, latePenaltyPerHour: 8.25, lateHours: 0, latePenalty: 0, handoff: 'Self-Meetup', deliveryFee: 0, classroom: '', paymentMethod: 'Maya', paymentStatus: 'Paid (demo)', total: 63.8, amountDue: 63.8, status: 'Completed', qrToken: 'FS-PSU-DEMO-3157', createdAt: new Date(now - 4 * 86400000).toISOString(), dueAt: new Date(now - 3 * 86400000).toISOString(), returnedAt: new Date(now - 3 * 86400000 + 20 * 60000).toISOString() }
      ],
      handoffs: [
        { id: 'hand-demo-active', rentalId: 'rent-demo-active', qrToken: 'FS-PSU-DEMO-6842', status: 'picked up', beforePhoto: { name: 'pickup-condition-demo.jpg', type: 'image/simulated', loggedAt: new Date(now - 2 * 3600000).toISOString() }, afterPhoto: null, verifiedAt: null },
        { id: 'hand-demo-complete', rentalId: 'rent-demo-complete', qrToken: 'FS-PSU-DEMO-3157', status: 'completed', beforePhoto: { name: 'pickup-condition-demo.jpg', type: 'image/simulated', loggedAt: new Date(now - 4 * 86400000).toISOString() }, afterPhoto: { name: 'return-condition-demo.jpg', type: 'image/simulated', loggedAt: new Date(now - 3 * 86400000 + 20 * 60000).toISOString() }, verifiedAt: new Date(now - 3 * 86400000 + 20 * 60000).toISOString() }
      ],
      flexrunner_jobs: [
        { id: 'job-2101', pickup: 'Engineering Building', dropoff: 'IT Building · Room 204', item: 'Arduino Uno starter kit', fee: 45, platformCut: 9, runnerEarning: 36, time: '10:30 AM', dueAt: new Date(now + 42 * 60000).toISOString(), status: 'open', borrowerId: 'u-1001' },
        { id: 'job-2102', pickup: 'CBA Building', dropoff: 'Nursing Building · Skills Lab', item: 'LED panel light + stand', fee: 60, platformCut: 12, runnerEarning: 48, time: '11:15 AM', dueAt: new Date(now + 87 * 60000).toISOString(), status: 'open', borrowerId: 'u-1001' },
        { id: 'job-2103', pickup: 'Architecture Studio', dropoff: 'Engineering Building · Room 106', item: 'Wacom Intuos S tablet', fee: 35, platformCut: 7, runnerEarning: 28, time: '12:00 PM', dueAt: new Date(now + 132 * 60000).toISOString(), status: 'open', borrowerId: 'u-1001' }
      ],
      notifications: [
        { id: 'note-demo-active', userId: 'u-1001', rentalId: 'rent-demo-active', type: 'return-reminder', message: 'Your TI-84 Plus CE calculator rental is due soon. Return it to Engineering Building.', dueAt: new Date(now + 3.5 * 3600000).toISOString(), read: false, status: 'scheduled', createdAt: new Date(now).toISOString() },
        { id: 'note-demo-complete', userId: 'u-1003', rentalId: 'rent-demo-complete', type: 'return-reminder', message: 'Your Architect scale + set square rental was returned.', dueAt: new Date(now - 3 * 86400000).toISOString(), read: true, status: 'cancelled', createdAt: new Date(now - 4 * 86400000).toISOString() }
      ]
    };
    data.equipment.find(item => item.id === 'eq-006').available = false;
    return data;
  };

  const FlexShareDB = (() => {
    let data, needsSeed = false;
    try {
      data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      data = null;
    }
    if (!data || ['users', 'equipment', 'rentals', 'handoffs', 'flexrunner_jobs', 'notifications'].some(table => !Array.isArray(data[table]))) { data = seedData(); needsSeed = true; }
    const save = () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('flexshare:db-updated'));
    };
    if (needsSeed) save();
    return {
      get tables() { return data; },
      get(table) { return data[table] ?? null; },
      save,
      reset() { data = seedData(); save(); return data; }
    };
  })();

  const FlexShareAPI = (() => {
    const wait = () => new Promise(resolve => setTimeout(resolve, 80));
    const id = prefix => `${prefix}-${crypto.randomUUID ? crypto.randomUUID().slice(0, 8) : Math.random().toString(36).slice(2, 10)}`;
    const money = value => Math.round((Number(value) + Number.EPSILON) * 100) / 100;
    const userById = userId => FlexShareDB.get('users').find(user => user.id === userId);
    const protectionFor = (replacementValue, baseCost) => {
      const tier = replacementValue <= 2000 ? { name: 'Essential', rate: .04 } : replacementValue <= 10000 ? { name: 'Standard', rate: .07 } : { name: 'Extended', rate: .10 };
      return { ...tier, amount: money(baseCost * tier.rate) };
    };
    const response = (ok, data, error = null) => ({ ok, data: ok ? data : null, error });
    return {
      async getItems(filters = {}) {
        await wait();
        const query = String(filters.query || '').trim().toLowerCase();
        const items = FlexShareDB.get('equipment').filter(item => item.available && (filters.category === 'All' || !filters.category || item.category === filters.category) && (!filters.building || item.location === filters.building) && (!query || `${item.name} ${item.category} ${item.location}`.toLowerCase().includes(query)));
        return response(true, items);
      },
      async createItem(input, ownerId = 'u-1001') {
        await wait();
        const required = ['name', 'category', 'location'];
        if (!input || required.some(key => !String(input[key] || '').trim())) return response(false, null, 'Complete the item name, category, and campus location.');
        const hourlyRate = Number(input.hourlyRate), dailyRate = Number(input.dailyRate), replacementValue = Number(input.replacementValue);
        if (![hourlyRate, dailyRate, replacementValue].every(Number.isFinite) || hourlyRate < 5 || dailyRate < 30 || replacementValue < 100 || !BUILDINGS.includes(input.location)) return response(false, null, 'Enter valid PHP rates, replacement value, and a PSU building.');
        const item = { id: id('eq'), name: String(input.name).trim(), category: input.category, symbol: input.category === 'Calculators' ? '▦' : input.category === 'Electronics' ? '⌁' : '▱', art: input.category === 'Calculators' ? 'art-calc' : input.category === 'Electronics' ? 'art-electronics' : 'art-design', hourlyRate, dailyRate, replacementValue, location: input.location, ownerId, condition: 'Good', available: true, rating: 5, createdAt: new Date().toISOString() };
        FlexShareDB.get('equipment').unshift(item); FlexShareDB.save();
        return response(true, item);
      },
      async checkoutRental(input) {
        await wait();
        const item = FlexShareDB.get('equipment').find(row => row.id === input?.itemId && row.available);
        const borrower = userById(input?.borrowerId);
        const duration = Number(input?.duration);
        if (!item || !borrower?.verified) return response(false, null, 'This item is unavailable or the student account is not verified.');
        if (!['hourly', 'daily'].includes(input.durationType)) return response(false, null, 'Choose hourly or daily rental pricing.');
        if (!Number.isInteger(duration) || duration < 1 || duration > (input.durationType === 'hourly' ? 24 : 14)) return response(false, null, 'Choose a valid rental duration.');
        if (!['GCash', 'Maya'].includes(input.paymentMethod)) return response(false, null, 'Choose GCash or Maya to continue.');
        if (!['Self-Meetup', 'FlexRunner Classroom Delivery'].includes(input.handoff)) return response(false, null, 'Choose a valid campus handoff method.');
        if (input.handoff === 'FlexRunner Classroom Delivery' && !String(input.classroom || '').trim()) return response(false, null, 'Add a classroom or drop-off point for FlexRunner delivery.');
        const baseCost = money(duration * (input.durationType === 'hourly' ? item.hourlyRate : item.dailyRate));
        const protection = protectionFor(item.replacementValue, baseCost);
        const deliveryFee = input.handoff === 'FlexRunner Classroom Delivery' ? 35 : 0;
        const commission = money(baseCost * .12);
        const total = money(baseCost + protection.amount + deliveryFee + commission);
        if (borrower.walletBalance < total) return response(false, null, 'Your demo wallet balance is too low for this checkout.');
        const createdAt = Date.now();
        const rental = { id: id('rent'), itemId: item.id, borrowerId: borrower.id, lenderId: item.ownerId, duration, durationType: input.durationType, baseCost, commissionRate: .12, platformCommission: commission, protectionTier: protection.name, protectionRate: protection.rate, protectionFee: protection.amount, latePenaltyPerHour: money(item.dailyRate * .15), lateHours: 0, latePenalty: 0, handoff: input.handoff, deliveryFee, classroom: String(input.classroom || '').trim(), paymentMethod: input.paymentMethod, paymentStatus: 'Paid (demo)', total, amountDue: total, status: 'Active · pickup pending', qrToken: `FS-PSU-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${String(Date.now()).slice(-4)}`, createdAt: new Date(createdAt).toISOString(), dueAt: new Date(createdAt + duration * (input.durationType === 'hourly' ? 3600000 : 86400000)).toISOString(), returnedAt: null };
        borrower.walletBalance = money(borrower.walletBalance - total);
        item.available = false;
        FlexShareDB.get('rentals').unshift(rental);
        FlexShareDB.get('handoffs').unshift({ id: id('hand'), rentalId: rental.id, qrToken: rental.qrToken, status: 'pickup pending', beforePhoto: null, afterPhoto: null, verifiedAt: null });
        const reminder = { id: id('note'), userId: borrower.id, rentalId: rental.id, type: 'return-reminder', message: `Your ${item.name} rental is due soon. Return it to ${item.location}.`, dueAt: new Date(new Date(rental.dueAt).getTime() - 30 * 60000).toISOString(), read: false, status: 'scheduled', createdAt: new Date().toISOString() };
        FlexShareDB.get('notifications').unshift(reminder);
        if (deliveryFee) FlexShareDB.get('flexrunner_jobs').unshift({ id: id('job'), pickup: item.location, dropoff: rental.classroom || 'Classroom drop-off', item: item.name, fee: deliveryFee, platformCut: money(deliveryFee * .2), runnerEarning: money(deliveryFee * .8), time: 'Just now', dueAt: rental.dueAt, status: 'open', borrowerId: borrower.id, rentalId: rental.id });
        FlexShareDB.save();
        return response(true, { rental, item, breakdown: { baseCost, protection, deliveryFee, commission, total } });
      },
      async verifyQrHandoff(input) {
        await wait();
        const handoff = FlexShareDB.get('handoffs').find(row => row.rentalId === input?.rentalId);
        const rental = FlexShareDB.get('rentals').find(row => row.id === input?.rentalId);
        if (!handoff || !rental || handoff.qrToken !== input?.token) return response(false, null, 'QR token not recognized. Check the token and try again.');
        if (!['pickup', 'return'].includes(input.stage) || !input.photo?.name) return response(false, null, 'A condition photo is required before the handoff can be verified.');
        const photoLog = { name: input.photo.name, type: input.photo.type || 'image/simulated', loggedAt: new Date().toISOString() };
        if (input.stage === 'pickup') {
          if (handoff.beforePhoto) return response(false, null, 'Pickup has already been verified.');
          handoff.beforePhoto = photoLog; handoff.status = 'picked up'; rental.status = 'Active';
        } else {
          if (!handoff.beforePhoto) return response(false, null, 'Verify pickup and log a before photo before returning the item.');
          if (handoff.afterPhoto) return response(false, null, 'Return has already been verified.');
          const returnedAt = Date.now();
          const lateHours = Math.max(0, Math.ceil((returnedAt - new Date(rental.dueAt).getTime()) / 3600000));
          const latePenalty = money(lateHours * rental.latePenaltyPerHour);
          handoff.afterPhoto = photoLog; handoff.status = 'completed'; handoff.verifiedAt = new Date(returnedAt).toISOString(); rental.status = 'Completed'; rental.returnedAt = new Date(returnedAt).toISOString(); rental.lateHours = lateHours; rental.latePenalty = latePenalty; rental.amountDue = money(rental.total + latePenalty);
          if (latePenalty) { const borrower = userById(rental.borrowerId); borrower.walletBalance = money(borrower.walletBalance - latePenalty); }
          const reminder = FlexShareDB.get('notifications').find(row => row.rentalId === rental.id && row.type === 'return-reminder');
          if (reminder) reminder.status = 'cancelled';
          const item = FlexShareDB.get('equipment').find(row => row.id === rental.itemId); if (item) item.available = true;
        }
        FlexShareDB.save();
        return response(true, { handoff, rental });
      },
      async acceptFlexRunnerJob(jobId, runnerId = 'u-1001') {
        await wait();
        const job = FlexShareDB.get('flexrunner_jobs').find(row => row.id === jobId);
        const runner = userById(runnerId);
        if (!job || job.status !== 'open') return response(false, null, 'This delivery has already been accepted.');
        if (!runner?.verified) return response(false, null, 'A verified student account is required.');
        job.status = 'accepted'; job.runnerId = runner.id; job.acceptedAt = new Date().toISOString();
        FlexShareDB.save();
        return response(true, job);
      },
      async resetDatabase() { await wait(); return response(true, FlexShareDB.reset()); }
    };
  })();

  window.FlexShareDB = FlexShareDB;
  window.FlexShareAPI = FlexShareAPI;
})();

(() => {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const state = { userId: 'u-1001', role: 'Borrower', category: 'All', query: '', building: null, selectedItemId: null, durationType: 'hourly', activeRentalId: null, handoffStage: 'pickup', photo: null, photoUrl: null, qrScanned: false, table: 'users' };
  const tableNames = ['users', 'equipment', 'rentals', 'handoffs', 'flexrunner_jobs', 'notifications'];
  const currency = value => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 2 }).format(Number(value || 0));
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const currentUser = () => FlexShareDB.get('users').find(user => user.id === state.userId);
  const toast = (message, error = false) => {
    const node = document.createElement('div'); node.className = `toast${error ? ' error' : ''}`; node.textContent = message; $('#toast-region').append(node);
    setTimeout(() => node.remove(), 3600);
  };
  const itemById = itemId => FlexShareDB.get('equipment').find(item => item.id === itemId);
  const rentalById = rentalId => FlexShareDB.get('rentals').find(rental => rental.id === rentalId);
  const protection = (replacementValue, baseCost) => ({ name: replacementValue <= 2000 ? 'Essential' : replacementValue <= 10000 ? 'Standard' : 'Extended', amount: Math.round(baseCost * (replacementValue <= 2000 ? .04 : replacementValue <= 10000 ? .07 : .10) * 100) / 100 });

  function showView(view) {
    $$('.view-panel').forEach(panel => panel.classList.toggle('active', panel.id === `${view}-view`));
    $$('.view-tab,.rail-button[data-view]').forEach(button => button.classList.toggle('active', button.dataset.view === view));
    if (view === 'market') renderMarket();
    if (view === 'dispatch') renderJobs();
    if (view === 'listings') renderListings();
  }

  function renderHeader() {
    const user = currentUser();
    const [whole, fraction] = currency(user.walletBalance).split('.');
    $('#wallet-balance').innerHTML = `${whole}<span>.${fraction || '00'}</span>`;
    const dueAlerts = FlexShareDB.get('notifications').filter(note => note.userId === user.id && note.status === 'due' && !note.read).length;
    $('#notification-count').textContent = dueAlerts;
    $('#notification-count').hidden = dueAlerts === 0;
    updateReminders();
  }

  function updateReminders() {
    const now = Date.now();
    let changed = false;
    FlexShareDB.get('notifications').forEach(note => {
      if (note.status === 'scheduled' && new Date(note.dueAt).getTime() <= now) { note.status = 'due'; changed = true; }
    });
    if (changed) FlexShareDB.save();
  }

  async function renderMarket() {
    const result = await FlexShareAPI.getItems({ category: state.category, query: state.query, building: state.building });
    if (!result.ok) return;
    const items = result.data;
    $('#result-count').textContent = items.length;
    $('#empty-state').hidden = items.length > 0;
    $('#item-grid').innerHTML = items.map((item, index) => {
      const owner = FlexShareDB.get('users').find(user => user.id === item.ownerId);
      const isHourly = item.hourlyRate > 0;
      return `<article class="item-card" style="animation-delay:${Math.min(index, 8) * 35}ms"><div class="item-art ${escapeHTML(item.art)}"><span class="item-label">${escapeHTML(item.category)}</span><span class="protection-chip">◇ protected</span><span class="item-symbol" aria-hidden="true">${escapeHTML(item.symbol)}</span></div><div class="item-info"><div class="item-title-row"><h3 class="item-title">${escapeHTML(item.name)}</h3><span class="availability-dot" title="Available"></span></div><p class="item-owner">${escapeHTML(owner?.name || 'PSU student')} · ${escapeHTML(item.condition || 'Good')} condition</p><div class="item-meta"><span class="item-location">⌖ ${escapeHTML(item.location)}</span><span class="item-rate">${currency(item.hourlyRate)}<small> / hr</small></span></div><div class="item-card-footer"><span class="rating"><span>★</span> ${Number(item.rating || 5).toFixed(1)}</span><button class="borrow-button" data-checkout="${escapeHTML(item.id)}">Borrow <span>→</span></button></div></div></article>`;
    }).join('');
    const allItems = FlexShareDB.get('equipment').filter(item => item.available);
    $$('.map-building').forEach(button => {
      const count = allItems.filter(item => item.location === button.dataset.building).length;
      button.classList.toggle('has-items', count > 0);
      button.classList.toggle('selected', state.building === button.dataset.building);
    });
    const nearbyCount = allItems.filter(item => !state.building || item.location === state.building).length;
    $('#map-item-count').textContent = nearbyCount;
    $('#map-selection-title').textContent = state.building || 'Campus-wide';
    $('#map-selection-caption').textContent = state.building ? 'Tap again or clear to see all gear' : 'Explore all five campus zones';
    $('#clear-building').hidden = !state.building;
  }

  function renderRentals() {
    const rentals = FlexShareDB.get('rentals').filter(rental => rental.borrowerId === state.userId && rental.status !== 'Completed');
    $('#rental-count-label').textContent = `${rentals.length} active`;
    $('#active-rentals').innerHTML = rentals.length ? rentals.map(rental => {
      const item = itemById(rental.itemId); const handoff = FlexShareDB.get('handoffs').find(row => row.rentalId === rental.id);
      const readyForReturn = Boolean(handoff?.beforePhoto);
      return `<article class="rental-card"><span class="rental-thumb">${escapeHTML(item?.symbol || '▱')}</span><div class="rental-card-copy"><strong>${escapeHTML(item?.name || 'Campus equipment')}</strong><small>${escapeHTML(rental.status)} · ${escapeHTML(rental.paymentMethod)} · due ${new Date(rental.dueAt).toLocaleString([], { hour: 'numeric', minute: '2-digit' })}</small></div><button class="rental-action" data-handoff="${escapeHTML(rental.id)}">${readyForReturn ? 'Log return →' : 'Verify pickup →'}</button></article>`;
    }).join('') : '<div class="job-empty"><strong>No active rentals yet.</strong>Check out an item and its handoff will show up here.</div>';
  }

  function renderListings() {
    const mine = FlexShareDB.get('equipment').filter(item => item.ownerId === state.userId);
    $('#active-listings-count').textContent = mine.length;
    $('#listing-count-label').textContent = `${mine.length} listed`;
    $('#my-listings').innerHTML = mine.length ? mine.map(item => `<article class="my-listing-card"><div><strong>${escapeHTML(item.name)}</strong><small>${escapeHTML(item.location)} · ${item.available ? 'Available' : 'On rental'}</small></div><b>${currency(item.dailyRate)}<small> / day</small></b></article>`).join('') : '<div class="job-empty"><strong>Your shelf is waiting.</strong>Publish your first campus listing above.</div>';
  }

  function renderJobs() {
    const jobs = FlexShareDB.get('flexrunner_jobs');
    const openJobs = jobs.filter(job => job.status === 'open');
    const myJobs = jobs.filter(job => job.runnerId === state.userId && job.status === 'accepted');
    $('#open-job-count').textContent = `${openJobs.length} open ${openJobs.length === 1 ? 'run' : 'runs'}`;
    $('#dispatch-tab-count').textContent = String(openJobs.length).padStart(2, '0');
    $('#runner-earnings').textContent = currency(myJobs.reduce((sum, job) => sum + job.runnerEarning, 0));
    $('#jobs-list').innerHTML = jobs.length ? jobs.map(job => `<article class="job-card"><div class="job-top"><span class="job-id">${escapeHTML(job.id.toUpperCase())}</span><span class="job-time">${escapeHTML(job.time)} · ${job.status === 'open' ? 'OPEN' : 'ACCEPTED'}</span></div><div class="route-line"><div class="route-stem"><i class="route-point"></i><i class="route-connector"></i><i class="route-point end"></i></div><div class="route-stops"><div><strong>${escapeHTML(job.pickup)}</strong><small>Collect · ${escapeHTML(job.item)}</small></div><div><strong>${escapeHTML(job.dropoff)}</strong><small>Classroom delivery</small></div></div></div><div class="job-bottom"><div><div class="job-payment">${currency(job.runnerEarning)} <small>your earning</small></div><div class="job-owner">${job.status === 'open' ? `₱${job.fee} delivery · includes 20% platform share` : `Accepted by ${escapeHTML(FlexShareDB.get('users').find(user => user.id === job.runnerId)?.name || 'runner')}`}</div></div><button class="job-button" data-job="${escapeHTML(job.id)}" ${job.status !== 'open' ? 'disabled' : ''}>${job.status === 'open' ? 'Accept run →' : 'Accepted ✓'}</button></div></article>`).join('') : '<div class="job-empty"><strong>All caught up.</strong>No open delivery runs right now.</div>';
  }

  function updateCheckoutSummary() {
    const item = itemById(state.selectedItemId); if (!item) return;
    const duration = Math.max(1, Number($('#duration-value').value) || 1);
    $('#duration-value').value = duration;
    const base = duration * (state.durationType === 'hourly' ? item.hourlyRate : item.dailyRate);
    const tier = protection(item.replacementValue, base);
    const isDelivery = $('input[name="handoff"]:checked').value === 'FlexRunner Classroom Delivery';
    const delivery = isDelivery ? 35 : 0;
    const commission = Math.round(base * .12 * 100) / 100;
    $('#summary-base').textContent = currency(base);
    $('#summary-protection').textContent = currency(tier.amount);
    $('#protection-tier').textContent = tier.name;
    $('#summary-delivery').textContent = currency(delivery);
    $('#delivery-summary-row').hidden = !isDelivery;
    $('#summary-commission').textContent = currency(commission);
    $('#summary-total').textContent = currency(base + tier.amount + delivery + commission);
    $('#classroom-wrap').hidden = !isDelivery;
  }

  function openCheckout(itemId) {
    const item = itemById(itemId); if (!item) return;
    state.selectedItemId = itemId; state.durationType = 'hourly';
    $('#checkout-item').innerHTML = `<span class="checkout-thumb ${escapeHTML(item.art)}">${escapeHTML(item.symbol)}</span><div><h2>${escapeHTML(item.name)}</h2><p>${escapeHTML(item.location)} · ${currency(item.hourlyRate)}/hour · ${currency(item.dailyRate)}/day</p></div>`;
    $('#duration-value').value = 3;
    $$('#duration-toggle button').forEach(button => button.classList.toggle('selected', button.dataset.duration === 'hourly'));
    $('input[name="handoff"][value="Self-Meetup"]').checked = true;
    $$('.handoff-option').forEach(option => option.classList.toggle('selected', option.querySelector('input').checked));
    updateCheckoutSummary(); $('#checkout-modal').showModal();
  }

  function openHandoff(rentalId) {
    const rental = rentalById(rentalId); if (!rental) return;
    const handoff = FlexShareDB.get('handoffs').find(row => row.rentalId === rental.id);
    state.activeRentalId = rentalId; state.handoffStage = handoff?.beforePhoto ? 'return' : 'pickup'; state.photo = null; state.qrScanned = false;
    if (state.photoUrl) URL.revokeObjectURL(state.photoUrl); state.photoUrl = null;
    $('#condition-photo').value = ''; $('#photo-preview').hidden = true; $('#photo-preview').innerHTML = '';
    $('#handoff-token').textContent = rental.qrToken;
    $('#progress-pickup').classList.toggle('active', state.handoffStage === 'pickup');
    $('#progress-return').classList.toggle('active', state.handoffStage === 'return');
    $('#handoff-title').textContent = state.handoffStage === 'pickup' ? 'Confirm pickup.' : 'Confirm return.';
    $('#handoff-description').textContent = state.handoffStage === 'pickup' ? 'Scan the lender’s QR token, then add a photo showing the equipment’s current condition.' : 'Scan the same QR token and add an after photo so both condition checks are recorded.';
    $('#photo-label').textContent = state.handoffStage === 'pickup' ? 'Add before photo' : 'Add after photo';
    $('#handoff-submit').disabled = true;
    $('#scan-qr').disabled = false; $('#scan-qr').textContent = 'Simulate QR scan ⌗'; $('#scan-qr').classList.remove('verified');
    $('#handoff-submit').innerHTML = `${state.handoffStage === 'pickup' ? 'Verify pickup' : 'Verify return'} <span>→</span>`;
    $('#handoff-status').textContent = '';
    $('#handoff-modal').showModal();
  }

  function setPhoto(file, simulated = false) {
    if (state.photoUrl) URL.revokeObjectURL(state.photoUrl);
    state.photo = simulated ? { name: `flexshare-${state.handoffStage}-sample.jpg`, type: 'image/simulated' } : file;
    state.photoUrl = simulated ? null : URL.createObjectURL(file);
    $('#photo-label').textContent = state.photo?.name || 'Add condition photo';
    $('#upload-action').textContent = 'Change';
    $('#photo-preview').hidden = false;
    $('#photo-preview').innerHTML = simulated ? '<div class="sample-preview">FlexShare sample condition photo · demo image</div>' : `<img src="${state.photoUrl}" alt="Selected condition photo preview">`;
    $('#handoff-submit').disabled = !state.qrScanned;
  }

  function updateInspector() {
    $('#table-tabs').innerHTML = tableNames.map(name => `<button class="table-tab${name === state.table ? ' active' : ''}" data-table="${name}">${name}</button>`).join('');
    const rows = FlexShareDB.get(state.table) || [];
    $('#table-row-count').textContent = `${rows.length} record${rows.length === 1 ? '' : 's'}`;
    $('#json-view').textContent = JSON.stringify(rows, null, 2);
  }

  function openNotifications() {
    updateReminders();
    const notes = FlexShareDB.get('notifications').filter(note => note.userId === state.userId && note.status !== 'cancelled');
    const active = notes.filter(note => note.status === 'due');
    $('#info-kicker').textContent = 'CAMPUS NOTIFICATIONS';
    $('#info-content').innerHTML = `<h2>${active.length ? 'A little heads-up.' : 'You’re all caught up.'}</h2>${notes.length ? notes.map(note => `<div class="notification-row"><strong>${note.status === 'due' ? 'Return reminder' : 'Return reminder scheduled'}</strong><p>${escapeHTML(note.message)}${note.status === 'scheduled' ? ` · due ${new Date(note.dueAt).toLocaleString([], { hour: 'numeric', minute: '2-digit' })}` : ''}</p></div>`).join('') : '<p>Rental return reminders will show here when you check out equipment.</p>'}`;
    notes.filter(note => note.status === 'due').forEach(note => { note.read = true; });
    FlexShareDB.save(); renderHeader(); $('#info-modal').showModal();
  }

  function showProtectionInfo() {
    $('#info-kicker').textContent = 'EQUIPMENT PROTECTION';
    $('#info-content').innerHTML = `<h2>Protection, tiered fairly.</h2><p>A small percentage of the rental base rate helps cover accidental damage. The tier follows the item’s replacement value.</p><div class="info-tier"><span>Essential · up to ₱2,000 value</span><strong>4% of base</strong></div><div class="info-tier"><span>Standard · ₱2,001–₱10,000</span><strong>7% of base</strong></div><div class="info-tier"><span>Extended · above ₱10,000</span><strong>10% of base</strong></div><p style="margin-top:14px">FlexShare adds a 12% platform commission to the rental base. Late return penalty: 15% of the daily rate per hour.</p>`;
    $('#info-modal').showModal();
  }

  async function refreshAll() {
    updateReminders(); renderHeader(); renderRentals(); renderJobs(); renderListings(); updateInspector();
    await renderMarket();
  }

  document.addEventListener('click', async event => {
    const viewButton = event.target.closest('[data-view]');
    if (viewButton) { showView(viewButton.dataset.view); return; }
    const checkoutButton = event.target.closest('[data-checkout]');
    if (checkoutButton) { openCheckout(checkoutButton.dataset.checkout); return; }
    const buildingButton = event.target.closest('.map-building');
    if (buildingButton) { state.building = state.building === buildingButton.dataset.building ? null : buildingButton.dataset.building; renderMarket(); return; }
    const handoffButton = event.target.closest('[data-handoff]');
    if (handoffButton) { openHandoff(handoffButton.dataset.handoff); return; }
    const jobButton = event.target.closest('[data-job]');
    if (jobButton) {
      const result = await FlexShareAPI.acceptFlexRunnerJob(jobButton.dataset.job, state.userId);
      if (!result.ok) toast(result.error, true); else toast(`Run accepted. Earn ${currency(result.data.runnerEarning)} when delivered.`);
      await refreshAll(); return;
    }
    const durationButton = event.target.closest('[data-duration]');
    if (durationButton) {
      state.durationType = durationButton.dataset.duration;
      $$('#duration-toggle button').forEach(button => button.classList.toggle('selected', button === durationButton));
      $('#duration-label').textContent = state.durationType === 'hourly' ? 'Hours' : 'Days';
      $('#duration-value').max = state.durationType === 'hourly' ? 24 : 14;
      $('#duration-value').value = 1;
      updateCheckoutSummary(); return;
    }
    const tableButton = event.target.closest('[data-table]');
    if (tableButton) { state.table = tableButton.dataset.table; updateInspector(); return; }
    if (event.target.closest('#duration-minus')) { $('#duration-value').value = Math.max(1, Number($('#duration-value').value) - 1); updateCheckoutSummary(); }
    if (event.target.closest('#duration-plus')) { $('#duration-value').value = Math.min(Number($('#duration-value').max), Number($('#duration-value').value) + 1); updateCheckoutSummary(); }
  });

  $('#category-filter').addEventListener('change', event => { state.category = event.target.value; renderMarket(); });
  $('#search-input').addEventListener('input', event => { state.query = event.target.value; renderMarket(); });
  $('#clear-building').addEventListener('click', () => { state.building = null; renderMarket(); });
  $('#duration-value').addEventListener('input', updateCheckoutSummary);
  $$('input[name="handoff"]').forEach(input => input.addEventListener('change', () => { $$('.handoff-option').forEach(option => option.classList.toggle('selected', option.querySelector('input').checked)); updateCheckoutSummary(); }));
  $('#role-select').addEventListener('change', event => {
    state.role = event.target.value;
    const user = currentUser(); user.activeRole = state.role; FlexShareDB.save();
    showView(state.role === 'FlexRunner' ? 'dispatch' : state.role === 'Lender' ? 'listings' : 'market');
    toast(`${state.role === 'FlexRunner' ? 'FlexRunner' : `Student ${state.role.toLowerCase()}`} view active.`);
  });
  $('#listing-form').addEventListener('submit', async event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    const result = await FlexShareAPI.createItem(values, state.userId);
    if (!result.ok) { toast(result.error, true); return; }
    event.currentTarget.reset(); toast('Your listing is live on the PSU marketplace.'); await refreshAll();
  });
  $('#checkout-submit').addEventListener('click', async () => {
    const handoff = $('input[name="handoff"]:checked').value;
    const result = await FlexShareAPI.checkoutRental({ itemId: state.selectedItemId, borrowerId: state.userId, duration: Number($('#duration-value').value), durationType: state.durationType, handoff, classroom: $('#classroom-input').value, paymentMethod: $('input[name="payment"]:checked').value });
    if (!result.ok) { toast(result.error, true); return; }
    $('#checkout-modal').close(); toast(`Payment confirmed · ${currency(result.data.rental.total)} via ${result.data.rental.paymentMethod}.`);
    await refreshAll(); openHandoff(result.data.rental.id);
  });
  $('#condition-photo').addEventListener('change', event => { const file = event.target.files?.[0]; if (!file) return; if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { toast('Choose a JPG, PNG, or WEBP image.', true); return; } setPhoto(file); });
  $('#sample-photo').addEventListener('click', () => setPhoto(null, true));
  $('#scan-qr').addEventListener('click', () => {
    state.qrScanned = true; $('#scan-qr').disabled = true; $('#scan-qr').classList.add('verified'); $('#scan-qr').textContent = 'Token verified ✓';
    $('#handoff-submit').disabled = !state.photo; $('#handoff-status').textContent = 'Unique campus handoff token verified.';
  });
  $('#handoff-submit').addEventListener('click', async () => {
    if (!state.photo) return;
    const rental = rentalById(state.activeRentalId);
    const result = await FlexShareAPI.verifyQrHandoff({ rentalId: state.activeRentalId, token: rental.qrToken, stage: state.handoffStage, photo: state.photo });
    if (!result.ok) { $('#handoff-status').textContent = result.error; return; }
    $('#handoff-modal').close();
    if (state.handoffStage === 'pickup') toast('Pickup verified. Log the after photo when you return the item.');
    else toast('Return verified. Both condition photos are now logged.');
    await refreshAll();
  });
  $('#listing-form').querySelectorAll('input[type="number"]').forEach(input => input.addEventListener('input', () => { input.setCustomValidity(''); }));
  $('#notifications-button').addEventListener('click', openNotifications);
  $('#how-protection').addEventListener('click', showProtectionInfo);
  $('#role-select').value = state.role;
  $('#inspector-toggle').addEventListener('click', () => { $('#db-drawer').classList.add('open'); $('#drawer-backdrop').classList.add('open'); $('#db-drawer').setAttribute('aria-hidden', 'false'); updateInspector(); });
  const closeInspector = () => { $('#db-drawer').classList.remove('open'); $('#drawer-backdrop').classList.remove('open'); $('#db-drawer').setAttribute('aria-hidden', 'true'); };
  $('#inspector-close').addEventListener('click', closeInspector); $('#drawer-backdrop').addEventListener('click', closeInspector);
  $('#refresh-database').addEventListener('click', updateInspector);
  $('#copy-database').addEventListener('click', async () => { await navigator.clipboard.writeText(JSON.stringify(FlexShareDB.tables, null, 2)); toast('Database JSON copied.'); });
  $('#reset-database').addEventListener('click', async () => {
    if (!window.confirm('Reset FlexShare demo data? Custom listings and rentals will be removed.')) return;
    await FlexShareAPI.resetDatabase(); state.building = null; state.category = 'All'; state.query = '';
    $('#category-filter').value = 'All'; $('#search-input').value = '';
    toast('Demo database restored to its original seed.'); await refreshAll();
  });
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) { event.preventDefault(); $('#search-input').focus(); }
    if (event.key === 'Escape') closeInspector();
  });
  window.addEventListener('flexshare:db-updated', () => { updateInspector(); renderHeader(); });
  renderHeader(); updateInspector(); showView('market'); renderRentals(); renderJobs(); renderListings();
  setInterval(() => { updateReminders(); renderHeader(); }, 60000);
})();