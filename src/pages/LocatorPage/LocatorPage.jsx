import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  DEFAULT_CITY_CENTER,
  DEFAULT_CITY_ZOOM,
  DEFAULT_FILTERS,
  SERVICE_COVERAGE_BOUNDS,
  SERVICE_COVERAGE_COORDS,
} from './data'
import { loadInitialStores, saveStores } from './storage'
import { AddStoreForm } from './components/AddStoreForm'
import { FiltersPanel } from './components/FiltersPanel'
import { LocatorMap } from './components/LocatorMap'
import { SelectedStoreCard } from './components/SelectedStoreCard'
import { StoreList } from './components/StoreList'

export function LocatorPage() {
  // Main page state that keeps the map, filters and list in sync
  const [stores, setStores] = useState(() => loadInitialStores())
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [selectedStoreId, setSelectedStoreId] = useState(null)
  const [mapCenter, setMapCenter] = useState(DEFAULT_CITY_CENTER)
  const [mapZoom, setMapZoom] = useState(DEFAULT_CITY_ZOOM)

  const markerRefs = useRef({})

  const [newStoreName, setNewStoreName] = useState('')
  const [newStoreType, setNewStoreType] = useState('Flagship')
  const [newStoreLat, setNewStoreLat] = useState('')
  const [newStoreLng, setNewStoreLng] = useState('')
  const [formError, setFormError] = useState(null)

  // Persist added stores in localStorage
  useEffect(() => {
    saveStores(stores)
  }, [stores])

  // Stores that pass the active filters
  const visibleStores = useMemo(
    () => stores.filter((s) => filters[s.type]),
    [stores, filters],
  )

  // Find the currently selected store
  const selectedStore = useMemo(
    () => stores.find((s) => s.id === selectedStoreId) ?? null,
    [stores, selectedStoreId],
  )

  // Open the marker popup on the map when a store is selected from the list
  useEffect(() => {
    if (selectedStoreId == null) return
    const marker = markerRefs.current[selectedStoreId]
    if (marker && typeof marker.openPopup === 'function') marker.openPopup()
  }, [selectedStoreId])

  function toggleFilter(type) {
    setFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  // Copy the coordinates into the add‑store form when the user clicks on the map
  function handleMapClick(lat, lng) {
    setNewStoreLat(Number(lat).toFixed(6))
    setNewStoreLng(Number(lng).toFixed(6))
  }

  // Handle both list clicks and marker clicks
  function handleSelectStore(store) {
    setSelectedStoreId(store.id)
    setMapCenter([store.lat, store.lng])
    setMapZoom(14)
  }

  function handleMarkerRef(storeId, marker) {
    markerRefs.current[storeId] = marker
  }

  // Add a new store
  function handleSubmit(e) {
    e.preventDefault()
    setFormError(null)

    if (!newStoreName.trim()) {
      setFormError('Please enter a store name.')
      return
    }

    const lat = Number(newStoreLat)
    const lng = Number(newStoreLng)

    if (!newStoreLat.trim() || !newStoreLng.trim() || Number.isNaN(lat) || Number.isNaN(lng)) {
      setFormError('Latitude and longitude must be valid numbers.')
      return
    }

    const { minLat, maxLat, minLng, maxLng } = SERVICE_COVERAGE_BOUNDS
    if (lat < minLat || lat > maxLat || lng < minLng || lng > maxLng) {
      setFormError('Coordinates must be inside the service coverage area.')
      return
    }

    const nextId = stores.length ? Math.max(...stores.map((s) => s.id)) + 1 : 1

    const newStore = {
      id: nextId,
      name: newStoreName.trim(),
      type: newStoreType,
      lat,
      lng,
    }

    setStores((prev) => [...prev, newStore])
    setSelectedStoreId(newStore.id)
    setMapCenter([lat, lng])
    setMapZoom(14)

    setNewStoreName('')
    setNewStoreLat('')
    setNewStoreLng('')
    setNewStoreType('Flagship')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <header className="sidebar-header">
          <h1 className="app-title">Store Locator and Service Coverage Web Application</h1>
          <p className="app-subtitle">
            Explore stores, filter them by type and see the live‑updated coverage map.
          </p>
        </header>

        {/* FiltersPanel component */}
        <FiltersPanel
          filters={filters}
          storeTypes={Object.keys(DEFAULT_FILTERS)}
          onToggle={toggleFilter}
        />

        {/* StoreList component */}
        <StoreList
          stores={visibleStores}
          totalCount={stores.length}
          selectedStoreId={selectedStoreId}
          onSelect={handleSelectStore}
        />

        {/* SelectedStoreCard component */}
        {selectedStore && <SelectedStoreCard store={selectedStore} />}

        {/* AddStoreForm component */}
        <AddStoreForm
          name={newStoreName}
          type={newStoreType}
          lat={newStoreLat}
          lng={newStoreLng}
          error={formError}
          onNameChange={setNewStoreName}
          onTypeChange={setNewStoreType}
          onLatChange={setNewStoreLat}
          onLngChange={setNewStoreLng}
          onSubmit={handleSubmit}
        />

      </aside>

      {/* LocatorMap component */}
      <LocatorMap
        center={mapCenter}
        zoom={mapZoom}
        visibleStores={visibleStores}
        serviceCoverageCoords={SERVICE_COVERAGE_COORDS}
        onSelectStore={handleSelectStore}
        onMapClick={handleMapClick}
        onMarkerRef={handleMarkerRef}
      />
    </div>
  )
}

