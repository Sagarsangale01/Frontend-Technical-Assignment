import React from 'react'

// Form shown in the sidebar for adding a new store
// Coordinates can be typed manually or filled automatically by clicking on the map
export function AddStoreForm({
  name,
  type,
  lat,
  lng,
  error,
  onNameChange,
  onTypeChange,
  onLatChange,
  onLngChange,
  onSubmit,
}) {
  return (
    <section className="panel">
      <h2 className="panel-title">Add New Store</h2>
      <p className="panel-helper">
        Either type the coordinates manually or click on the map to auto‑fill latitude and longitude.
      </p>

      <form className="store-form" onSubmit={onSubmit}>
        <div className="form-field">
          <label htmlFor="store-name">Store Name</label>
          <input
            id="store-name"
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g. Gurgaon Outlet"
          />
        </div>

        <div className="form-field">
          <label htmlFor="store-type">Store Type</label>
          <select id="store-type" value={type} onChange={(e) => onTypeChange(e.target.value)}>
            <option value="Flagship">Flagship</option>
            <option value="Franchise">Franchise</option>
            <option value="Service">Service</option>
          </select>
        </div>

        <div className="coords-grid">
          <div className="form-field">
            <label htmlFor="store-lat">Latitude</label>
            <input
              id="store-lat"
              type="number"
              value={lat}
              onChange={(e) => onLatChange(e.target.value)}
              step="0.000001"
              placeholder="28.6139"
            />
          </div>
          <div className="form-field">
            <label htmlFor="store-lng">Longitude</label>
            <input
              id="store-lng"
              type="number"
              value={lng}
              onChange={(e) => onLngChange(e.target.value)}
              step="0.000001"
              placeholder="77.2090"
            />
          </div>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>  <span role="img" aria-label="info">💡</span> Click on the map to auto-fill coordinates </p>
      {error && <div className="form-error">{error}</div>}

      <button type="submit" className="primary-button">
        Add Store
      </button>
    </form>
  </section>
)}
