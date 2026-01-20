import { useState, useEffect, useCallback } from 'react';
import LandingPage from './landing/LandingPage';
import HeroSection from './hero/HeroSection';
import './App.css';

export default function App() {
    const [showMain, setShowMain] = useState(false);
    const [mainVisible, setMainVisible] = useState(false);

    const handleEnter = useCallback(() => {
        setShowMain(true);
        // Make main content visible after a short delay
        setTimeout(() => {
            setMainVisible(true);
            // Show static sections
            const staticSections = document.getElementById('staticSections');
            if (staticSections) {
                staticSections.classList.add('visible');
            }
            // Initialize scroll observers for static sections
            initScrollObservers();
        }, 100);
    }, []);

    const initScrollObservers = () => {
        const sections = document.querySelectorAll('.about-section, .skills-section, .social-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

        sections.forEach(section => observer.observe(section));
    };

    return (
        <>
            {!showMain && <LandingPage onEnter={handleEnter} />}

            {showMain && (
                <div className={`main-content ${mainVisible ? 'visible' : ''}`}>
                    {/* Floating Sparkles Background */}
                    <div className="sparkle-field">
                        {Array.from({ length: 60 }).map((_, i) => (
                            <Sparkle key={i} />
                        ))}
                    </div>

                    {/* Ambient Glow */}
                    <div className="ambient-glow"></div>

                    {/* Grid Overlay */}
                    <div className="grid-overlay"></div>

                    {/* Vignette */}
                    <div className="vignette"></div>

                    {/* Main Container */}
                    <main className="container">
                        <HeroSection />
                    </main>
                </div>
            )}
        </>
    );
}

function Sparkle() {
    const colors = [
        'rgba(212, 175, 55, 0.7)',  // Gold
        'rgba(244, 208, 63, 0.6)',  // Light gold
        'rgba(255, 255, 255, 0.5)', // White
        'rgba(0, 212, 255, 0.4)',   // Cyan (rare)
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 4 + 2;
    const maxOpacity = Math.random() * 0.4 + 0.2;

    const style: React.CSSProperties = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        ['--duration' as string]: `${Math.random() * 6 + 6}s`,
        ['--color' as string]: color,
        ['--max-opacity' as string]: `${maxOpacity}`,
        animationDelay: `${Math.random() * 8}s`,
    };
    return <div className="sparkle" style={style}></div>;
}

