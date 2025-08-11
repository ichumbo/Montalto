/**
 * RESERVA PAGE FUNCTIONALITY
 */

'use strict';

// Form elements
const form = document.getElementById('reservaForm');
const formSteps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

// Current step tracker
let currentStep = 1;
const totalSteps = 3;

// Vehicle prices
const vehiclePrices = {
  economico: 89,
  intermediario: 129,
  premium: 189
};

// Extra prices
const extraPrices = {
  gps: 15,
  cadeirinha: 20,
  seguro: 35
};

/**
 * Initialize form functionality
 */
function initReservaForm() {
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('dataRetirada').min = today;
  document.getElementById('dataDevolucao').min = today;
  
  // Add event listeners
  prevBtn.addEventListener('click', previousStep);
  nextBtn.addEventListener('click', nextStep);
  submitBtn.addEventListener('click', submitForm);
  
  // Vehicle selection listeners
  const vehicleCards = document.querySelectorAll('.vehicle-card');
  vehicleCards.forEach(card => {
    card.addEventListener('click', () => {
      const radio = card.querySelector('input[type="radio"]');
      radio.checked = true;
      updateVehicleSelection();
    });
  });
  
  // Extra selection listeners
  const extraItems = document.querySelectorAll('.extra-item');
  extraItems.forEach(item => {
    item.addEventListener('click', () => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;
    });
  });
  
  // Payment method listeners
  const paymentOptions = document.querySelectorAll('.payment-option');
  paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
      const radio = option.querySelector('input[type="radio"]');
      radio.checked = true;
    });
  });
  
  // Date validation
  document.getElementById('dataRetirada').addEventListener('change', validateDates);
  document.getElementById('dataDevolucao').addEventListener('change', validateDates);
  
  // Form validation on input
  const inputs = document.querySelectorAll('input[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', validateInput);
    input.addEventListener('input', clearValidationError);
  });
  
  // CPF mask
  document.getElementById('cpf').addEventListener('input', applyCPFMask);
  
  // Phone mask
  document.getElementById('telefone').addEventListener('input', applyPhoneMask);
}

/**
 * Navigate to next step
 */
function nextStep() {
  if (validateCurrentStep()) {
    if (currentStep < totalSteps) {
      currentStep++;
      updateFormDisplay();
      
      if (currentStep === 3) {
        updateSummary();
      }
    }
  }
}

/**
 * Navigate to previous step
 */
function previousStep() {
  if (currentStep > 1) {
    currentStep--;
    updateFormDisplay();
  }
}

/**
 * Update form display based on current step
 */
function updateFormDisplay() {
  // Update form steps
  formSteps.forEach((step, index) => {
    step.classList.toggle('active', index + 1 === currentStep);
  });
  
  // Update progress bar
  progressSteps.forEach((step, index) => {
    step.classList.toggle('active', index + 1 <= currentStep);
  });
  
  // Update navigation buttons
  prevBtn.style.display = currentStep === 1 ? 'none' : 'flex';
  nextBtn.style.display = currentStep === totalSteps ? 'none' : 'flex';
  submitBtn.style.display = currentStep === totalSteps ? 'flex' : 'none';
  
  // Scroll to top of form
  document.querySelector('.form-container').scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}

/**
 * Validate current step
 */
function validateCurrentStep() {
  const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
  const requiredInputs = currentStepElement.querySelectorAll('input[required]');
  let isValid = true;
  
  requiredInputs.forEach(input => {
    if (!validateInput({ target: input })) {
      isValid = false;
    }
  });
  
  // Additional validation for step 2 (vehicle selection)
  if (currentStep === 2) {
    const selectedVehicle = document.querySelector('input[name="veiculo"]:checked');
    if (!selectedVehicle) {
      showError('Por favor, selecione um veículo.');
      isValid = false;
    }
  }
  
  // Additional validation for step 3 (payment method)
  if (currentStep === 3) {
    const selectedPayment = document.querySelector('input[name="pagamento"]:checked');
    if (!selectedPayment) {
      showError('Por favor, selecione uma forma de pagamento.');
      isValid = false;
    }
  }
  
  return isValid;
}

/**
 * Validate individual input
 */
function validateInput(event) {
  const input = event.target;
  const value = input.value.trim();
  let isValid = true;
  
  // Remove previous error styling
  input.classList.remove('error');
  
  // Required field validation
  if (input.hasAttribute('required') && !value) {
    showInputError(input, 'Este campo é obrigatório.');
    isValid = false;
  }
  
  // Email validation
  if (input.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showInputError(input, 'Por favor, insira um e-mail válido.');
      isValid = false;
    }
  }
  
  // CPF validation
  if (input.id === 'cpf' && value) {
    if (!isValidCPF(value)) {
      showInputError(input, 'Por favor, insira um CPF válido.');
      isValid = false;
    }
  }
  
  // Date validation
  if (input.type === 'date' && value) {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      showInputError(input, 'A data não pode ser anterior a hoje.');
      isValid = false;
    }
  }
  
  return isValid;
}

/**
 * Show input error
 */
function showInputError(input, message) {
  input.classList.add('error');
  
  // Remove existing error message
  const existingError = input.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Add new error message
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  errorElement.style.cssText = `
    color: #e53e3e;
    font-size: 0.875rem;
    margin-top: 5px;
    animation: fadeIn 0.3s ease-out;
  `;
  
  input.parentNode.appendChild(errorElement);
}

/**
 * Clear validation error
 */
function clearValidationError(event) {
  const input = event.target;
  input.classList.remove('error');
  
  const errorMessage = input.parentNode.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

/**
 * Show general error message
 */
function showError(message) {
  // Create or update error notification
  let errorNotification = document.querySelector('.error-notification');
  
  if (!errorNotification) {
    errorNotification = document.createElement('div');
    errorNotification.className = 'error-notification';
    errorNotification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #fed7d7;
      color: #c53030;
      padding: 15px 20px;
      border-radius: 8px;
      border-left: 4px solid #e53e3e;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
    `;
    document.body.appendChild(errorNotification);
  }
  
  errorNotification.textContent = message;
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (errorNotification) {
      errorNotification.remove();
    }
  }, 5000);
}

/**
 * Validate dates
 */
function validateDates() {
  const retirada = document.getElementById('dataRetirada').value;
  const devolucao = document.getElementById('dataDevolucao').value;
  
  if (retirada && devolucao) {
    const dataRetirada = new Date(retirada);
    const dataDevolucao = new Date(devolucao);
    
    if (dataDevolucao <= dataRetirada) {
      document.getElementById('dataDevolucao').min = retirada;
      showInputError(document.getElementById('dataDevolucao'), 'A data de devolução deve ser posterior à data de retirada.');
    }
  }
}

/**
 * Update vehicle selection visual feedback
 */
function updateVehicleSelection() {
  const vehicleCards = document.querySelectorAll('.vehicle-card');
  vehicleCards.forEach(card => {
    const radio = card.querySelector('input[type="radio"]');
    card.classList.toggle('selected', radio.checked);
  });
}

/**
 * Update summary in step 3
 */
function updateSummary() {
  // Get form data
  const nome = document.getElementById('nome').value;
  const dataRetirada = document.getElementById('dataRetirada').value;
  const dataDevolucao = document.getElementById('dataDevolucao').value;
  const selectedVehicle = document.querySelector('input[name="veiculo"]:checked');
  const selectedExtras = document.querySelectorAll('input[name="extras"]:checked');
  
  // Update summary fields
  document.getElementById('summaryNome').textContent = nome || '-';
  
  if (dataRetirada && dataDevolucao) {
    const periodo = `${formatDate(dataRetirada)} até ${formatDate(dataDevolucao)}`;
    document.getElementById('summaryPeriodo').textContent = periodo;
  }
  
  if (selectedVehicle) {
    const vehicleType = selectedVehicle.value;
    const vehicleName = vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1);
    document.getElementById('summaryVeiculo').textContent = vehicleName;
  }
  
  // Update extras
  if (selectedExtras.length > 0) {
    const extrasList = Array.from(selectedExtras).map(extra => {
      return extra.value.charAt(0).toUpperCase() + extra.value.slice(1);
    }).join(', ');
    document.getElementById('summaryExtras').textContent = extrasList;
  } else {
    document.getElementById('summaryExtras').textContent = 'Nenhum';
  }
  
  // Calculate total
  calculateTotal();
}

/**
 * Calculate total price
 */
function calculateTotal() {
  const dataRetirada = document.getElementById('dataRetirada').value;
  const dataDevolucao = document.getElementById('dataDevolucao').value;
  const selectedVehicle = document.querySelector('input[name="veiculo"]:checked');
  const selectedExtras = document.querySelectorAll('input[name="extras"]:checked');
  
  if (!dataRetirada || !dataDevolucao || !selectedVehicle) {
    document.getElementById('summaryTotal').textContent = 'R$ 0,00';
    return;
  }
  
  // Calculate days
  const startDate = new Date(dataRetirada);
  const endDate = new Date(dataDevolucao);
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  
  // Calculate vehicle cost
  const vehiclePrice = vehiclePrices[selectedVehicle.value];
  let total = vehiclePrice * days;
  
  // Add extras cost
  selectedExtras.forEach(extra => {
    total += extraPrices[extra.value] * days;
  });
  
  document.getElementById('summaryTotal').textContent = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

/**
 * Submit form
 */
function submitForm(event) {
  event.preventDefault();
  
  if (validateCurrentStep()) {
    // Show success message
    showSuccess();
    
    // Here you would typically send the data to your server
    console.log('Form submitted successfully');
    
    // Reset form after delay
    setTimeout(() => {
      resetForm();
    }, 3000);
  }
}

/**
 * Show success message
 */
function showSuccess() {
  const successNotification = document.createElement('div');
  successNotification.className = 'success-notification';
  successNotification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <ion-icon name="checkmark-circle" style="font-size: 1.5rem; color: #38a169;"></ion-icon>
      <span>Reserva realizada com sucesso! Entraremos em contato em breve.</span>
    </div>
  `;
  successNotification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #c6f6d5;
    color: #2f855a;
    padding: 15px 20px;
    border-radius: 8px;
    border-left: 4px solid #38a169;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
  `;
  
  document.body.appendChild(successNotification);
  
  setTimeout(() => {
    successNotification.remove();
  }, 5000);
}

/**
 * Reset form to initial state
 */
function resetForm() {
  currentStep = 1;
  form.reset();
  updateFormDisplay();
  
  // Clear any error messages
  document.querySelectorAll('.error-message').forEach(error => error.remove());
  document.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
}

/**
 * Apply CPF mask
 */
function applyCPFMask(event) {
  let value = event.target.value.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  event.target.value = value;
}

/**
 * Apply phone mask
 */
function applyPhoneMask(event) {
  let value = event.target.value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, '($1) $2');
  value = value.replace(/(\d{5})(\d)/, '$1-$2');
  event.target.value = value;
}

/**
 * Validate CPF
 */
function isValidCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  
  let remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  
  remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;
  
  return true;
}

/**
 * Format date for display
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

/**
 * Add CSS animations
 */
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .input-group input.error {
    border-color: #e53e3e !important;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1) !important;
  }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initReservaForm);