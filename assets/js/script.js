'use strict';

document.addEventListener('DOMContentLoaded', function() {

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navToggleFunc = function () {
  if (navToggleBtn) navToggleBtn.classList.toggle("active");
  if (navbar) navbar.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

if (navToggleBtn) navToggleBtn.addEventListener("click", navToggleFunc);
if (overlay) overlay.addEventListener("click", navToggleFunc);

if (navbarLinks) {
  for (let i = 0; i < navbarLinks.length; i++) {
    if (navbarLinks[i]) {
      navbarLinks[i].addEventListener("click", navToggleFunc);
    }
  }
}



/**
 * header active on scroll
 */

const header = document.querySelector("[data-header]");

if (header) {
  window.addEventListener("scroll", function () {
    window.scrollY >= 10 ? header.classList.add("active")
      : header.classList.remove("active");
  });
}

/**
 * Pricing Popup Functionality
 */

// Car data mapping
const carData = {
  'toyota-rav4': {
    name: 'Toyota RAV4',
    year: '2022',
    image: './assets/images/car-1.jpg'
  },
  'bmw-3-series': {
    name: 'BMW 3 Series',
    year: '2019',
    image: './assets/images/car-2.jpg'
  },
  'volkswagen-tcross': {
    name: 'Volkswagen T-Cross',
    year: '2020',
    image: './assets/images/car-3.jpg'
  },
  'cadillac-escalade': {
    name: 'Cadillac Escalade',
    year: '2020',
    image: './assets/images/car-4.jpg'
  },
  'bmw-4-series': {
    name: 'BMW 4 Series GTI',
    year: '2022',
    image: './assets/images/car-5.jpg'
  },
  'bmw-4-series-2019': {
    name: 'BMW 4 Series',
    year: '2019',
    image: './assets/images/car-6.jpg'
  }
};

// Get popup elements
const pricingPopup = document.getElementById('pricingPopup');
const closePopupBtn = document.getElementById('closePopup');
const popupCarTitle = document.getElementById('popupCarTitle');
const popupCarName = document.getElementById('popupCarName');
const popupCarYear = document.getElementById('popupCarYear');
const popupCarImage = document.getElementById('popupCarImage');
const dailyPrice = document.getElementById('dailyPrice');
const weeklyPrice = document.getElementById('weeklyPrice');
const biweeklyPrice = document.getElementById('biweeklyPrice');
const monthlyPrice = document.getElementById('monthlyPrice');

// Get all pricing buttons
const pricingButtons = document.querySelectorAll('.btn-pricing');

// Function to open popup
function openPricingPopup(carId, daily, weekly, biweekly, monthly) {
  const car = carData[carId];
  
  if (car && pricingPopup) {
    // Update car information
    if (popupCarName) popupCarName.textContent = car.name;
    if (popupCarYear) popupCarYear.textContent = car.year;
    if (popupCarImage) {
      popupCarImage.src = car.image;
      popupCarImage.alt = car.name;
    }
    
    // Update pricing
    if (dailyPrice) dailyPrice.textContent = `R$ ${daily}`;
    if (weeklyPrice) weeklyPrice.textContent = `R$ ${weekly}`;
    if (biweeklyPrice) biweeklyPrice.textContent = `R$ ${biweekly}`;
    if (monthlyPrice) monthlyPrice.textContent = `R$ ${monthly}`;
    
    // Show popup
    pricingPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Function to close popup
function closePricingPopup() {
  if (pricingPopup) {
    pricingPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Add event listeners to pricing buttons
pricingButtons.forEach(button => {
  button.addEventListener('click', function() {
    const carId = this.getAttribute('data-car');
    const daily = this.getAttribute('data-daily');
    const weekly = this.getAttribute('data-weekly');
    const biweekly = this.getAttribute('data-biweekly');
    const monthly = this.getAttribute('data-monthly');
    
    openPricingPopup(carId, daily, weekly, biweekly, monthly);
  });
});

// Close popup when clicking close button
if (closePopupBtn) {
  closePopupBtn.addEventListener('click', closePricingPopup);
}

// Close popup when clicking outside
if (pricingPopup) {
  pricingPopup.addEventListener('click', function(e) {
    if (e.target === pricingPopup) {
      closePricingPopup();
    }
  });
}

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && pricingPopup && pricingPopup.classList.contains('active')) {
    closePricingPopup();
  }
});

}); // End of DOMContentLoaded