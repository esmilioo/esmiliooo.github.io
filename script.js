// Gestione link attivi nella sidebar
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sections = document.querySelectorAll('.slide');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll per i link della sidebar
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Animazioni allo scroll per le card
const animatedElements = document.querySelectorAll('.intro-card, .dante-card, .riassunto-card, .personaggio-large, .citazione-card, .tema-card, .approfondimento-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px' });

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Effetto parallasse leggero per le icone di sfondo
window.addEventListener('scroll', () => {
    const bgIcons = document.querySelectorAll('.slide-bg-icon');
    bgIcons.forEach(icon => {
        const speed = 0.1;
        const yPos = window.scrollY * speed;
        icon.style.transform = `translateY(${yPos}px)`;
    });
});

// Gestione del menu mobile (se necessario)
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
            <div class="mobile-nav-toggle">
                <i class="fas fa-bars"></i>
            </div>
            <div class="mobile-nav-menu">
                ${Array.from(sidebarLinks).map(link => {
                    const number = link.querySelector('.sidebar-number').textContent;
                    const text = link.querySelector('.sidebar-text').textContent;
                    return `<a href="${link.getAttribute('href')}">${number} - ${text}</a>`;
                }).join('')}
            </div>
        `;
        
        document.body.appendChild(mobileNav);
        
        const toggle = mobileNav.querySelector('.mobile-nav-toggle');
        const menu = mobileNav.querySelector('.mobile-nav-menu');
        
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
};

// Commentato per non interferire con il design principale
// createMobileMenu();

// Effetto di highlight sui versi
document.querySelectorAll('.citazione-testo, .canto-quote p').forEach(quote => {
    quote.addEventListener('mouseenter', function() {
        this.style.color = 'var(--primary-light)';
    });
    
    quote.addEventListener('mouseleave', function() {
        this.style.color = '';
    });
});