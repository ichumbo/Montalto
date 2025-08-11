'use strict';

// Dados dos carros com preços para diferentes períodos
const carData = {
  civic: {
    title: 'Honda Civic EXL',
    image: './assets/images/car-1.jpg',
    specs: '2021 • 45.000 km • Automático • Flex',
    prices: {
      daily: 'R$ 180',
      weekly: 'R$ 1.120',
      biweekly: 'R$ 2.100',
      monthly: 'R$ 3.800'
    }
  },
  corolla: {
    title: 'Toyota Corolla XEI',
    image: './assets/images/car-2.jpg',
    specs: '2022 • 28.000 km • Automático • Flex',
    prices: {
      daily: 'R$ 190',
      weekly: 'R$ 1.260',
      biweekly: 'R$ 2.350',
      monthly: 'R$ 4.200'
    }
  },
  jetta: {
    title: 'Volkswagen Jetta',
    image: './assets/images/car-3.jpg',
    specs: '2020 • 52.000 km • Automático • Flex',
    prices: {
      daily: 'R$ 160',
      weekly: 'R$ 980',
      biweekly: 'R$ 1.850',
      monthly: 'R$ 3.400'
    }
  },
  fusion: {
    title: 'Ford Fusion Titanium',
    image: './assets/images/car-4.jpg',
    specs: '2021 • 35.000 km • Automático • Flex',
    prices: {
      daily: 'R$ 220',
      weekly: 'R$ 1.400',
      biweekly: 'R$ 2.650',
      monthly: 'R$ 4.800'
    }
  },
  cruze: {
    title: 'Chevrolet Cruze LTZ',
    image: './assets/images/car-5.jpg',
    specs: '2022 • 31.000 km • Automático • Flex',
    prices: {
      daily: 'R$ 170',
      weekly: 'R$ 1.050',
      biweekly: 'R$ 1.950',
      monthly: 'R$ 3.600'
    }
  },
  elantra: {
    title: 'Hyundai Elantra',
    image: './assets/images/car-6.jpg',
    specs: '2021 • 38.000 km • Automático • Flex',
    prices: {
      daily: 'R$ 185',
      weekly: 'R$ 1.190',
      biweekly: 'R$ 2.200',
      monthly: 'R$ 4.000'
    }
  }
};

// Elementos do DOM
const popupOverlay = document.getElementById('popupOverlay');
const popupClose = document.getElementById('popupClose');
const popupCarImage = document.getElementById('popupCarImage');
const popupCarTitle = document.getElementById('popupCarTitle');
const popupCarSpecs = document.getElementById('popupCarSpecs');
const dailyPrice = document.getElementById('dailyPrice');
const weeklyPrice = document.getElementById('weeklyPrice');
const biweeklyPrice = document.getElementById('biweeklyPrice');
const monthlyPrice = document.getElementById('monthlyPrice');

// Função para abrir o popup
function openPopup(carKey) {
  const car = carData[carKey];
  if (!car) return;

  // Preencher dados do carro
  popupCarImage.src = car.image;
  popupCarImage.alt = car.title;
  popupCarTitle.textContent = car.title;
  popupCarSpecs.textContent = car.specs;

  // Preencher preços
  dailyPrice.textContent = car.prices.daily;
  weeklyPrice.textContent = car.prices.weekly;
  biweeklyPrice.textContent = car.prices.biweekly;
  monthlyPrice.textContent = car.prices.monthly;

  // Mostrar popup
  popupOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Função para fechar o popup
function closePopup() {
  popupOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Botões "Ver Valores"
  const btnValores = document.querySelectorAll('.btn-valores');
  btnValores.forEach(btn => {
    btn.addEventListener('click', function() {
      const carKey = this.getAttribute('data-car');
      openPopup(carKey);
    });
  });

  // Botão fechar popup
  popupClose.addEventListener('click', closePopup);

  // Fechar popup clicando no overlay
  popupOverlay.addEventListener('click', function(e) {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });

  // Fechar popup com ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
      closePopup();
    }
  });

  // Botão reservar (redireciona para página de reserva)
  const btnReservar = document.querySelector('.btn-reservar');
  if (btnReservar) {
    btnReservar.addEventListener('click', function() {
      window.location.href = './reserva.html';
    });
  }
});