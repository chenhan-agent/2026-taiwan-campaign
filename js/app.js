/**
 * 2026 臺灣縣市長選舉 | 主應用程式邏輯 (App Logic)
 * 深度整合 Lucide Icons 與簡約現代政治人物識別徽章
 */

let allEvents = [...EVENTS_DATA];
let allCandidates = [...CANDIDATES_DATA];
let bookmarkedEventIds = JSON.parse(localStorage.getItem('elect_bookmarks') || '[]');

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavTabs();
  initFilterListeners();
  initQuickRegionPills();
  initModals();
  initFormSubmit();
  
  updateStats();
  renderEvents();
  renderCandidates();
  renderBookmarks();
  initCountdown();

  refreshLucideIcons();
});

function refreshLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

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
    if (typeof updateTileLayer === 'function') {
      updateTileLayer();
    }
  });
}

/* --- Countdown Timer --- */
function initCountdown() {
  const countdownEl = document.getElementById('hero-countdown-days');
  if (!countdownEl) return;

  const electionDate = new Date('2026-11-28T08:00:00+08:00');
  const currentDate = new Date('2026-09-11T15:00:00+08:00');
  const diffTime = electionDate - currentDate;
  const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  countdownEl.innerText = diffDays;
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

      refreshLucideIcons();
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
    syncQuickPills(selectRegion.value);
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

function initQuickRegionPills() {
  const pills = document.querySelectorAll('.quick-pill');
  const selectRegion = document.getElementById('select-region');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const region = pill.getAttribute('data-region');
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      if (selectRegion) {
        selectRegion.value = region;
      }
      renderEvents();
    });
  });
}

function syncQuickPills(currentRegion) {
  const pills = document.querySelectorAll('.quick-pill');
  pills.forEach(pill => {
    if (pill.getAttribute('data-region') === currentRegion) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
}

function resetAllFilters() {
  document.getElementById('input-search').value = '';
  document.getElementById('select-region').value = 'all';
  document.getElementById('select-party').value = 'all';
  document.getElementById('select-type').value = 'all';
  document.getElementById('select-date').value = 'all';
  document.getElementById('select-sort').value = 'date-asc';
  document.getElementById('btn-clear-search').classList.add('hidden');
  syncQuickPills('all');
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
    if (query) {
      const matchSearch = 
        evt.title.toLowerCase().includes(query) ||
        evt.candidateName.toLowerCase().includes(query) ||
        evt.locationName.toLowerCase().includes(query) ||
        evt.district.toLowerCase().includes(query) ||
        evt.address.toLowerCase().includes(query);
      if (!matchSearch) return false;
    }

    if (region !== 'all' && evt.region !== region) return false;
    if (party !== 'all' && evt.party !== party) return false;
    if (type !== 'all' && evt.type !== type) return false;

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

  filtered.sort((a, b) => {
    if (sort === 'date-asc') return a.date.localeCompare(b.date);
    if (sort === 'date-desc') return b.date.localeCompare(a.date);
    if (sort === 'candidate') return a.region.localeCompare(b.region, 'zh-TW') || a.candidateName.localeCompare(b.candidateName, 'zh-TW');
    return 0;
  });

  return filtered;
}

/* --- Candidate Avatar Badge Generator --- */
function getCandidateAvatarHTML(cand, size = 'md') {
  const name = cand?.name || cand?.candidateName || '選';
  const initial = cand?.initials || name.substring(0, 1);
  const party = cand?.party || '無黨籍';
  const partyStyle = PARTY_COLORS[party] || PARTY_COLORS['無黨籍'];
  const hex = partyStyle.hex || '#64748b';

  return `
    <div class="cand-avatar-frame size-${size}" style="border-color: ${partyStyle.border};" title="${name} (${party})">
      <span class="cand-char" style="color: ${hex};">${initial}</span>
      <span class="cand-dot" style="background: ${hex};"></span>
    </div>
  `;
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

  resultCount.innerText = `${events.length} 場行程`;

  if (events.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
    refreshLucideIcons();
    return;
  }

  emptyState.classList.add('hidden');
  grid.innerHTML = events.map(evt => createEventCardHTML(evt)).join('');

  refreshLucideIcons();

  const activeTab = document.querySelector('.nav-tab.active')?.getAttribute('data-target');
  if (activeTab === 'tab-map') {
    updateMapMarkers(events);
  }
}

function createEventCardHTML(evt) {
  const isBookmarked = bookmarkedEventIds.includes(evt.id);
  const partyStyle = PARTY_COLORS[evt.party] || PARTY_COLORS['無黨籍'];
  const cand = allCandidates.find(c => c.id === evt.candidateId) || {
    name: evt.candidateName,
    party: evt.party,
    position: evt.position,
    initials: evt.candidateName.substring(0, 1)
  };

  return `
    <article class="event-card card" id="card-${evt.id}">
      <div class="event-card-header">
        <div class="badge-group">
          <span class="party-badge" style="color: ${partyStyle.hex}; border-color: ${partyStyle.hex}; background: ${partyStyle.bg}">
            ${evt.party}
          </span>
          <span class="type-badge">
            <i data-lucide="tag"></i> ${evt.type}
          </span>
        </div>
        ${evt.verified ? `<span class="status-badge"><i data-lucide="badge-check"></i> 官方認證</span>` : ''}
      </div>

      <h4 class="event-title" onclick="openEventDetailModal('${evt.id}')">${evt.title}</h4>

      <div class="candidate-mini-info">
        ${getCandidateAvatarHTML(cand, 'md')}
        <div class="cand-meta">
          <span class="cand-name">${evt.candidateName}</span>
          <span class="cand-pos">${evt.position} · ${evt.region} ${evt.district}</span>
        </div>
      </div>

      <div class="event-info-list">
        <div class="event-info-item">
          <i data-lucide="calendar"></i>
          <span>${evt.date} (${getWeekday(evt.date)})</span>
        </div>
        <div class="event-info-item">
          <i data-lucide="clock"></i>
          <span>${evt.time}</span>
        </div>
        <div class="event-info-item">
          <i data-lucide="map-pin"></i>
          <span>${evt.locationName}</span>
        </div>
      </div>

      ${evt.sourceUrl ? `
        <div class="event-source-row">
          <i data-lucide="link-2"></i>
          <span>情報來源：</span>
          <a href="${evt.sourceUrl}" target="_blank" rel="noopener" class="source-link" title="開啟情報原始來源連結">
            ${evt.sourceName || '公開媒體報導 / 官方公告'} <i data-lucide="external-link" style="width:11px;height:11px;"></i>
          </a>
        </div>
      ` : ''}

      <div class="event-card-actions">
        <button class="btn btn-outline btn-sm" onclick="openEventDetailModal('${evt.id}')">
          <i data-lucide="arrow-up-right"></i> 查看詳情
        </button>
        <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark('${evt.id}')">
          <i data-lucide="bookmark"></i> ${isBookmarked ? '已關注' : '關注行程'}
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
    const candUpcoming = allEvents.filter(e => e.candidateId === cand.id).slice(0, 2);

    const upcomingHTML = candUpcoming.length > 0 ? `
      <div class="cand-events-preview">
        <div class="preview-title"><i data-lucide="calendar"></i> 近期公開造勢與行程：</div>
        <div class="preview-event-list">
          ${candUpcoming.map(e => `
            <div class="preview-event-item" onclick="openEventDetailModal('${e.id}')">
              <span class="preview-event-date">${e.date.substring(5)}</span>
              <span class="preview-event-title" title="${e.title}">${e.title}</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : `
      <div class="cand-events-preview">
        <div class="preview-title"><i data-lucide="calendar"></i> 近期公開造勢與行程：</div>
        <p class="preview-empty-text">新行程確認中，歡迎熱心通報！</p>
      </div>
    `;

    return `
      <div class="candidate-card card">
        <div>
          <div class="cand-card-top">
            ${getCandidateAvatarHTML(cand, 'lg')}
            <div class="cand-details">
              <h4>${cand.name} <span class="badge" style="font-size:11px; font-weight:600; background:var(--primary-light); color:var(--primary);">${cand.region}</span></h4>
              <span class="party-badge" style="color: ${partyStyle.hex}; border-color: ${partyStyle.hex}; background: ${partyStyle.bg}">
                ${cand.party}
              </span>
              <div class="cand-pos-chip">${cand.position}</div>
            </div>
          </div>

          <div class="cand-slogan-box" style="border-left-color: ${partyStyle.hex};">
            「${cand.slogan}」
          </div>

          ${upcomingHTML}
        </div>

        <div>
          <div class="cand-card-footer">
            <span class="sub-text"><i data-lucide="calendar"></i> 登錄行程：<strong>${countEvents} 場</strong></span>
            <button class="btn btn-outline btn-sm" onclick="filterByCandidate('${cand.name}')">
              <i data-lucide="calendar"></i> 查看全部行程
            </button>
          </div>
          
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 0.75rem;">
            <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">官方社群</span>
            <div class="cand-socials">
              ${cand.socials?.facebook ? `
                <a href="${cand.socials.facebook}" target="_blank" rel="noopener" class="social-link" title="Facebook 官方專頁">
                  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>` : ''
              }
              ${cand.socials?.instagram ? `
                <a href="${cand.socials.instagram}" target="_blank" rel="noopener" class="social-link" title="Instagram 官方帳號">
                  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>` : ''
              }
              ${cand.socials?.threads ? `
                <a href="${cand.socials.threads}" target="_blank" rel="noopener" class="social-link" title="Threads 官方動態">
                  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
                </a>` : ''
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  refreshLucideIcons();
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
    refreshLucideIcons();
    return;
  }

  emptyState.classList.add('hidden');
  grid.innerHTML = bookmarkedEvents.map(evt => createEventCardHTML(evt)).join('');
  refreshLucideIcons();
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
    refreshLucideIcons();
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

  const cand = allCandidates.find(c => c.id === evt.candidateId) || {
    name: evt.candidateName,
    party: evt.party,
    position: evt.position,
    initials: evt.candidateName.substring(0, 1)
  };
  const modalAvatar = document.getElementById('modal-candidate-avatar');
  modalAvatar.innerHTML = getCandidateAvatarHTML(cand, 'lg');

  // Source Link in Modal
  const sourceRow = document.getElementById('modal-source-row');
  const sourceLink = document.getElementById('modal-event-source');
  if (evt.sourceUrl && sourceRow && sourceLink) {
    sourceRow.classList.remove('hidden');
    sourceLink.setAttribute('href', evt.sourceUrl);
    sourceLink.innerHTML = `<i data-lucide="link-2"></i> ${evt.sourceName || '檢視情報原始來源連結'}`;
  } else if (sourceRow) {
    sourceRow.classList.add('hidden');
  }

  // Google Calendar URL Generator
  const gcalBtn = document.getElementById('btn-add-gcal');
  const gcalUrl = generateGoogleCalendarUrl(evt);
  gcalBtn.setAttribute('href', gcalUrl);

  // Bookmark Button in Modal
  const bookmarkBtn = document.getElementById('btn-modal-bookmark');
  const isBookmarked = bookmarkedEventIds.includes(evt.id);
  bookmarkBtn.innerHTML = `<i data-lucide="bookmark"></i> ${isBookmarked ? '已關注此行程' : '關注此行程'}`;
  bookmarkBtn.onclick = () => {
    toggleBookmark(evt.id);
    openEventDetailModal(evt.id);
  };

  document.getElementById('modal-event-detail').classList.remove('hidden');
  refreshLucideIcons();
}

function generateGoogleCalendarUrl(evt) {
  const cleanDate = evt.date.replace(/-/g, '');
  const startTimeStr = cleanDate + 'T090000';
  const endTimeStr = cleanDate + 'T120000';

  const title = encodeURIComponent(`【2026百里侯大選】${evt.candidateName} - ${evt.title}`);
  const details = encodeURIComponent(`參選人：${evt.candidateName} (${evt.party})\n活動類型：${evt.type}\n說明：${evt.description}`);
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
