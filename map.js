// Initialize the Leaflet map
// Check if the map container exists
const mapContainer = document.getElementById("map");
if (!mapContainer) {
  console.error('Map container with id "map" not found.');
} else {
  var map = L.map("map", {
    zoomControl: false,
    attributionControl: true,
  }).setView([-29.3739, -50.8761], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Accessibility: set map container role and label
  mapContainer.setAttribute("role", "region");
  mapContainer.setAttribute("aria-label", "Interactive map of the region");
}
