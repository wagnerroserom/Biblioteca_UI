// Funcionalidad del Navbar
function toggleNavbar() {
    const nav = document.querySelector('.navbar__nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Cerrar navbar cuando se hace click fuera de ella
document.addEventListener('click', function(event) {
    const nav = document.querySelector('.navbar__nav');
    const navToggle = document.querySelector('.navbar__toggle');
    
    if (nav && navToggle && 
        !nav.contains(event.target) && 
        !navToggle.contains(event.target) && 
        nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
});

// Funcionalidad del Modal
function openModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Cerrar modal al hacer click fuera o en el botón de cerrar
window.addEventListener('click', function(event) {
    const modal = document.getElementById('exampleModal');
    if (modal && event.target === modal) {
        closeModal();
    }
});

// Función para cerrar modal con botón de cerrar
function setupModalCloseButtons() {
    const closeButtons = document.querySelectorAll('.modal__close, [data-dismiss="modal"]');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
}

// Funcionalidad del Acordeón
function toggleAccordion(element) {
    if (!element || !element.parentElement) return;
    
    const item = element.parentElement;
    const allItems = document.querySelectorAll('.accordion__item');
    
    // Cerrar todos los otros items
    allItems.forEach(otherItem => {
        if (otherItem !== item) {
            otherItem.classList.remove('active');
        }
    });
    
    // Toggle del item actual
    item.classList.toggle('active');
}

// Funcionalidad de las Tabs
function showTab(button, tabId) {
    if (!button || !tabId) return;
    
    // Remover active de todos los botones y contenidos
    const allButtons = document.querySelectorAll('.tabs__button');
    const allContents = document.querySelectorAll('.tabs__content');
    
    allButtons.forEach(btn => btn.classList.remove('active'));
    allContents.forEach(content => content.classList.remove('active'));
    
    // Activar el botón y contenido seleccionado
    button.classList.add('active');
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

// Funciones de demostración mejoradas
function downloadCSS() {
    // Simulación de descarga con feedback visual
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Descargando...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        alert('En un proyecto real, aquí se descargaría el archivo CSS de Biblioteca_UI');
    }, 1000);
}

function viewDocumentation() {
    // En un proyecto real, esto podría abrir en una nueva ventana
    alert('Documentación completa disponible en el repositorio del proyecto');
    // window.open('https://tu-documentacion.com', '_blank');
}

function viewGithub() {
    // En un proyecto real, esto podría abrir GitHub
    alert('Proyecto disponible en GitHub para colaboración y contribuciones');
    // window.open('https://github.com/tu-usuario/tu-proyecto', '_blank');
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Configurar botones de cerrar modal
    setupModalCloseButtons();
    
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Cerrar navbar en mobile al hacer click en un enlace
    document.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.querySelector('.navbar__nav');
            if (nav) {
                nav.classList.remove('active');
            }
        });
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // Mejorar accesibilidad de acordeón
    document.querySelectorAll('.accordion__button').forEach(button => {
        button.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleAccordion(this);
            }
        });
    });
});

// Prevenir múltiples clicks rápidos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Versión optimizada de toggleNavbar con debounce
const debouncedToggleNavbar = debounce(toggleNavbar, 300);

// Funciones de utilidad adicionales
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para mostrar/ocultar navbar en scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.querySelector('.navbar');
    
    if (navbar && currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        // Scroll hacia abajo
        navbar.classList.add('navbar--hidden');
    } else if (navbar) {
        // Scroll hacia arriba
        navbar.classList.remove('navbar--hidden');
    }
    
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
});

// Mejorar rendimiento con throttle para eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
