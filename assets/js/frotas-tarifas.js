// FROTAS & TARIFAS - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    const viewBtns = document.querySelectorAll('.view-btn');
    const vehiclesContainer = document.getElementById('vehicles-container');
    

    
    // Toggle de visualização (Grid/Lista)
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Remove active de todos os botões
            viewBtns.forEach(b => b.classList.remove('active'));
            // Adiciona active ao botão clicado
            this.classList.add('active');
            
            // Altera o layout
            if (view === 'list') {
                vehiclesContainer.classList.add('list-view');
                vehiclesContainer.style.gridTemplateColumns = '1fr';
            } else {
                vehiclesContainer.classList.remove('list-view');
                vehiclesContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
            }
        });
    });
    
    // Animação de entrada dos cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa todos os cards
    vehicleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Botões de reserva
    const reserveBtns = document.querySelectorAll('.btn-reserve');
    reserveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const vehicleName = this.closest('.vehicle-card').querySelector('.card-title').textContent;
            
            // Animação de sucesso
            this.style.background = '#28a745';
            this.textContent = 'Reservado!';
            
            setTimeout(() => {
                this.style.background = '';
                this.textContent = 'Reservar Agora';
            }, 2000);
            
            // Aqui você pode adicionar a lógica para processar a reserva
            console.log(`Reserva solicitada para: ${vehicleName}`);
        });
    });
    
    // Botões de visualização rápida
    const quickViewBtns = document.querySelectorAll('.btn-quick-view');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const vehicleName = this.closest('.vehicle-card').querySelector('.card-title').textContent;
            
            // Modal simples (você pode expandir isso)
            alert(`Detalhes do ${vehicleName}\n\nEm breve, um modal completo com todas as informações do veículo será exibido aqui.`);
        });
    });
    
    // Smooth scroll para seções
    function smoothScroll(target) {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Contador animado para estatísticas
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = counter.textContent.replace(/\d+/, target);
                    clearInterval(timer);
                } else {
                    counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
                }
            }, 20);
        });
    }
    
    // Inicia contador quando a seção hero fica visível
    const heroSection = document.querySelector('.hero-frotas');
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // Scroll suave removido para melhor performance
    
    // Loading state para filtros
    function showLoading() {
        vehiclesContainer.style.opacity = '0.5';
        vehiclesContainer.style.pointerEvents = 'none';
    }
    
    function hideLoading() {
        vehiclesContainer.style.opacity = '1';
        vehiclesContainer.style.pointerEvents = 'auto';
    }
    

});

// CSS adicional via JavaScript para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .list-view .vehicle-card {
        display: flex !important;
        flex-direction: row;
        align-items: center;
        max-width: none;
    }
    
    .list-view .card-image {
        width: 300px;
        height: 200px;
        flex-shrink: 0;
    }
    
    .list-view .card-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 200px;
    }
    
    .list-view .card-specs {
        display: flex;
        gap: 20px;
        margin: 10px 0;
    }
    
    .list-view .card-price {
        margin: 10px 0;
        align-self: flex-start;
    }
    
    .list-view .btn-reserve {
        width: auto;
        padding: 10px 20px;
        align-self: flex-start;
    }
    
    @media (max-width: 768px) {
        .list-view .vehicle-card {
            flex-direction: column;
        }
        
        .list-view .card-image {
            width: 100%;
            height: 220px;
        }
        
        .list-view .card-content {
            height: auto;
        }
    }
`;
document.head.appendChild(style);