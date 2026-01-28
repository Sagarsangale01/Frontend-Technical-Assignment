import React from 'react'

// Compact summary of the store that is currently selected
export function SelectedStoreCard({ store }) {
  return (
    <section className="panel">
      <h2 className="panel-title">Selected Store</h2>
      <div className="selected-store-card">
        <div className="selected-store-name">{store.name}</div>
        <div className="selected-store-type">{store.type}</div>
        <div className="selected-store-coords">
          Lat: {store.lat.toFixed(5)}, Lng: {store.lng.toFixed(5)}
        </div>
      </div>
    </section>
  )
}

