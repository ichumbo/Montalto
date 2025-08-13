// Vehicle details data
const vehicleData = {
  'Chevrolet Onix': {
    image: './assets/images/car-1.jpg',
    daily: 89,
    weekly: 534,
    biweekly: 979,
    monthly: 1780
  },
  'Volkswagen Virtus': {
    image: './assets/images/car-2.jpg',
    daily: 129,
    weekly: 774,
    biweekly: 1419,
    monthly: 2580
  },
  'Toyota Corolla': {
    image: './assets/images/car-3.jpg',
    daily: 189,
    weekly: 1134,
    biweekly: 2079,
    monthly: 3780
  },
  'Honda HR-V': {
    image: './assets/images/car-4.jpg',
    daily: 219,
    weekly: 1314,
    biweekly: 2409,
    monthly: 4380
  },
  'BMW 320i': {
    image: './assets/images/car-5.jpg',
    daily: 349,
    weekly: 2094,
    biweekly: 3839,
    monthly: 6980
  },
  'Jeep Compass': {
    image: './assets/images/car-6.jpg',
    daily: 259,
    weekly: 1554,
    biweekly: 2849,
    monthly: 5180
  }
};

// Popup elements
const popup = document.getElementById('pricingPopup');
const closeBtn = document.getElementById('closePopup');
const popupCarName = document.getElementById('popupCarName');
const popupCarImage = document.getElementById('popupCarImage');
const dailyPrice = document.getElementById('dailyPrice');
const weeklyPrice = document.getElementById('weeklyPrice');
const biweeklyPrice = document.getElementById('biweeklyPrice');
const monthlyPrice = document.getElementById('monthlyPrice');

// Open popup function
function openPopup(carName) {
  const data = vehicleData[carName];
  if (data) {
    popupCarName.textContent = carName;
    popupCarImage.src = data.image;
    dailyPrice.textContent = `R$ ${data.daily}`;
    weeklyPrice.textContent = `R$ ${data.weekly}`;
    biweeklyPrice.textContent = `R$ ${data.biweekly}`;
    monthlyPrice.textContent = `R$ ${data.monthly}`;
    
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Close popup function
function closePopup() {
  popup.classList.remove('active');
  document.body.style.overflow = '';
}

// View toggle functionality
function initViewToggle() {
  const viewButtons = document.querySelectorAll('.view-btn');
  const vehiclesGrid = document.getElementById('vehicles-container');
  
  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const view = this.getAttribute('data-view');
      
      // Remove active class from all buttons
      viewButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      // Toggle grid view
      if (view === 'list') {
        vehiclesGrid.classList.add('list-view');
      } else {
        vehiclesGrid.classList.remove('list-view');
      }
    });
  });
}

// Filtros functionality
function initFiltros() {
  // Filtros de categoria
  const filtroButtons = document.querySelectorAll('.filtro-btn');
  filtroButtons.forEach(button => {
    button.addEventListener('click', function() {
      filtroButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      updateResultsCount();
    });
  });

  // Filtros de capacidade
  const capacityButtons = document.querySelectorAll('.capacity-btn');
  capacityButtons.forEach(button => {
    button.addEventListener('click', function() {
      capacityButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      updateResultsCount();
    });
  });

  // Filtros de bagagem
  const baggageButtons = document.querySelectorAll('.baggage-btn');
  baggageButtons.forEach(button => {
    button.addEventListener('click', function() {
      baggageButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      updateResultsCount();
    });
  });

  // Price range slider
  const priceRange = document.getElementById('priceRange');
  const currentPrice = document.getElementById('currentPrice');
  const priceMin = document.getElementById('priceMin');
  const priceMax = document.getElementById('priceMax');

  if (priceRange && currentPrice) {
    priceRange.addEventListener('input', function() {
      currentPrice.textContent = this.value;
      updateResultsCount();
    });
  }

  if (priceMin && priceMax) {
    priceMin.addEventListener('input', updateResultsCount);
    priceMax.addEventListener('input', updateResultsCount);
  }

  // Checkboxes
  const checkboxes = document.querySelectorAll('.filtro-checkboxes input[type="checkbox"], .extras-grid input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateResultsCount);
  });

  // Botão limpar filtros
  const btnLimpar = document.querySelector('.btn-limpar-filtros');
  if (btnLimpar) {
    btnLimpar.addEventListener('click', function() {
      // Reset category filters
      filtroButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelector('.filtro-btn[data-filter="todos"]').classList.add('active');
      
      // Reset capacity filters
      capacityButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelector('.capacity-btn[data-capacity="5"]').classList.add('active');
      
      // Reset baggage filters
      baggageButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelector('.baggage-btn[data-baggage="3"]').classList.add('active');
      
      // Reset checkboxes
      checkboxes.forEach(checkbox => {
        checkbox.checked = checkbox.hasAttribute('checked');
      });
      
      // Reset price range
      if (priceRange) {
        priceRange.value = 275;
        currentPrice.textContent = '275';
      }
      if (priceMin) priceMin.value = '50';
      if (priceMax) priceMax.value = '500';
      
      updateResultsCount();
    });
  }

  // Botão aplicar filtros
  const btnAplicar = document.querySelector('.btn-aplicar-filtros');
  if (btnAplicar) {
    btnAplicar.addEventListener('click', function() {
      // Aqui você pode implementar a lógica de filtrar os veículos
      console.log('Aplicando filtros...');
      
      // Animação de feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
      
      // Scroll para os resultados
      document.querySelector('.frota-grid').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
}

// Atualizar contador de resultados
function updateResultsCount() {
  const resultadosCount = document.getElementById('resultadosCount');
  if (resultadosCount) {
    // Simular contagem baseada nos filtros ativos
    const activeFilters = document.querySelectorAll('.filtro-btn.active, .capacity-btn.active, .baggage-btn.active').length;
    const checkedBoxes = document.querySelectorAll('.filtro-checkboxes input:checked, .extras-grid input:checked').length;
    
    // Lógica simples para simular resultados
    let count = 12;
    if (activeFilters > 3) count -= 2;
    if (checkedBoxes < 3) count -= 1;
    if (checkedBoxes > 6) count -= 3;
    
    count = Math.max(1, count); // Mínimo 1 resultado
    
    resultadosCount.textContent = `${count} veículos encontrados`;
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initialize view toggle
  initViewToggle();
  
  // Initialize filtros
  initFiltros();
  
  // Add click event to all "Ver Detalhes" buttons
  const detailButtons = document.querySelectorAll('.btn-quick-view');
  detailButtons.forEach(button => {
    button.addEventListener('click', function() {
      const card = this.closest('.vehicle-card');
      const carName = card.querySelector('.card-title').textContent;
      openPopup(carName);
    });
  });

  // Close popup events
  if (closeBtn) {
    closeBtn.addEventListener('click', closePopup);
  }
  
  if (popup) {
    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        closePopup();
      }
    });
  }

  // Close with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popup && popup.classList.contains('active')) {
      closePopup();
    }
  });
  
  // Initialize results count
  updateResultsCount();
});