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

  // Define ecological tunnel locations with information
  const tunnelLocations = [
    {
      lat: -29.3739,
      lng: -50.8761,
      title: "Túnel Ecológico BR-116",
      description: "Túnel sob pedágio free flow permitindo travessia segura de animais silvestres",
      type: "tunnel",
      status: "active",
      image: "assets/images/kazuend-19SC2oaVZW0-unsplash.jpg",
      imageAlt: "Registro de câmera do túnel BR-116 mostrando fauna local"
    },
    {
      lat: -29.3650,
      lng: -50.8650,
      title: "Túnel Ecológico ERS-020",
      description: "Sistema de túnel com câmeras de monitoramento para fauna local",
      type: "tunnel",
      status: "active",
      image: "assets/images/luca-bravo-ESkw2ayO2As-unsplash.jpg",
      imageAlt: "Imagem do sistema de monitoramento ERS-020"
    },
    {
      lat: -29.3820,
      lng: -50.8850,
      title: "Túnel Ecológico BR-290",
      description: "Túnel ecológico com sistema de monitoramento 24h",
      type: "tunnel",
      status: "active",
      image: "assets/images/lukasz-szmigiel-2ShvY8Lf6l0-unsplash.jpg",
      imageAlt: "Registro noturno do túnel BR-290"
    },
    {
      lat: -29.3900,
      lng: -50.8700,
      title: "Pedágio Free Flow Norte",
      description: "Pedágio com sistema free flow e túnel ecológico integrado",
      type: "toll",
      status: "active",
      image: "assets/images/steven-kamenar-MMJx78V7xS8-unsplash.jpg",
      imageAlt: "Vista do pedágio free flow integrado com túnel ecológico"
    },
    {
      lat: -29.3600,
      lng: -50.8900,
      title: "Túnel Ecológico RS-040",
      description: "Túnel em construção com previsão de conclusão em 2025",
      type: "tunnel",
      status: "construction",
      image: "assets/images/kazuend-19SC2oaVZW0-unsplash.jpg",
      imageAlt: "Área de construção do túnel RS-040"
    },
    {
      lat: -29.3800,
      lng: -50.8600,
      title: "Pedágio Free Flow Sul",
      description: "Pedágio free flow com câmeras de monitoramento da fauna",
      type: "toll",
      status: "active",
      image: "assets/images/luca-bravo-ESkw2ayO2As-unsplash.jpg",
      imageAlt: "Sistema de monitoramento do pedágio free flow sul"
    }
  ];

  // Custom icon styles for different types of locations
  const iconStyles = {
    tunnel: {
      iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="12" fill="#2d5a27" stroke="#ffffff" stroke-width="2"/>
          <path d="M10 15 L20 15 M12 12 L18 12 M12 18 L18 18" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `),
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -20]
    },
    toll: {
      iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="12" fill="#2563eb" stroke="#ffffff" stroke-width="2"/>
          <rect x="10" y="10" width="10" height="10" fill="none" stroke="#ffffff" stroke-width="2"/>
          <circle cx="15" cy="15" r="2" fill="#ffffff"/>
        </svg>
      `),
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -20]
    }
  };

  // Add markers to the map
  tunnelLocations.forEach(location => {
    const customIcon = L.icon(iconStyles[location.type]);
    
    const marker = L.marker([location.lat, location.lng], {
      icon: customIcon,
      alt: location.title
    }).addTo(map);

    // Create popup content with status indicator and image
    const statusText = location.status === 'active' ? 'Ativo' : 'Em construção';
    const statusClass = location.status === 'active' ? 'status-active' : 'status-construction';
    
    const popupContent = `
      <div class="marker-popup">
        <button class="popup-close" onclick="closePopup()" aria-label="Fechar">×</button>
        <div class="popup-image">
          <img src="${location.image}" alt="${location.imageAlt}" />
          <div class="image-overlay">
            <span class="camera-icon">📹</span>
            <span class="live-indicator">AO VIVO</span>
          </div>
        </div>
        <div class="popup-content">
          <h3>${location.title}</h3>
          <p>${location.description}</p>
          <div class="marker-details">
            <span class="marker-type">${location.type === 'tunnel' ? 'Túnel Ecológico' : 'Pedágio Free Flow'}</span>
            <span class="marker-status ${statusClass}">${statusText}</span>
          </div>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent, {
      maxWidth: 260,
      minWidth: 200,
      className: 'custom-popup'
    });

    // Add click event to marker to contract legend
    marker.on('click', function() {
      contractLegendOnFirstClick();
    });
  });

  // Add close popup functionality
  window.closePopup = function() {
    map.closePopup();
  };

  // Add a legend for the different marker types
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML = `
      <button class="legend-toggle" onclick="toggleLegend()">
        <h4>Legenda</h4>
        <span class="legend-arrow">▼</span>
      </button>
      <div class="legend-content" id="legend-content">
        <div class="legend-item">
          <span class="legend-icon" style="background-color: #2d5a27;"></span>
          <span>Túnel Ecológico</span>
        </div>
        <div class="legend-item">
          <span class="legend-icon" style="background-color: #2563eb;"></span>
          <span>Pedágio Free Flow</span>
        </div>
        <div class="legend-note">
          <small>Clique nos marcadores</small>
        </div>
      </div>
    `;
    return div;
  };
  legend.addTo(map);

  // Add legend toggle functionality
  window.toggleLegend = function() {
    const content = document.getElementById('legend-content');
    const arrow = document.querySelector('.legend-arrow');
    
    if (content.classList.contains('expanded')) {
      content.classList.remove('expanded');
      arrow.classList.remove('expanded');
    } else {
      content.classList.add('expanded');
      arrow.classList.add('expanded');
    }
  };

  // Initialize legend as expanded and add auto-contract on marker click
  let legendContracted = false;
  setTimeout(() => {
    const content = document.getElementById('legend-content');
    const arrow = document.querySelector('.legend-arrow');
    if (content && arrow) {
      content.classList.add('expanded');
      arrow.classList.add('expanded');
    }
  }, 100);

  // Function to contract legend on first marker click
  function contractLegendOnFirstClick() {
    if (!legendContracted) {
      const content = document.getElementById('legend-content');
      const arrow = document.querySelector('.legend-arrow');
      
      if (content && arrow && content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        arrow.classList.remove('expanded');
        legendContracted = true;
      }
    }
  }
}
