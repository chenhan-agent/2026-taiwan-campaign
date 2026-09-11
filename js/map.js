/**
 * 2026 臺灣地方選舉 | 行程熱點地圖整合 (Leaflet.js)
 */

let leafletMap = null;
let markersGroup = null;

function initMap() {
  const mapContainer = document.getElementById('leaflet-map');
  if (!mapContainer || leafletMap) return;

  // Center around Taiwan
  leafletMap = L.map('leaflet-map').setView([24.2, 121.0], 8);

  // Add OpenStreetMap Tile Layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(leafletMap);

  markersGroup = L.layerGroup().addTo(leafletMap);
}

function updateMapMarkers(events) {
  if (!leafletMap) {
    initMap();
  }

  if (!markersGroup) return;

  markersGroup.clearLayers();

  const bounds = L.latLngBounds();
  let hasValidCoords = false;

  events.forEach(evt => {
    if (evt.lat && evt.lng) {
      hasValidCoords = true;
      const partyColor = PARTY_COLORS[evt.party]?.hex || '#2563eb';
      
      // Custom SVG Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background-color: ${partyColor};
            width: 28px;
            height: 28px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid white;
            box-shadow: 0 3px 8px rgba(0,0,0,0.3);
          ">
            <span style="
              transform: rotate(45deg);
              color: white;
              font-size: 11px;
              font-weight: 800;
              font-family: sans-serif;
            ">${evt.candidateName.substring(0, 1)}</span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
      });

      const marker = L.marker([evt.lat, evt.lng], { icon: customIcon });

      const popupContent = `
        <div class="map-popup-card">
          <span style="font-size: 11px; font-weight: 700; color: ${partyColor}; background: rgba(0,0,0,0.05); padding: 2px 6px; border-radius: 4px;">${evt.party}</span>
          <span style="font-size: 11px; color: #666; margin-left: 4px;">${evt.type}</span>
          <h4 style="margin-top: 4px;">${evt.candidateName} - ${evt.title}</h4>
          <p style="margin: 4px 0;"><i data-lucide="calendar"></i> ${evt.date} ${evt.time}</p>
          <p style="margin-bottom: 8px;"><i data-lucide="map-pin"></i> ${evt.locationName}</p>
          <button class="btn btn-primary btn-sm" style="width: 100%; font-size: 12px; justify-content: center;" onclick="openEventDetailModal('${evt.id}')">
            查看詳細行程與加行事曆
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersGroup.addLayer(marker);
      bounds.extend([evt.lat, evt.lng]);
    }
  });

  if (hasValidCoords && events.length > 0) {
    leafletMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
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
