// Animação do showcase de carros
document.addEventListener('DOMContentLoaded', function() {
  const carItems = document.querySelectorAll('.car-item');
  let currentIndex = 0;

  function rotateCarShowcase() {
    // Remove active de todos
    carItems.forEach(item => item.classList.remove('active'));
    
    // Adiciona active no atual
    carItems[currentIndex].classList.add('active');
    
    // Próximo índice
    currentIndex = (currentIndex + 1) % carItems.length;
  }

  // Inicia a rotação a cada 3 segundos
  if (carItems.length > 0) {
    setInterval(rotateCarShowcase, 3000);
  }

  // Contador animado para estatísticas
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.textContent.replace(/\D/g, ''));
    const suffix = stat.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current) + suffix;
    }, 30);
  });
});