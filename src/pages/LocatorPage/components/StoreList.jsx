import React from 'react'
import { getStoreColor } from '../mapIcons'

// Sidebar list showing all stores that are currently visible on the map
// Clicking a row recenters the map and opens the corresponding marker popup
export function StoreList({ stores, totalCount, selectedStoreId, onSelect }) {
  return (
    <section className="panel">
      <h2 className="panel-title">
        Stores ({stores.length}/{totalCount})
      </h2>

      <div className="store-list">
        {stores.length === 0 && <div className="empty-state">No stores match the active filters.</div>}

        {stores.map((store) => {
          const isSelected = store.id === selectedStoreId
          const color = getStoreColor(store.type)

          return (
            <button
              key={store.id}
              type="button"
              className={`store-list-item ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(store)}
            >
              <div className="store-list-main">
                <span className="store-list-name">{store.name}</span>
                <span
                  className="store-list-type-pill"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  {store.type}
                </span>
              </div>
              <div className="store-list-meta">
                <span>
                  Lat: {store.lat.toFixed(3)}, Lng: {store.lng.toFixed(3)}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

