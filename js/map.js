/**
 * 2026 臺灣地方選舉 | 行程熱點地圖整合 (Leaflet.js + CARTO Tiles)
 */

let leafletMap = null;
let markersGroup = null;
let currentTileLayer = null;

function initMap() {
  const mapContainer = document.getElementById('leaflet-map');
  if (!mapContainer || leafletMap) return;

  // Center around Central Taiwan
  leafletMap = L.map('leaflet-map', {
    zoomControl: true,
    scrollWheelZoom: false
  }).setView([23.975, 120.973], 7.5);

  updateTileLayer();
  markersGroup = L.layerGroup().addTo(leafletMap);
}

function updateTileLayer() {
  if (!leafletMap) return;

  const isDark = document.documentElement.classList.contains('dark');
  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  if (currentTileLayer) {
    leafletMap.removeLayer(currentTileLayer);
  }

  currentTileLayer = L.tileLayer(tileUrl, {
    maxZoom: 19,
    subdomains: 'abcd',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
  }).addTo(leafletMap);
}

function updateMapMarkers(events) {
  if (!leafletMap) {
    initMap();
  }

  if (!markersGroup) return;

  markersGroup.clearLayers();

  const bounds = L.latLngBounds();
  const taiwanBounds = L.latLngBounds();
  let hasValidCoords = false;
  let hasTaiwanCoords = false;

  events.forEach(evt => {
    if (evt.lat && evt.lng) {
      hasValidCoords = true;
      const partyStyle = PARTY_COLORS[evt.party] || PARTY_COLORS['無黨籍'];
      const partyColor = partyStyle.hex || '#3b82f6';
      const gradient = partyStyle.gradient || `linear-gradient(135deg, ${partyColor}, #60a5fa)`;
      
      // Custom Sleek Gradient Pin Icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background: ${gradient};
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.35);
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <span style="
              transform: rotate(45deg);
              color: white;
              font-size: 13px;
              font-weight: 900;
              font-family: var(--font-heading), 'Noto Sans TC', sans-serif;
              text-shadow: 0 1px 2px rgba(0,0,0,0.4);
            ">${evt.candidateName.substring(0, 1)}</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([evt.lat, evt.lng], { icon: customIcon });

      const popupContent = `
        <div class="map-popup-card">
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
            <span class="party-badge" style="color: ${partyStyle.hex}; border-color: ${partyStyle.hex}; background: ${partyStyle.bg}; font-size:11px; padding:2px 6px;">${evt.party}</span>
            <span class="type-badge" style="font-size:11px; padding:2px 6px;">${evt.type}</span>
          </div>
          <h4 style="margin: 4px 0 6px; font-size:13px; font-weight:800;">${evt.candidateName}｜${evt.title}</h4>
          <p style="margin: 4px 0; font-size:12px; color:var(--text-secondary);"><i data-lucide="calendar"></i> ${evt.date} (${getWeekday(evt.date)}) ${evt.time}</p>
          <p style="margin-bottom: 8px; font-size:12px; color:var(--text-secondary);"><i data-lucide="map-pin"></i> ${evt.locationName}</p>
          <button class="btn btn-primary btn-sm" style="width: 100%; font-size: 12px; padding: 5px 8px; justify-content: center;" onclick="openEventDetailModal('${evt.id}')">
            <i data-lucide="eye"></i> 查看詳細與加行事曆
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersGroup.addLayer(marker);
      bounds.extend([evt.lat, evt.lng]);

      if (evt.lat >= 21.0 && evt.lat <= 26.5 && evt.lng >= 118.0 && evt.lng <= 122.5) {
        taiwanBounds.extend([evt.lat, evt.lng]);
        hasTaiwanCoords = true;
      }
    }
  });

  if (hasTaiwanCoords) {
    leafletMap.fitBounds(taiwanBounds, { padding: [50, 50], maxZoom: 12 });
  } else if (hasValidCoords && events.length > 0) {
    leafletMap.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
  }

  // Refresh icons in Leaflet popups after DOM inserts
  setTimeout(() => {
    if (window.lucide) lucide.createIcons();
  }, 100);
}

function resizeMap() {
  if (leafletMap) {
    setTimeout(() => {
      leafletMap.invalidateSize();
    }, 200);
  }
}
