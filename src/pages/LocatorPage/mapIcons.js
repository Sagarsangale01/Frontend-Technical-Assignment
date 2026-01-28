import L from 'leaflet'

// Color for each store type on the map
export function getStoreColor(type) {
  switch (type) {
    case 'Flagship':
      return '#2563eb' // blue
    case 'Franchise':
      return '#16a34a' // green
    case 'Service':
      return '#ea580c' // orange
    default:
      return '#4b5563'
  }
}

// Small circular marker icon
export function createStoreIcon(type) {
  const color = getStoreColor(type)
  return L.divIcon({
    className: 'store-marker',
    html: `<div style="
      width: 20px;
      height: 20px;
      border-radius: 999px;
      background: ${color};
      border: 2px solid white;
      box-shadow: 0 0 0 2px rgba(0,0,0,0.35);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  })
}

