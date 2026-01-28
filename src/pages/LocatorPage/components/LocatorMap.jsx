import React, { useEffect } from 'react'
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import { createStoreIcon } from '../mapIcons'

// Keeps the map view centered when a store is selected from the list
function MapController({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom, { animate: true })
  }, [center, zoom, map])
  return null
}

// Listens for map clicks and forwards the latitude/longitude to the parent
function MapClickHandler({ onClick }) {
  useMapEvents({
    click: (e) => onClick(e.latlng.lat, e.latlng.lng),
  })
  return null
}

// Main map view: tiles, coverage polygon and store markers
export function LocatorMap({
  center,
  zoom,
  visibleStores,
  serviceCoverageCoords,
  onSelectStore,
  onMapClick,
  onMarkerRef,
}) {
  return (
    <main className="map-panel">
      <MapContainer center={center} zoom={zoom} className="map-container" scrollWheelZoom>
        <MapController center={center} zoom={zoom} />
        <MapClickHandler onClick={onMapClick} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polygon
          pathOptions={{ color: '#0f766e', weight: 2, fillOpacity: 0.15 }}
          positions={serviceCoverageCoords}
        />

        {visibleStores.map((store) => (
          <Marker
            key={store.id}
            position={[store.lat, store.lng]}
            icon={createStoreIcon(store.type)}
            eventHandlers={{ click: () => onSelectStore(store) }}
            ref={(marker) => onMarkerRef(store.id, marker)}
          >
            <Popup>
              <div className="popup-content">
                <div className="popup-title">{store.name}</div>
                <div className="popup-type">
                  Type: <span>{store.type}</span>
                </div>
                <div className="popup-coords">
                  Lat: {store.lat.toFixed(5)}, Lng: {store.lng.toFixed(5)}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </main>
  )
}

