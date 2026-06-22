document.addEventListener('DOMContentLoaded', () => {

    // ───────────────────────────────────────
    // Text Split Reveal (Hero Headline)
    // ───────────────────────────────────────
    document.querySelectorAll('.split-text').forEach(el => {
        const text = el.innerHTML;
        const words = text.split(' ');
        el.innerHTML = words.map(word => {
            if (word.includes('<')) return word; // skip HTML tags
            return `<span class="word-split"><span class="word">${word}</span></span>`;
        }).join(' ');
        el.querySelectorAll('.word').forEach((word, i) => {
            word.style.animationDelay = `${0.5 + i * 0.08}s`;
        });
    });

    // ───────────────────────────────────────
    // Card Mouse Glow (3D lighting)
    // ───────────────────────────────────────
    document.querySelectorAll('.service-card').forEach(card => {
        const glow = card.querySelector('.card-glow');
        if (!glow) return;

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glow.style.left = x + 'px';
            glow.style.top = y + 'px';
        });
    });

    // ───────────────────────────────────────
    // Ripple Effect on Buttons
    // ───────────────────────────────────────
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ───────────────────────────────────────
    // Image Reveal Observer (Work cards)
    // ───────────────────────────────────────
    const imageRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                imageRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.image-reveal').forEach(el => imageRevealObserver.observe(el));

    // ───────────────────────────────────────
    // Canvas Particle System (Hero)
    // ───────────────────────────────────────
    const canvas = document.querySelector('.hero-particles-canvas');
    if (canvas && window.innerWidth > 768) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId;

        function resizeCanvas() {
            const hero = canvas.closest('.hero');
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.4 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(124, 92, 252, ${this.opacity})`;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min(80, Math.floor(canvas.width * canvas.height / 10000));
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(124, 92, 252, ${0.06 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            connectParticles();
            animId = requestAnimationFrame(animateParticles);
        }

        resizeCanvas();
        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }

    // ───────────────────────────────────────
    // Hero Orb Mouse Parallax
    // ───────────────────────────────────────
    const orbs = document.querySelectorAll('.hero-orb');
    document.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        orbs.forEach((orb, i) => {
            const factor = (i + 1) * 10;
            orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });

    // ───────────────────────────────────────
    // Experience Timeline Animation
    // ───────────────────────────────────────
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.timeline-item').forEach(item => timelineObserver.observe(item));

    // ───────────────────────────────────────
    // Custom Cursor (Desktop)
    // ───────────────────────────────────────
    if (window.innerWidth > 768) {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        let posX = 0, posY = 0, mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        });

        (function animateFollower() {
            posX += (mouseX - posX) * 0.12;
            posY += (mouseY - posY) * 0.12;
            follower.style.transform = `translate(${posX - 20}px, ${posY - 20}px)`;
            requestAnimationFrame(animateFollower);
        })();

        document.querySelectorAll('a, button, input, textarea, .service-card, .work-card, .testimonial-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(1.8)`;
                follower.style.transform = `translate(${posX - 20}px, ${posY - 20}px) scale(1.4)`;
                follower.style.borderColor = 'rgba(124,92,252,0.6)';
                follower.style.background = 'rgba(124,92,252,0.05)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(1)`;
                follower.style.transform = `translate(${posX - 20}px, ${posY - 20}px) scale(1)`;
                follower.style.borderColor = 'rgba(124,92,252,0.3)';
                follower.style.background = 'transparent';
            });
        });
    }

    // ───────────────────────────────────────
    // Scroll Progress Bar
    // ───────────────────────────────────────
    const progressBar = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = (scrollTop / docHeight) * 100 + '%';
    });

    // ───────────────────────────────────────
    // Navbar & Active Link
    // ───────────────────────────────────────
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateNav() {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }
    window.addEventListener('scroll', updateNav);

    // ───────────────────────────────────────
    // Mobile Menu
    // ───────────────────────────────────────
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ───────────────────────────────────────
    // Typing Effect
    // ───────────────────────────────────────
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = ['Beautiful', 'Fast', 'Scalable', 'User-Friendly', 'Innovative'];
        let wordIndex = 0, charIndex = 0, isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];
            typingElement.textContent = isDeleting
                ? currentWord.substring(0, charIndex - 1)
                : currentWord.substring(0, charIndex + 1);

            isDeleting ? charIndex-- : charIndex++;

            let delay = 80;
            if (!isDeleting && charIndex === currentWord.length) {
                delay = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 500;
            }
            setTimeout(typeEffect, delay);
        }
        typeEffect();
    }

    // ───────────────────────────────────────
    // Animated Counters
    // ───────────────────────────────────────
    const counters = document.querySelectorAll('.hero-stat-number');
    let counterStarted = false;

    function animateCounters() {
        if (counterStarted) return;
        counterStarted = true;
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 1200;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = eased * target;
                counter.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
                if (progress < 1) requestAnimationFrame(update);
                else counter.textContent = target;
            }
            requestAnimationFrame(update);
        });
    }

    // ───────────────────────────────────────
    // Skill Bars
    // ───────────────────────────────────────
    let skillBarsAnimated = false;

    function animateSkillBars() {
        if (skillBarsAnimated) return;
        skillBarsAnimated = true;
        document.querySelectorAll('.skill-fill').forEach((bar, i) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => { bar.style.width = width + '%'; }, i * 100);
        });
    }

    // ───────────────────────────────────────
    // Scroll Reveal Observer
    // ───────────────────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                if (el.classList.contains('stagger-children')) {
                    el.classList.add('revealed');
                } else {
                    el.classList.add('visible');
                }

                if (el.classList.contains('hero-stats')) animateCounters();
                if (el.classList.contains('skills-content')) animateSkillBars();

                revealObserver.unobserve(el);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-text, .reveal-scale').forEach(el => revealObserver.observe(el));
    document.querySelectorAll('.stagger-children').forEach(el => revealObserver.observe(el));
    document.querySelectorAll('.skills-content').forEach(el => revealObserver.observe(el));

    // ───────────────────────────────────────
    // Work Carousel
    // ───────────────────────────────────────
    const track = document.querySelector('.work-track');
    const cards = document.querySelectorAll('.work-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (track && cards.length > 0) {
        let currentIndex = 0;

        function getCardsPerView() {
            const w = window.innerWidth;
            if (w <= 768) return 1;
            if (w <= 1024) return 2;
            return 3;
        }

        let cardsPerView = getCardsPerView();
        const totalSlides = Math.ceil(cards.length / cardsPerView);

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => {
                currentIndex = i * cardsPerView;
                updateCarousel();
                updateDots();
            });
            dotsContainer.appendChild(dot);
        }

        function updateCarousel() {
            const gap = 24;
            const cardWidth = track.querySelector('.work-card').offsetWidth;
            track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('span');
            const activeDot = Math.floor(currentIndex / cardsPerView);
            dots.forEach((dot, i) => dot.classList.toggle('active', i === activeDot));
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex = Math.max(0, currentIndex - cardsPerView);
                updateCarousel();
                updateDots();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex + cardsPerView < cards.length) {
                currentIndex = Math.min(cards.length - cardsPerView, currentIndex + cardsPerView);
                updateCarousel();
                updateDots();
            }
        });

        window.addEventListener('resize', () => {
            cardsPerView = getCardsPerView();
            currentIndex = Math.min(currentIndex, Math.max(0, cards.length - cardsPerView));
            updateCarousel();
            updateDots();
        });

        updateDots();

        // Auto-play
        let autoPlay = setInterval(autoAdvance, 5000);

        function autoAdvance() {
            if (currentIndex + cardsPerView >= cards.length) {
                currentIndex = 0;
            } else {
                currentIndex += cardsPerView;
            }
            updateCarousel();
            updateDots();
        }

        track.addEventListener('mouseenter', () => clearInterval(autoPlay));
        track.addEventListener('mouseleave', () => {
            clearInterval(autoPlay);
            autoPlay = setInterval(autoAdvance, 5000);
        });

        // Touch / Swipe support
        let startX = 0, isDragging = false;
        track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; isDragging = true; }, { passive: true });
        track.addEventListener('touchend', e => {
            if (!isDragging) return;
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentIndex + cardsPerView < cards.length) {
                    currentIndex += cardsPerView;
                } else if (diff < 0 && currentIndex > 0) {
                    currentIndex -= cardsPerView;
                }
                updateCarousel();
                updateDots();
            }
            isDragging = false;
        }, { passive: true });
    }

    // ───────────────────────────────────────
    // Back to Top
    // ───────────────────────────────────────
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ───────────────────────────────────────
    // Contact Form (Validation + Submit)
    // ───────────────────────────────────────
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const nameInput = contactForm.querySelector('input[type="text"]');
        const emailInput = contactForm.querySelector('input[type="email"]');
        const subjectInput = contactForm.querySelectorAll('input[type="text"]')[1];
        const messageInput = contactForm.querySelector('textarea');
        const submitBtn = contactForm.querySelector('.btn-submit');

        function setError(input, show) {
            const group = input.closest('.form-group');
            const error = group.querySelector('.form-error');
            input.classList.toggle('error', show);
            if (error) error.classList.toggle('visible', show);
        }

        function validateField(input) {
            if (!input.hasAttribute('required')) return true;
            if (input.type === 'email') {
                const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
                setError(input, !valid || !input.value.trim());
                return valid && input.value.trim();
            }
            const valid = input.value.trim().length > 0;
            setError(input, !valid);
            return valid;
        }

        [nameInput, emailInput, messageInput].forEach(input => {
            if (input) {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => {
                    if (input.classList.contains('error')) validateField(input);
                });
            }
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameValid = validateField(nameInput);
            const emailValid = validateField(emailInput);
            const msgValid = validateField(messageInput);

            if (!nameValid || !emailValid || !msgValid) return;

            submitBtn.classList.add('loading');

            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('sent');
                const btnText = submitBtn.querySelector('.btn-text');
                btnText.textContent = 'Message Sent!';
                this.reset();

                setTimeout(() => {
                    submitBtn.classList.remove('sent');
                    btnText.textContent = 'Send Message';
                }, 3000);
            }, 1500);
        });
    }

    // ───────────────────────────────────────
    // Magnetic Buttons
    // ───────────────────────────────────────
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ───────────────────────────────────────
    // 3D Tilt Effect (Mockup & Cards)
    // ───────────────────────────────────────
    if (window.innerWidth > 768) {
        document.querySelectorAll('[data-tilt]').forEach(el => {
            el.addEventListener('mousemove', e => {
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                el.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
                el.style.transition = 'transform 0.5s';
                setTimeout(() => { el.style.transition = ''; }, 500);
            });
        });
    }

    // ───────────────────────────────────────
    // Parallax on Scroll
    // ───────────────────────────────────────
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroVisual = document.querySelector('.hero-visual');
        const heroText = document.querySelector('.hero-text');

        if (heroVisual && scrollY < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrollY * 0.08}px)`;
        }
        if (heroText && scrollY < window.innerHeight) {
            heroText.style.transform = `translateY(${scrollY * 0.04}px)`;
            heroText.style.opacity = 1 - scrollY / (window.innerHeight * 0.6);
        }
    });

    // ───────────────────────────────────────
    // Skills Animation (About & Tech Stack)
    // ───────────────────────────────────────
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-fill');
                bars.forEach((bar, i) => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => { bar.style.width = width + '%'; }, i * 100);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skills-content').forEach(el => skillsObserver.observe(el));

    // ───────────────────────────────────────
    // Hobbies Hover Effect
    // ───────────────────────────────────────
    document.querySelectorAll('.hobby-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#7c5cfc';
            card.style.background = 'rgba(124,92,252,0.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '';
            card.style.background = '';
        });
    });

    // ───────────────────────────────────────
    // Smooth Anchor Scroll
    // ───────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ───────────────────────────────────────
    // Theme Toggle (Light/Dark Mode)
    // ───────────────────────────────────────
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

});
