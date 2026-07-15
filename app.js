/**
 * Portfolio App - Object-Oriented JavaScript
 * Ian Maina | Full-Stack Web Developer
 */

// ====================================================
// DATA STORE
// ====================================================
const PortfolioData = {
    projects: [
        {
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce solution with cart, checkout, and payment integration built with modern web technologies.',
            icon: 'fas fa-shopping-cart',
            color: '#6c63ff',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            demo: '#',
            code: '#'
        },
        {
            title: 'Task Management App',
            description: 'A Kanban-style project management tool with drag-and-drop functionality, real-time updates, and team collaboration.',
            icon: 'fas fa-tasks',
            color: '#00d9a6',
            tags: ['JavaScript', 'Firebase', 'CSS3', 'WebSockets'],
            demo: '#',
            code: '#'
        },
        {
            title: 'Weather Dashboard',
            description: 'A real-time weather application consuming third-party APIs with geolocation, forecasts, and interactive charts.',
            icon: 'fas fa-cloud-sun',
            color: '#ff6584',
            tags: ['API', 'Chart.js', 'CSS3', 'Geolocation'],
            demo: '#',
            code: '#'
        },
        {
            title: 'Social Media App',
            description: 'A social media platform featuring user profiles, posts, likes, comments, and a real-time messaging system.',
            icon: 'fas fa-users',
            color: '#f0a500',
            tags: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
            demo: '#',
            code: '#'
        }
    ]
};


// ====================================================
// CLASS: Navigation
// ====================================================
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

    // Mobile menu toggle
    handleHamburger() {
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navLinks.classList.toggle('active');
        });
    }

    // Navbar background on scroll
    handleScrollEffects() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll & close mobile menu on link click
    handleLinkClicks() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                const target = document.getElementById(targetId);

                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }

                // Close mobile menu
                this.hamburger.classList.remove('active');
                this.navLinks.classList.remove('active');

                // Update active link
                this.links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Scroll spy: highlight current section in nav
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


// ====================================================
// CLASS: ProjectRenderer
// ====================================================
class ProjectRenderer {
    constructor(containerSelector, projectsData) {
        this.container = document.querySelector(containerSelector);
        this.projects = projectsData;
        this.colors = ['#6c63ff', '#00d9a6', '#ff6584', '#f0a500', '#ff6b6b', '#48dbfb'];

        if (this.container) {
            this.render();
        }
    }

    render() {
        let html = '';
        this.projects.forEach((project, index) => {
            const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');
            const bgColor = project.color || this.colors[index % this.colors.length];

            html += `
                <div class="project-card fade-in">
                    <div class="project-image" style="background: linear-gradient(135deg, ${bgColor}22, transparent);">
                        <i class="${project.icon}" style="color: ${bgColor};"></i>
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tags">${tagsHtml}</div>
                        <div class="project-links">
                            <a href="${project.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                            <a href="${project.code}" target="_blank"><i class="fab fa-github"></i> View Code</a>
                        </div>
                    </div>
                </div>
            `;
        });
        this.container.innerHTML = html;
    }
}


// ====================================================
// CLASS: ScrollAnimator
// ====================================================
class ScrollAnimator {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        this.elements.forEach(el => observer.observe(el));
    }
}


// ====================================================
// CLASS: SkillBarAnimator
// ====================================================
class SkillBarAnimator {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-bar');
        this.init();
    }

    init() {
        if (this.skillBars.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    const fill = entry.target.querySelector('.skill-fill');
                    if (fill && progress) {
                        // Delay to allow the transition to work
                        setTimeout(() => {
                            fill.style.width = `${progress}%`;
                        }, 200);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        this.skillBars.forEach(bar => observer.observe(bar));
    }
}


// ====================================================
// CLASS: ContactForm
// ====================================================
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

        // Simulate sending (in production, send to a backend)
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
        div.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
        this.form.appendChild(div);
        setTimeout(() => div.remove(), 5000);
    }

    removeMessage() {
        const existing = this.form.querySelector('.form-message');
        if (existing) existing.remove();
    }
}


// ====================================================
// CLASS: BackToTop
// ====================================================
class BackToTop {
    constructor(buttonSelector) {
        this.button = document.querySelector(buttonSelector);
        this.init();
    }

    init() {
        if (!this.button) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                this.button.classList.add('show');
            } else {
                this.button.classList.remove('show');
            }
        });

        this.button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}


// ====================================================
// CLASS: DynamicFooter
// ====================================================
class DynamicFooter {
    constructor() {
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }
}


// ====================================================
// CLASS: PortfolioApp (Main Application)
// ====================================================
class PortfolioApp {
    constructor() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.boot());
        } else {
            this.boot();
        }
    }

    boot() {
        try {
            // Initialize all modules
            this.nav = new Navigation();
            this.projects = new ProjectRenderer('#projectsGrid', PortfolioData.projects);
            this.animations = new ScrollAnimator();
            this.skillBars = new SkillBarAnimator();
            this.contact = new ContactForm('#contactForm');
            this.backToTop = new BackToTop('#backToTop');
            this.footer = new DynamicFooter();

            console.log('%c🚀 Portfolio App initialized successfully!', 'color: #6c63ff; font-size: 1.2rem; font-weight: bold;');
        } catch (error) {
            console.error('Portfolio App failed to initialize:', error);
        }
    }
}


// ====================================================
// BOOTSTRAP
// ====================================================
const app = new PortfolioApp();