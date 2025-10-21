// AxioMetis Think Lab - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Get header element for use throughout
    const header = document.querySelector('.header');
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe content sections for animations
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        observer.observe(section);
    });

    // Add hover effects to content items
    const contentItems = document.querySelectorAll('.content-item');
    contentItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px)';
            this.style.color = '#1e2a47';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '#1f2937';
        });
    });

    // Simple navigation highlighting only (no sticky header for now)
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    // Simple scroll handler with basic sticky header
    function handleScroll() {
        // Update navigation highlighting
        highlightNavigation();
        
        // Simple sticky header - no complex logic
        if (window.pageYOffset > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect after a delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 80);
        }
    }, 1000);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Mobile menu toggle (for future mobile navigation)
    function createMobileMenu() {
        const nav = document.querySelector('.navigation');
        const navList = document.querySelector('.nav-list');
        
        if (window.innerWidth <= 768) {
            // Add mobile menu functionality here if needed
            navList.style.flexDirection = 'column';
        }
    }

    // Call mobile menu function
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add click effects to content items
    contentItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add floating animation to logo
    const logo = document.querySelector('.logo h1');
    if (logo) {
        setInterval(() => {
            logo.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                logo.style.transform = 'translateY(0)';
            }, 2000);
        }, 4000);
    }

    // Add particle effect to header (subtle)
    function createParticles() {
        const header = document.querySelector('.header');
        if (!header) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
            `;
            header.appendChild(particle);
        }
    }

    // Add CSS for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        
        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(30, 42, 71, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-link.active {
            color: #93c5fd !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        body.loaded {
            opacity: 1;
        }
        
        body {
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // Initialize particles
    createParticles();
});

// Add utility functions
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

// Removed conflicting scroll event listeners
