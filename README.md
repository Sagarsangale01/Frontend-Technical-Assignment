# Store Locator and Service Coverage Web Application

A React-based single-page application designed for featuring a **store locator** and **service coverage** visualization. This project implements all functional requirements using React (Vite) and Leaflet maps.

---

## 1. Project Overview

- **Framework**: React (Vite)
- **Language**: JavaScript
- **Map Library**: Leaflet + React Leaflet
- **State Management**: React Hooks (`useState`, `useEffect`, `useMemo`)
- **Styling**: Modern, responsive CSS
- **Persistence**: `localStorage` used to save and persist added stores

Users can visualize stores on an interactive map, filter them by type, synchronize interactions between a list view and the map, and add new stores with automatic coordinate filling via map interaction.

---

## 2. Key Features

### 🗺️ Interactive Map
- Centered on predefined zoom levels.
- Displays a **Service Coverage Area** (Polygon) to show operational boundaries.
- Interactive store markers with custom styles based on store type.

### 🔍 Filter Panel
- Filter stores by category: **Flagship**, **Franchise**, or **Service**.
- Real-time updates on both the map markers and the sidebar list.

### 🔄 List & Map Synchronization
- **List to Map**: Clicking a store in the list zooms and pans the map to that store's location and opens its info popup.
- **Map to List**: Clicking a marker on the map highlights the corresponding store in the list.

### ➕ Dynamic Store Management
- Add new stores via a dedicated form.
- **Coordinate Autofill**: Clicking anywhere on the map automatically populates the Latitude and Longitude fields in the form.
- Persistent storage ensures that added stores remain available after a page refresh.

### 📱 Responsive Design
- Optimized for various screen sizes, from desktops to mobile devices.
- Uses a flexible grid/flexbox layout that adapts to smaller viewports.

---

## 3. Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### Installation

1. Clone or download the repository.
2. Navigate to the project directory:
   ```bash
   cd Frontend-Technical-Assignment
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:
```bash
npm run dev
```

 **Note:** If the `npm` script fails to run due to execution policies, use:
```bash
 npm.cmd run dev
```

Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

### Production Build

To create an optimized production build:
```bash
npm run build
```
The output will be generated in the `dist/` directory.

---

## 4. Project Structure

- **src/pages/LocatorPage/**: Contains the main logic and components for the Store Locator.
  - `LocatorPage.jsx`: The main container component managing state and layout.
  - `data.js`: Initial sample data for stores and service coverage coordinates.
  - `storage.js`: LocalStorage utility for data persistence.
  - `mapIcons.js`: Logic for generating dynamic map markers based on store type.
- **src/pages/LocatorPage/components/**:
  - `FiltersPanel.jsx`: Checkbox-based filtering for store types.
  - `StoreList.jsx`: Searchable/clickable list of filtered stores.
  - `AddStoreForm.jsx`: Form for adding new store locations.
  - `LocatorMap.jsx`: Leaflet map implementation with markers and polygons.
- **src/style.css**: Global styles and component-specific styling.

---

## 5. Technology Stack

- **Vite** – Next-generation frontend tooling.
- **React** – Component-based UI library.
- **Leaflet** – Open-source JavaScript library for maps.
- **React Leaflet** – React components for Leaflet maps.

---

## 6. Implementation Notes

- **Data Flow**: State is managed in the `LocatorPage` component and passed down to children via props for a unidirectional data flow.
- **Performance**: `useMemo` is used to filter stores efficiently, ensuring the application remains snappy even as more stores are added.
- **Precision**: Coordinates captured from map clicks are rounded to 6 decimal places for accuracy.
- **Persistence**: The application checks `localStorage` on load; if no saved data is found, it falls back to the default dataset provided in the assignment.