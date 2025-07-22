// Create a map and set its view to center on the US
var map = L.map("map").setView([39.8283, -98.5795], 4);

// Add a tile layer to the map (this is the base layer that provides the map imagery)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Create marker cluster group
var markers = L.markerClusterGroup();

// IP location data as GeoJSON
var ipLocationData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-73.9857, 40.7484]
      },
      "properties": {
        "ip": "66.102.0.0",
        "url": "https://httpbin.org",
        "city": "New York",
        "state": "NY"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-97.7431, 30.2672]
      },
      "properties": {
        "ip": "142.250.64.78",
        "url": "https://fonts.googleapis.com",
        "city": "Austin",
        "state": "TX"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-122.3321, 47.6062]
      },
      "properties": {
        "ip": "151.101.1.140",
        "url": "https://cdnjs.cloudflare.com",
        "city": "Seattle",
        "state": "WA"
      }
    }
  ]
};

// Function to create popup content
function createPopupContent(feature) {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${feature.properties.city}, ${feature.properties.state}</h4>
      <p style="margin: 5px 0;"><strong>IP:</strong> ${feature.properties.ip}</p>
      <p style="margin: 5px 0;"><strong>URL:</strong> <a href="${feature.properties.url}" target="_blank" style="color: #3498db;">${feature.properties.url}</a></p>
    </div>
  `;
}

// Custom marker icon (blue marker with info icon)
var blueIcon = L.divIcon({
  html: '<i class="fa fa-info-circle" style="color: white; font-size: 14px; line-height: 35px;"></i>',
  iconSize: [35, 35],
  className: 'custom-div-icon',
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

// Add CSS for custom marker
var style = document.createElement('style');
style.textContent = `
  .custom-div-icon {
    background: #3388ff;
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    text-align: center;
  }
`;
document.head.appendChild(style);

// Add FontAwesome for icons
var fontAwesome = document.createElement('link');
fontAwesome.rel = 'stylesheet';
fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
document.head.appendChild(fontAwesome);

// Process GeoJSON data and add markers
ipLocationData.features.forEach(function(feature) {
  var coords = feature.geometry.coordinates;
  var marker = L.marker([coords[1], coords[0]], {
    icon: blueIcon
  }).bindPopup(createPopupContent(feature));
  
  markers.addLayer(marker);
});

// Add marker cluster to map
map.addLayer(markers);

// Optional: Fit map bounds to show all markers
var group = new L.featureGroup(markers.getLayers());
map.fitBounds(group.getBounds().pad(0.1));