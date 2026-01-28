// Initial example stores shown when the app loads
export const INITIAL_STORES = [
  { id: 1, name: 'Connaught Store', type: 'Flagship', lat: 28.6315, lng: 77.2167 },
  { id: 2, name: 'Dwarka Outlet', type: 'Franchise', lat: 28.5921, lng: 77.046 },
  { id: 3, name: 'Noida Service Center', type: 'Service', lat: 28.5355, lng: 77.391 },
]

// Service coverage polygon
export const SERVICE_COVERAGE_COORDS = [
  [
    [28.5, 77.0],
    [28.5, 77.4],
    [28.8, 77.4],
    [28.8, 77.0],
    [28.5, 77.0],
  ],
]

// Simple bounding box (lat/lng) 
export const SERVICE_COVERAGE_BOUNDS = {
  minLat: 28.5,
  maxLat: 28.8,
  minLng: 77.0,
  maxLng: 77.4,
}

export const DEFAULT_FILTERS = {
  Flagship: true,
  Franchise: true,
  Service: true,
}

export const DEFAULT_CITY_CENTER = [28.6139, 77.209] 
export const DEFAULT_CITY_ZOOM = 11

