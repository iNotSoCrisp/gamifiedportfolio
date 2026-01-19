import { useState, useEffect, useRef, useCallback } from 'react';
import './HeroSection.css';

interface Stat {
    label: string;
    value: number;
    tooltip: string;
}

const stats: Stat[] = [
    { label: 'JS', value: 90, tooltip: 'JavaScript' },
    { label: 'PY', value: 88, tooltip: 'Python' },
    { label: 'TS', value: 87, tooltip: 'TypeScript' },
    { label: 'RE', value: 86, tooltip: 'React' },
    { label: 'NX', value: 85, tooltip: 'Next.js' },
    { label: 'ND', value: 84, tooltip: 'Node.js' },
];

export default function HeroSection() {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [animatedStats, setAnimatedStats] = useState<number[]>(stats.map(() => 0));
    const [animatedRating, setAnimatedRating] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    const revealCard = useCallback(() => {
        if (isRevealed) return;

        console.log('Card reveal triggered');

        if (navigator.vibrate) {
            navigator.vibrate([50, 50, 100]);
        }

        setIsRevealed(true);

        // Start shake animation after pack flips
        setTimeout(() => {
            setIsShaking(true);

            // End shake and animate stats
            setTimeout(() => {
                setIsShaking(false);
                animateStats();
                createCelebrationParticles();
            }, 600);
        }, 800);
    }, [isRevealed]);

    const animateStats = () => {
        const duration = 1500;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setAnimatedRating(Math.floor(92 * easeProgress));
            setAnimatedStats(stats.map(stat => Math.floor(stat.value * easeProgress)));

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setAnimatedRating(92);
                setAnimatedStats(stats.map(stat => stat.value));
            }
        };

        requestAnimationFrame(animate);
    };

    const createCelebrationParticles = () => {
        const container = document.getElementById('celebrationParticles');
        if (!container) return;

        const colors = ['#d4af37', '#f4d03f', '#ffd700', '#b8860b', '#ffffff'];

        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'celebration-particle';

                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = Math.random() * 15 + 5;

                particle.style.background = color;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${window.innerWidth / 2}px`;
                particle.style.top = `${window.innerHeight / 2}px`;

                container.appendChild(particle);

                // Animate with physics
                const angle = Math.random() * Math.PI * 2;
                const velocity = Math.random() * 300 + 200;
                const dx = Math.cos(angle) * velocity;
                let dy = Math.sin(angle) * velocity - 200;
                let x = 0, y = 0;
                const gravity = 400;
                const startTime = performance.now();
                const duration = 2000;

                const animateParticle = (currentTime: number) => {
                    const elapsed = (currentTime - startTime) / 1000;

                    if (elapsed > duration / 1000) {
                        particle.remove();
                        return;
                    }

                    x = dx * elapsed;
                    dy += gravity * 0.016;
                    y += dy * 0.016;

                    const opacity = 1 - (elapsed / (duration / 1000));

                    particle.style.transform = `translate(${x}px, ${y}px) rotate(${elapsed * 360}deg)`;
                    particle.style.opacity = String(opacity);

                    requestAnimationFrame(animateParticle);
                };

                requestAnimationFrame(animateParticle);
            }, i * 20);
        }
    };

    // 3D Tilt effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isRevealed || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        const cardInner = cardRef.current.querySelector('.card-inner') as HTMLElement;
        if (cardInner) {
            cardInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        const cardInner = cardRef.current.querySelector('.card-inner') as HTMLElement;
        if (cardInner) {
            cardInner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            cardInner.style.transition = 'transform 0.5s ease-out';
        }
    };

    const handleMouseEnter = () => {
        if (!cardRef.current) return;
        const cardInner = cardRef.current.querySelector('.card-inner') as HTMLElement;
        if (cardInner) {
            cardInner.style.transition = 'transform 0.1s ease-out';
        }
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.code === 'Space' || e.code === 'Enter') && !isRevealed) {
                revealCard();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isRevealed, revealCard]);

    return (
        <section className="hero" id="hero">
            <div className="card-wrapper" onClick={revealCard}>
                {/* Pack (Back of card) */}
                <div className={`pack ${isRevealed ? 'revealed' : ''}`}>
                    <div className="pack-inner">
                        <div className="pack-design">
                            <div className="pack-logo">
                                <span className="pack-icon">⚡</span>
                                <span className="pack-text">ICON</span>
                            </div>
                            <div className="pack-glow"></div>
                        </div>
                    </div>
                    <div className="click-hint">Click to reveal</div>
                </div>

                {/* FIFA Card */}
                <div
                    className={`fifa-card ${isRevealed ? 'revealed' : ''} ${isShaking ? 'shake' : ''}`}
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                >
                    <div className="card-inner">
                        <div className="card-bg">
                            <div className="card-shimmer"></div>
                            <div className="card-pattern"></div>
                        </div>

                        <div className="card-content">
                            <div className="card-header">
                                <div className="icon-badge">
                                    <span className="icon-star">★</span>
                                    <span className="icon-text">ICON</span>
                                    <span className="icon-star">★</span>
                                </div>
                            </div>

                            <div className="card-rating-section">
                                <div className="rating">
                                    <span className="rating-number">
                                        {String(animatedRating).padStart(2, '0')}
                                    </span>
                                </div>
                                <div className="position">FSD</div>
                            </div>

                            <div className="player-image-container">
                                <div className="player-image">
                                    <img src="/profile.jpg" alt="Crisp - Shubh Arya" className="profile-img" />
                                </div>
                                <div className="player-glow"></div>
                            </div>

                            <div className="player-name-section">
                                <div className="player-alias">CRISP</div>
                                <div className="player-name">SHUBH ARYA</div>
                            </div>

                            <div className="stats-container">
                                <div className="stats-divider"></div>
                                <div className="stats-grid">
                                    {stats.map((stat, index) => (
                                        <div className="stat-item" key={stat.label}>
                                            <span className="stat-value">
                                                {String(animatedStats[index]).padStart(2, '0')}
                                            </span>
                                            <span className="stat-label">{stat.label}</span>
                                            <span className="stat-tooltip">{stat.tooltip}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="card-border-glow"></div>
                    </div>
                </div>
            </div>

            <div className="celebration-particles" id="celebrationParticles"></div>
        </section>
    );
}
