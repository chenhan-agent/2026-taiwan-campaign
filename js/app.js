/**
 * 2026 臺灣縣市長選舉 | 主應用程式邏輯 (App Logic)
 */

let allEvents = [...EVENTS_DATA];
let allCandidates = [...CANDIDATES_DATA];
let bookmarkedEventIds = JSON.parse(localStorage.getItem('elect_bookmarks') || '[]');

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavTabs();
  initFilterListeners();
  initModals();
  initFormSubmit();
  
  updateStats();
  renderEvents();
  renderCandidates();
  renderBookmarks();
  
  if (window.lucide) {
    lucide.createIcons();
  }
});

/* --- Theme Handler --- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('elect_theme') || 'dark';

  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('elect_theme', isDark ? 'dark' : 'light');
  });
}

/* --- Navigation Tabs Handler --- */
function initNavTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }

      if (targetId === 'tab-map') {
        resizeMap();
        updateMapMarkers(getFilteredEvents());
      }
    });
  });
}

/* --- Filter & Search Logic --- */
function initFilterListeners() {
  const searchInput = document.getElementById('input-search');
  const btnClearSearch = document.getElementById('btn-clear-search');
  const selectRegion = document.getElementById('select-region');
  const selectParty = document.getElementById('select-party');
  const selectType = document.getElementById('select-type');
  const selectDate = document.getElementById('select-date');
  const selectSort = document.getElementById('select-sort');
  const btnReset = document.getElementById('btn-reset-filters');

  const onFilterChange = () => {
    if (searchInput.value.trim().length > 0) {
      btnClearSearch.classList.remove('hidden');
    } else {
      btnClearSearch.classList.add('hidden');
    }
    renderEvents();
  };

  searchInput.addEventListener('input', onFilterChange);
  selectRegion.addEventListener('change', onFilterChange);
  selectParty.addEventListener('change', onFilterChange);
  selectType.addEventListener('change', onFilterChange);
  selectDate.addEventListener('change', onFilterChange);
  selectSort.addEventListener('change', onFilterChange);

  btnClearSearch.addEventListener('click', () => {
    searchInput.value = '';
    onFilterChange();
  });

  btnReset.addEventListener('click', resetAllFilters);
}

function resetAllFilters() {
  document.getElementById('input-search').value = '';
  document.getElementById('select-region').value = 'all';
  document.getElementById('select-party').value = 'all';
  document.getElementById('select-type').value = 'all';
  document.getElementById('select-date').value = 'all';
  document.getElementById('select-sort').value = 'date-asc';
  document.getElementById('btn-clear-search').classList.add('hidden');
  renderEvents();
}

function getFilteredEvents() {
  const query = document.getElementById('input-search').value.toLowerCase().trim();
  const region = document.getElementById('select-region').value;
  const party = document.getElementById('select-party').value;
  const type = document.getElementById('select-type').value;
  const dateFilter = document.getElementById('select-date').value;
  const sort = document.getElementById('select-sort').value;

  const todayStr = '2026-09-12';

  let filtered = allEvents.filter(evt => {
    // Search Query
    if (query) {
      const matchSearch = 
        evt.title.toLowerCase().includes(query) ||
        evt.candidateName.toLowerCase().includes(query) ||
        evt.locationName.toLowerCase().includes(query) ||
        evt.district.toLowerCase().includes(query) ||
        evt.address.toLowerCase().includes(query);
      if (!matchSearch) return false;
    }

    // Region
    if (region !== 'all' && evt.region !== region) return false;
    // Party
    if (party !== 'all' && evt.party !== party) return false;
    // Type
    if (type !== 'all' && evt.type !== type) return false;

    // Date Filter
    if (dateFilter === 'today' && evt.date !== todayStr) return false;
    if (dateFilter === 'tomorrow' && evt.date !== '2026-09-13') return false;
    if (dateFilter === 'this-week') {
      if (evt.date < todayStr || evt.date > '2026-09-18') return false;
    }
    if (dateFilter === 'weekend') {
      if (evt.date !== '2026-09-12' && evt.date !== '2026-09-13') return false;
    }

    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    if (sort === 'date-asc') return a.date.localeCompare(b.date);
    if (sort === 'date-desc') return b.date.localeCompare(a.date);
    if (sort === 'candidate') return a.region.localeCompare(b.region, 'zh-TW') || a.candidateName.localeCompare(b.candidateName, 'zh-TW');
    return 0;
  });

  return filtered;
}

/* --- Render Functions --- */
function updateStats() {
  document.getElementById('stat-total-events').innerText = allEvents.length;
  document.getElementById('stat-total-candidates').innerText = allCandidates.length;
}

function renderEvents() {
  const events = getFilteredEvents();
  const grid = document.getElementById('events-grid');
  const emptyState = document.getElementById('no-events-placeholder');
  const resultCount = document.getElementById('result-count');

  resultCount.innerText = `${events.length} 項結果`;

  if (events.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  grid.innerHTML = events.map(evt => createEventCardHTML(evt)).join('');

  if (window.lucide) {
    lucide.createIcons();
  }

  // Update map if active
  const activeTab = document.querySelector('.nav-tab.active')?.getAttribute('data-target');
  if (activeTab === 'tab-map') {
    updateMapMarkers(events);
  }
}

function createEventCardHTML(evt) {
  const isBookmarked = bookmarkedEventIds.includes(evt.id);
  const partyStyle = PARTY_COLORS[evt.party] || PARTY_COLORS['無黨籍'];
  const cand = allCandidates.find(c => c.id === evt.candidateId) || {};
  const avatarUrl = cand.avatar;
  const initial = cand.initials || evt.candidateName.substring(0, 1);

  return `
    <article class="event-card card" id="card-${evt.id}">
      <div class="event-card-header">
        <span class="party-badge" style="color: ${partyStyle.hex}; border-color: ${partyStyle.hex}; background: ${partyStyle.bg}">
          ${evt.party}
        </span>
        <span class="type-badge">${evt.type}</span>
        ${evt.verified ? `<span class="status-badge"><i data-lucide="check-circle" style="width:12px;height:12px;display:inline;"></i> 官方</span>` : ''}
      </div>

      <h4 class="event-title" onclick="openEventDetailModal('${evt.id}')">${evt.title}</h4>

      <div class="candidate-mini-info">
        ${avatarUrl ? 
          `<img src="${avatarUrl}" alt="${evt.candidateName}" class="cand-avatar">` : 
          `<div class="cand-avatar">${initial}</div>`
        }
        <div class="cand-meta">
          <span class="cand-name">${evt.candidateName}</span>
          <span class="cand-pos">${evt.position} (${evt.region})</span>
        </div>
      </div>

      <div class="event-info-list">
        <div class="event-info-item">
          <i data-lucide="calendar"></i>
          <span>${evt.date} (${getWeekday(evt.date)}) ${evt.time}</span>
        </div>
        <div class="event-info-item">
          <i data-lucide="map-pin"></i>
          <span>${evt.locationName}</span>
        </div>
      </div>

      <div class="event-card-actions">
        <button class="btn btn-outline btn-sm" onclick="openEventDetailModal('${evt.id}')">
          <i data-lucide="eye"></i> 查看詳情
        </button>
        <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark('${evt.id}')">
          <i data-lucide="bookmark"></i> ${isBookmarked ? '已收藏' : '收藏'}
        </button>
      </div>
    </article>
  `;
}

function renderCandidates() {
  const grid = document.getElementById('candidates-grid');
  grid.innerHTML = allCandidates.map(cand => {
    const partyStyle = PARTY_COLORS[cand.party] || PARTY_COLORS['無黨籍'];
    const countEvents = allEvents.filter(e => e.candidateId === cand.id).length;

    return `
      <div class="candidate-card card">
        <div>
          <div class="cand-card-top">
            <img src="${cand.avatar}" alt="${cand.name}" class="cand-large-avatar">
            <div class="cand-details">
              <h4>${cand.name}</h4>
              <span class="party-badge" style="color: ${partyStyle.hex}; border-color: ${partyStyle.hex}; background: ${partyStyle.bg}">
                ${cand.party}
              </span>
              <p class="cand-pos" style="margin-top: 4px;">${cand.position}</p>
              <p class="cand-slogan">「${cand.slogan}」</p>
            </div>
          </div>

          <div class="policy-tags">
            ${cand.policies.map(p => `<span class="policy-tag"><i data-lucide="check" style="width:10px;height:10px;display:inline;"></i> ${p}</span>`).join('')}
          </div>
        </div>

        <div>
          <p class="sub-text"><i data-lucide="calendar" style="width:14px;height:14px;display:inline;"></i> 登錄行程：<strong>${countEvents} 場</strong></p>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 0.75rem;">
            <button class="btn btn-outline btn-sm" onclick="filterByCandidate('${cand.name}')">
              <i data-lucide="search"></i> 查行程
            </button>
            <div class="cand-socials">
              ${cand.socials.facebook ? `<a href="${cand.socials.facebook}" target="_blank" class="social-icon" title="Facebook"><i data-lucide="facebook"></i></a>` : ''}
              ${cand.socials.instagram ? `<a href="${cand.socials.instagram}" target="_blank" class="social-icon" title="Instagram"><i data-lucide="instagram"></i></a>` : ''}
              ${cand.socials.youtube ? `<a href="${cand.socials.youtube}" target="_blank" class="social-icon" title="YouTube"><i data-lucide="video"></i></a>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterByCandidate(candidateName) {
  document.getElementById('input-search').value = candidateName;
  document.querySelector('.nav-tab[data-target="tab-schedule"]').click();
  renderEvents();
}

function renderBookmarks() {
  const grid = document.getElementById('bookmarks-grid');
  const emptyState = document.getElementById('no-bookmarks-placeholder');
  const countBadge = document.getElementById('bookmark-count-badge');

  countBadge.innerText = bookmarkedEventIds.length;

  const bookmarkedEvents = allEvents.filter(evt => bookmarkedEventIds.includes(evt.id));

  if (bookmarkedEvents.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  grid.innerHTML = bookmarkedEvents.map(evt => createEventCardHTML(evt)).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function toggleBookmark(eventId) {
  const index = bookmarkedEventIds.indexOf(eventId);
  if (index >= 0) {
    bookmarkedEventIds.splice(index, 1);
  } else {
    bookmarkedEventIds.push(eventId);
  }
  localStorage.setItem('elect_bookmarks', JSON.stringify(bookmarkedEventIds));

  renderEvents();
  renderBookmarks();
}

/* --- Modal Logic --- */
function initModals() {
  const detailModal = document.getElementById('modal-event-detail');
  const submitModal = document.getElementById('modal-submit-event');
  const btnSubmitEvent = document.getElementById('btn-submit-event');

  document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
    btn.addEventListener('click', () => {
      detailModal.classList.add('hidden');
      submitModal.classList.add('hidden');
    });
  });

  [detailModal, submitModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

  btnSubmitEvent.addEventListener('click', () => {
    submitModal.classList.remove('hidden');
  });
}

function openEventDetailModal(eventId) {
  const evt = allEvents.find(e => e.id === eventId);
  if (!evt) return;

  const partyStyle = PARTY_COLORS[evt.party] || PARTY_COLORS['無黨籍'];

  document.getElementById('modal-party-badge').innerText = evt.party;
  document.getElementById('modal-party-badge').style.color = partyStyle.hex;
  document.getElementById('modal-party-badge').style.borderColor = partyStyle.hex;
  document.getElementById('modal-party-badge').style.background = partyStyle.bg;

  document.getElementById('modal-event-type').innerText = evt.type;
  document.getElementById('modal-event-title').innerText = evt.title;
  document.getElementById('modal-candidate-name').innerText = evt.candidateName;
  document.getElementById('modal-candidate-position').innerText = `${evt.position} (${evt.region} ${evt.district})`;
  document.getElementById('modal-event-time').innerText = `${evt.date} (${getWeekday(evt.date)}) ${evt.time}`;
  document.getElementById('modal-event-location').innerText = evt.locationName;
  document.getElementById('modal-event-address').innerText = evt.address;
  document.getElementById('modal-event-desc').innerText = evt.description;

  const cand = allCandidates.find(c => c.id === evt.candidateId);
  const modalAvatar = document.getElementById('modal-candidate-avatar');
  if (cand && cand.avatar) {
    modalAvatar.innerHTML = `<img src="${cand.avatar}" alt="${cand.name}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
  } else {
    modalAvatar.innerHTML = `<div class="cand-avatar" style="width:100%;height:100%;">${evt.candidateName.substring(0,1)}</div>`;
  }

  // Google Calendar URL Generator
  const gcalBtn = document.getElementById('btn-add-gcal');
  const gcalUrl = generateGoogleCalendarUrl(evt);
  gcalBtn.setAttribute('href', gcalUrl);

  // Bookmark Button in Modal
  const bookmarkBtn = document.getElementById('btn-modal-bookmark');
  const isBookmarked = bookmarkedEventIds.includes(evt.id);
  bookmarkBtn.innerHTML = `<i data-lucide="bookmark"></i> ${isBookmarked ? '已收藏行程' : '收藏此行程'}`;
  bookmarkBtn.onclick = () => {
    toggleBookmark(evt.id);
    openEventDetailModal(evt.id);
  };

  document.getElementById('modal-event-detail').classList.remove('hidden');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function generateGoogleCalendarUrl(evt) {
  const cleanDate = evt.date.replace(/-/g, '');
  const startTimeStr = cleanDate + 'T090000';
  const endTimeStr = cleanDate + 'T120000';

  const title = encodeURIComponent(`【2026縣市長競選行程】${evt.candidateName} - ${evt.title}`);
  const details = encodeURIComponent(`縣市長參選人：${evt.candidateName} (${evt.party})\n活動類型：${evt.type}\n說明：${evt.description}`);
  const location = encodeURIComponent(`${evt.locationName}, ${evt.address}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTimeStr}/${endTimeStr}&details=${details}&location=${location}`;
}

/* --- Form Submit Handler --- */
function initFormSubmit() {
  const form = document.getElementById('form-new-event');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const candidateName = document.getElementById('form-candidate-name').value;
    const party = document.getElementById('form-party').value;
    const region = document.getElementById('form-region').value;
    const type = document.getElementById('form-type').value;
    const title = document.getElementById('form-event-title').value;
    const date = document.getElementById('form-date').value;
    const time = document.getElementById('form-time').value;
    const location = document.getElementById('form-location').value;
    const desc = document.getElementById('form-desc').value;

    const regionCoords = {
      '臺北市': { lat: 25.033, lng: 121.565 },
      '新北市': { lat: 25.012, lng: 121.465 },
      '桃園市': { lat: 24.993, lng: 121.301 },
      '臺中市': { lat: 24.162, lng: 120.640 },
      '臺南市': { lat: 22.999, lng: 120.212 },
      '高雄市': { lat: 22.627, lng: 120.301 },
      '基隆市': { lat: 25.128, lng: 121.741 },
      '新竹市': { lat: 24.813, lng: 120.967 },
      '新竹縣': { lat: 24.838, lng: 121.017 },
      '苗栗縣': { lat: 24.560, lng: 120.821 },
      '彰化縣': { lat: 24.081, lng: 120.538 },
      '南投縣': { lat: 23.915, lng: 120.686 },
      '雲林縣': { lat: 23.709, lng: 120.431 },
      '嘉義市': { lat: 23.480, lng: 120.449 },
      '嘉義縣': { lat: 23.458, lng: 120.292 },
      '屏東縣': { lat: 22.673, lng: 120.488 },
      '宜蘭縣': { lat: 24.757, lng: 121.753 },
      '花蓮縣': { lat: 23.987, lng: 121.601 },
      '臺東縣': { lat: 22.758, lng: 121.144 },
      '澎湖縣': { lat: 23.571, lng: 119.579 },
      '金門縣': { lat: 24.449, lng: 118.376 },
      '連江縣': { lat: 26.157, lng: 119.951 }
    };

    const coords = regionCoords[region] || { lat: 25.033, lng: 121.565 };

    const newEvt = {
      id: 'evt-' + Date.now(),
      candidateId: 'cand-custom',
      candidateName,
      party,
      position: `${region}長參選人`,
      region,
      district: region,
      title,
      type,
      date,
      time,
      locationName: location,
      address: location,
      lat: coords.lat + (Math.random() - 0.5) * 0.05,
      lng: coords.lng + (Math.random() - 0.5) * 0.05,
      description: desc || '由民眾熱心通報之縣市長競選行程。',
      status: 'submitted',
      verified: false
    };

    allEvents.unshift(newEvt);
    updateStats();
    renderEvents();

    document.getElementById('modal-submit-event').classList.add('hidden');
    form.reset();

    alert('通報成功！行程已新增至列表中。');
  });
}

/* --- Helpers --- */
function getWeekday(dateStr) {
  const days = ['日', '一', '二', '三', '四', '五', '六'];
  const d = new Date(dateStr);
  return days[d.getDay()] || '六';
}
