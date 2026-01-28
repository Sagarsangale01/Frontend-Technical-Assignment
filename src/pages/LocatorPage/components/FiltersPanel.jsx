import React from 'react'
import { getStoreColor } from '../mapIcons'

// Sidebar section that lets the user show or hide stores by type
export function FiltersPanel({ filters, onToggle, storeTypes }) {
  return (
    <section className="panel">
      <h2 className="panel-title">Filters</h2>
      <div className="filters">
        {storeTypes.map((type) => (
          <label key={type} className="filter-item">
            <input type="checkbox" checked={filters[type]} onChange={() => onToggle(type)} />
            <span
              className="filter-color-dot"
              style={{ backgroundColor: getStoreColor(type) }}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </section>
  )
}

