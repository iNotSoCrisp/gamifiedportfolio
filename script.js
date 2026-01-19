document.addEventListener('DOMContentLoaded', () => {
    initFootballAnimation();
    initLandingStarfield();
    initLandingParticles();
});

/* =============================================
   FOOTBALL SMASH ANIMATION
   ============================================= */

function initFootballAnimation() {
    const landingPage = document.getElementById('landingPage');
    const landingContent = document.getElementById('landingContent');
    const footballContainer = document.getElementById('footballContainer');
    const screenCrack = document.getElementById('screenCrack');
    const impactFlash = document.getElementById('impactFlash');
    const mainContent = document.getElementById('mainContent');
    const enterBtn = document.getElementById('enterBtn');

    // Football animation timeline - 2 second total (lag-free)
    // Impact happens at 70% when ball hits center
    const impactTime = 1400; // ms (70% of 2s)
    const animationEnd = 2200; // ms (after 2s animation + buffer)

    // Trigger impact effects when football rushes towards the screen
    setTimeout(() => {
        // Screen shake - intense shake on impact
        landingPage.classList.add('shake');

        // Screen crack effect
        screenCrack.classList.add('active');

        // Impact flash
        impactFlash.classList.add('active');

        // Vibration feedback - intense pattern
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 150, 50, 100, 50, 200]);
        }

    }, impactTime);

    // After football animation completes, reveal the content
    setTimeout(() => {
        // Hide the football container
        footballContainer.style.display = 'none';

        // Remove shake class
        landingPage.classList.remove('shake');

        // Reveal landing content with animation
        landingContent.classList.remove('hidden');
        landingContent.classList.add('reveal');

    }, animationEnd);

    // Handle football button click to proceed to main content
    enterBtn.addEventListener('click', () => {
        transitionToMain();
    });

    // Also allow Enter key or Space to proceed
    document.addEventListener('keydown', (e) => {
        if ((e.code === 'Enter' || e.code === 'Space') &&
            !landingPage.classList.contains('hidden') &&
            landingContent.classList.contains('reveal')) {
            transitionToMain();
        }
    });

    function transitionToMain() {
        // Vibration feedback
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }

        // Hide landing page
        landingPage.classList.add('hidden');

        // Show main content after landing fades
        setTimeout(() => {
            mainContent.classList.add('visible');

            // Initialize main portfolio features
            initStarfield();
            initCardReveal();
            initScrollAnimations();
            init3DTiltEffect();
        }, 400);
    }
}

function initLandingStarfield() {
    const container = document.getElementById('landingStarfield');
    if (!container) return;

    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        star.style.setProperty('--duration', duration + 's');
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = delay + 's';

        container.appendChild(star);
    }
}

function initLandingParticles() {
    const container = document.getElementById('landingParticles');
    if (!container) return;

    const colors = ['#d4af37', '#f4d03f', '#00d4ff', '#ffffff'];

    // Create initial particles
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createLandingParticle(container, colors);
        }, i * 200);
    }

    // Continuously create particles
    setInterval(() => {
        createLandingParticle(container, colors);
    }, 300);
}

function createLandingParticle(container, colors) {
    const particle = document.createElement('div');
    particle.className = 'landing-particle';

    // Random properties
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 8 + 5;
    const left = Math.random() * 100;

    particle.style.background = color;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = left + '%';
    particle.style.bottom = '-20px';
    particle.style.animationDuration = duration + 's';
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

    container.appendChild(particle);

    // Remove after animation
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

/* =============================================
   ANIMATED STARFIELD BACKGROUND
   ============================================= */

function initStarfield() {
    const starfieldContainer = document.getElementById('starfield');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        createStar(starfieldContainer);
    }
}

function createStar(container) {
    const star = document.createElement('div');
    star.className = 'star';

    // Random position
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';

    // Random size (1-3px)
    const size = Math.random() * 2 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';

    // Random animation duration and delay for twinkling
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 5;
    star.style.setProperty('--duration', duration + 's');
    star.style.animationDuration = duration + 's';
    star.style.animationDelay = delay + 's';

    // Random base opacity
    star.style.setProperty('--base-opacity', (Math.random() * 0.5 + 0.3).toString());

    container.appendChild(star);
}

/* =============================================
   CARD REVEAL ANIMATION
   ============================================= */

function initCardReveal() {
    const pack = document.getElementById('pack');
    const fifaCard = document.getElementById('fifaCard');
    const cardWrapper = document.querySelector('.card-wrapper');
    const clickHint = document.querySelector('.click-hint');

    // Check if elements exist
    if (!pack || !fifaCard || !cardWrapper) {
        console.error('Card reveal: Required elements not found');
        return;
    }

    let isRevealed = false;

    function doReveal(e) {
        if (isRevealed) return;
        if (e) e.stopPropagation();
        isRevealed = true;
        console.log('Card reveal triggered');
        revealCard(pack, fifaCard);
    }

    // Multiple click targets for reliability
    cardWrapper.addEventListener('click', doReveal);
    pack.addEventListener('click', doReveal);
    if (clickHint) clickHint.addEventListener('click', doReveal);

    // Also allow spacebar or Enter to reveal
    document.addEventListener('keydown', (e) => {
        if ((e.code === 'Space' || e.code === 'Enter') && !isRevealed) {
            doReveal();
        }
    });

    console.log('Card reveal initialized successfully');
}

function revealCard(pack, fifaCard) {
    // Sound effect simulation with vibration (if supported)
    if (navigator.vibrate) {
        navigator.vibrate([50, 50, 100]);
    }

    // Step 1: Hide pack with flip animation
    pack.classList.add('revealed');

    // Step 2: Show card with delay
    setTimeout(() => {
        fifaCard.classList.add('revealed');

        // Step 3: Shake animation
        setTimeout(() => {
            fifaCard.classList.add('shake');

            // Step 4: After shake, animate stats
            setTimeout(() => {
                fifaCard.classList.remove('shake');
                animateStats();
                createCelebrationParticles();
            }, 600);
        }, 400);
    }, 400);
}

/* =============================================
   STATS COUNTER ANIMATION
   ============================================= */

function animateStats() {
    // Animate rating
    const ratingElement = document.querySelector('.rating');
    const ratingNumber = ratingElement.querySelector('.rating-number');
    const targetRating = parseInt(ratingElement.dataset.value);

    animateNumber(ratingNumber, 0, targetRating, 1500);

    // Animate all stat items
    const statItems = document.querySelectorAll('.stat-item');

    statItems.forEach((item, index) => {
        const valueElement = item.querySelector('.stat-value');
        const targetValue = parseInt(item.dataset.value);

        // Stagger animation
        setTimeout(() => {
            animateNumber(valueElement, 0, targetValue, 1000);
        }, index * 100);
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        const current = Math.floor(start + (end - start) * easeProgress);
        element.textContent = current.toString().padStart(2, '0');

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end.toString().padStart(2, '0');
        }
    }

    requestAnimationFrame(update);
}

/* =============================================
   CELEBRATION PARTICLES
   ============================================= */

function createCelebrationParticles() {
    const container = document.getElementById('celebrationParticles');
    const colors = ['#d4af37', '#f4d03f', '#ffd700', '#b8860b', '#ffffff'];
    const shapes = ['circle', 'diamond', 'star'];

    // Create burst of particles
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            createCelebrationParticle(container, colors, shapes);
        }, i * 20);
    }
}

function createCelebrationParticle(container, colors, shapes) {
    const particle = document.createElement('div');
    particle.className = 'celebration-particle';

    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;

    // Random shape
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    if (shape === 'diamond') {
        particle.style.transform = 'rotate(45deg)';
    } else if (shape === 'star') {
        particle.style.borderRadius = '0';
        particle.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
    }

    // Random size
    const size = Math.random() * 15 + 5;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Start from center of card
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';

    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 300 + 200;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity - 200; // Bias upward

    container.appendChild(particle);

    // Animate with physics
    let x = 0, y = 0;
    let vy = dy;
    const gravity = 400;
    const startTime = performance.now();
    const duration = 2000;

    function animate(currentTime) {
        const elapsed = (currentTime - startTime) / 1000;

        if (elapsed > duration / 1000) {
            particle.remove();
            return;
        }

        x = dx * elapsed;
        vy += gravity * 0.016;
        y += vy * 0.016;

        const opacity = 1 - (elapsed / (duration / 1000));

        particle.style.transform = `translate(${x}px, ${y}px) rotate(${elapsed * 360}deg)`;
        particle.style.opacity = opacity;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

/* =============================================
   SCROLL ANIMATIONS
   ============================================= */

function initScrollAnimations() {
    const sections = document.querySelectorAll('.about-section, .skills-section, .social-section');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If skills section, animate the bars
                if (entry.target.classList.contains('skills-section')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-bar-item');

    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
            item.classList.add('animate');
        }, index * 150);
    });
}

/* =============================================
   3D TILT EFFECT
   ============================================= */

function init3DTiltEffect() {
    const card = document.getElementById('fifaCard');
    const cardInner = card.querySelector('.card-inner');

    card.addEventListener('mousemove', (e) => {
        if (!card.classList.contains('revealed')) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        cardInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        cardInner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        cardInner.style.transition = 'transform 0.5s ease-out';
    });

    card.addEventListener('mouseenter', () => {
        cardInner.style.transition = 'transform 0.1s ease-out';
    });
}

/* =============================================
   UTILITY - SMOOTH SCROLL TO SECTIONS
   ============================================= */

// Add smooth scroll for any anchor links
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
