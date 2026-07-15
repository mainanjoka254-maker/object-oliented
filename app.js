/**
 * ============================================================
 * OBJECT ORIENTED DEVELOPERS - Modern Portfolio App
 * ES6+ Classes | SOLID Principles | Clean Architecture
 * Ian Maina | Full-Stack Developer
 * ============================================================
 */

// ============================================================
// DATA STORE
// ============================================================
const PortfolioData = {
    typedWords: ['Web Apps', 'APIs', 'UI/UX', 'Clean Code', 'OOP Solutions'],
    projects: [
        {
            title: 'E-Commerce Engine',
            description: 'Full-stack e-commerce platform with cart system, payment gateway, and admin dashboard — built with OOP architecture.',
            icon: 'fas fa-shopping-cart',
            color: '#6c63ff',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            demo: '#',
            code: '#'
        },
        {
            title: 'TaskFlow Manager',
            description: 'Kanban-style project management tool with drag-and-drop, real-time sync, and team collaboration features.',
            icon: 'fas fa-tasks',
            color: '#00d9a6',
            tags: ['JavaScript', 'Firebase', 'CSS3', 'WebSockets'],
            demo: '#',
            code: '#'
        },
        {
            title: 'WeatherPro Dashboard',
            description: 'Real-time weather app consuming multiple APIs — geolocation, 7-day forecasts, and interactive charts.',
            icon: 'fas fa-cloud-sun',
            color: '#ff6584',
            tags: ['API', 'Chart.js', 'CSS3', 'Geolocation'],
            demo: '#',
            code: '#'
        },
        {
            title: 'SocialConnect',
            description: 'Social media platform with user profiles, posts, likes, comments, and real-time messaging system.',
            icon: 'fas fa-users',
            color: '#f0a500',
            tags: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
            demo: '#',
            code: '#'
        }
    ]
};


// ============================================================
// CLASS: ParticleSystem
// ============================================================
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const count = Math.min(80, Math.floor(window.innerWidth * 0.04));
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.4,
                opacity: Math.random() * 0.4 + 0.1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((p, i) => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;

            // Mouse interaction
            if (this.mouse.x && this.mouse.y) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    p.x -= dx * 0.003;
                    p.y -= dy * 0.003;
                }
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(108, 99, 255, ${p.opacity})`;
            this.ctx.fill();

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(108, 99, 255, ${0.05 * (1 - dist / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}


// ============================================================
// CLASS: CursorGlow
// ============================================================
class CursorGlow {
    constructor(elementId) {
        this.glow = document.getElementById(elementId);
        if (!this.glow) return;
        this.init();
    }

    init() {
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animate = () => {
            currentX += (mouseX - currentX) * 0.05;
            currentY += (mouseY - currentY) * 0.05;
            this.glow.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
            requestAnimationFrame(animate);
        };
        animate();
    }
}


// ============================================================
// CLASS: Navigation
// ============================================================
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.getElementById('navLinks');
        this.links = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        this.handleHamburger();
        this.handleScrollEffects();
        this.handleLinkClicks();
        this.handleScrollSpy();
    }

    handleHamburger() {
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navLinks.classList.toggle('active');
        });
    }

    handleScrollEffects() {
        window.addEventListener('scroll', () => {
            const shouldScroll = window.scrollY > 60;
            this.navbar.classList.toggle('scrolled', shouldScroll);
        });
    }

    handleLinkClicks() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                this.hamburger.classList.remove('active');
                this.navLinks.classList.remove('active');
                this.links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    handleScrollSpy() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.links.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });

        this.sections.forEach(section => observer.observe(section));
    }
}


// ============================================================
// CLASS: TypeWriter
// ============================================================
class TypeWriter {
    constructor(elementId, words) {
        this.element = document.getElementById(elementId);
        this.words = words;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (!this.element) return;
        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];

        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.charIndex--);
        } else {
            this.element.textContent = currentWord.substring(0, this.charIndex++);
        }

        if (!this.isDeleting && this.charIndex === currentWord.length) {
            setTimeout(() => { this.isDeleting = true; }, 2000);
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
        }

        const speed = this.isDeleting ? 50 : 100;
        setTimeout(() => this.type(), speed);
    }
}


// ============================================================
// CLASS: StatsCounter
// ============================================================
class StatsCounter {
    constructor() {
        this.numbers = document.querySelectorAll('.stat-number[data-target]');
        this.init();
    }

    init() {
        if (this.numbers.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    this.animateNumber(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.numbers.forEach(num => observer.observe(num));
    }

    animateNumber(element, target) {
        let current = 0;
        const increment = Math.ceil(target / 40);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = current;
            }
        }, 40);
    }
}


// ============================================================
// CLASS: ProjectRenderer
// ============================================================
class ProjectRenderer {
    constructor(containerSelector, projectsData) {
        this.container = document.querySelector(containerSelector);
        this.projects = projectsData;
        if (this.container) this.render();
    }

    render() {
        let html = '';
        this.projects.forEach((project, index) => {
            const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');
            const bgColor = project.color;

            html += `
                <div class="project-card" style="transition-delay: ${index * 0.1}s">
                    <div class="project-image" style="background: linear-gradient(135deg, ${bgColor}15, transparent);">
                        <i class="${project.icon}" style="color: ${bgColor};"></i>
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tags">${tagsHtml}</div>
                        <div class="project-links">
                            <a href="${project.demo}" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                            <a href="${project.code}" target="_blank" rel="noopener"><i class="fab fa-github"></i> View Code</a>
                        </div>
                    </div>
                </div>
            `;
        });
        this.container.innerHTML = html;
    }
}


// ============================================================
// CLASS: ScrollAnimator
// ============================================================
class ScrollAnimator {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        if (this.cards.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        this.cards.forEach(card => observer.observe(card));
    }
}


// ============================================================
// CLASS: SkillBarAnimator
// ============================================================
class SkillBarAnimator {
    constructor() {
        this.skillCards = document.querySelectorAll('.skill-card');
        this.init();
    }

    init() {
        if (this.skillCards.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const progress = card.getAttribute('data-progress');
                    const fill = card.querySelector('.skill-bar-fill');
                    if (fill && progress) {
                        setTimeout(() => {
                            fill.style.width = `${progress}%`;
                        }, 300);
                    }
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.2 });

        this.skillCards.forEach(card => observer.observe(card));
    }
}


// ============================================================
// CLASS: ContactForm
// ============================================================
class ContactForm {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.init();
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        const name = this.form.querySelector('#name').value.trim();
        const email = this.form.querySelector('#email').value.trim();
        const message = this.form.querySelector('#message').value.trim();

        if (!this.validate(name, email, message)) return;

        // Simulate sending
        this.showSuccess();
        this.form.reset();
    }

    validate(name, email, message) {
        if (!name) {
            this.showError('Please enter your name.');
            return false;
        }
        if (!email || !this.isValidEmail(email)) {
            this.showError('Please enter a valid email address.');
            return false;
        }
        if (!message) {
            this.showError('Please enter your message.');
            return false;
        }
        return true;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showError(msg) {
        this.removeMessage();
        const div = document.createElement('div');
        div.className = 'form-message form-error';
        div.textContent = msg;
        this.form.appendChild(div);
        setTimeout(() => div.remove(), 4000);
    }

    showSuccess() {
        this.removeMessage();
        const div = document.createElement('div');
        div.className = 'form-message form-success';
        div.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        this.form.appendChild(div);
        setTimeout(() => div.remove(), 5000);
    }

    removeMessage() {
        const existing = this.form.querySelector('.form-message');
        if (existing) existing.remove();
    }
}


// ============================================================
// CLASS: BackToTop
// ============================================================
class BackToTop {
    constructor(buttonSelector) {
        this.button = document.querySelector(buttonSelector);
        this.init();
    }

    init() {
        if (!this.button) return;

        window.addEventListener('scroll', () => {
            this.button.classList.toggle('show', window.scrollY > 400);
        });

        this.button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}


// ============================================================
// CLASS: DynamicFooter
// ============================================================
class DynamicFooter {
    constructor() {
        const yearSpan = document.getElementById('year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }
}


// ============================================================
// CLASS: PortfolioApp (Main Application Bootstrapper)
// ============================================================
class PortfolioApp {
    constructor() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.boot());
        } else {
            this.boot();
        }
    }

    boot() {
        try {
            console.log('%c🚀 Object Oriented Developers', 'color: #6c63ff; font-size: 1.5rem; font-weight: bold;');
            console.log('%cPortfolio initializing...', 'color: #00d9a6; font-size: 1rem;');

            // Initialize in order
            this.particles = new ParticleSystem('particlesCanvas');
            this.cursor = new CursorGlow('cursorGlow');
            this.nav = new Navigation();
            this.typer = new TypeWriter('typedText', PortfolioData.typedWords);
            this.stats = new StatsCounter();
            this.projects = new ProjectRenderer('#projectsGrid', PortfolioData.projects);
            this.scrollAnim = new ScrollAnimator();
            this.skills = new SkillBarAnimator();
            this.contact = new ContactForm('#contactForm');
            this.backToTop = new BackToTop('#backToTop');
            this.footer = new DynamicFooter();

            console.log('%c✓ Portfolio ready!', 'color: #6c63ff; font-size: 1.2rem; font-weight: bold;');
            console.log('%c📞 Contact: +254 140 844 495', 'color: #25D366; font-size: 1rem;');
        } catch (error) {
            console.error('Portfolio initialization failed:', error);
        }
    }
}


// ============================================================
// BOOTSTRAP
// ============================================================
const app = new PortfolioApp();