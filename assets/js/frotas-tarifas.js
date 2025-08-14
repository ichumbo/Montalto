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
  // Filtros select
  const filtroSelects = document.querySelectorAll('.filtro-select');
  filtroSelects.forEach(select => {
    select.addEventListener('change', updateResultsCount);
  });

  // Price range slider
  const priceRange = document.getElementById('priceRange');
  const currentPrice = document.getElementById('currentPrice');

  if (priceRange && currentPrice) {
    priceRange.addEventListener('input', function() {
      currentPrice.textContent = this.value;
      updateResultsCount();
    });
  }

  // Botão limpar filtros
  const btnLimpar = document.querySelector('.btn-limpar');
  if (btnLimpar) {
    btnLimpar.addEventListener('click', function() {
      // Reset selects
      filtroSelects.forEach(select => {
        select.selectedIndex = 0;
      });
      
      // Reset price range
      if (priceRange) {
        priceRange.value = 500;
        currentPrice.textContent = '500';
      }
      
      updateResultsCount();
      
      // Animação de feedback
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  }

  // Botão aplicar filtros
  const btnAplicar = document.querySelector('.btn-aplicar');
  if (btnAplicar) {
    btnAplicar.addEventListener('click', function() {
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
    const selects = document.querySelectorAll('.filtro-select');
    const priceRange = document.getElementById('priceRange');
    
    let count = 12;
    
    // Reduzir contagem baseado nos filtros
    selects.forEach(select => {
      if (select.value !== 'todos' && select.value !== 'todas') {
        count -= Math.floor(Math.random() * 3) + 1;
      }
    });
    
    if (priceRange && priceRange.value < 300) {
      count -= Math.floor(Math.random() * 2) + 1;
    }
    
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