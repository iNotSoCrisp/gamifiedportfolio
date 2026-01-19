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
                    {/* Starfield Background */}
                    <div className="starfield">
                        {Array.from({ length: 150 }).map((_, i) => (
                            <Star key={i} />
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

function Star() {
    const style: React.CSSProperties = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        ['--duration' as string]: `${Math.random() * 3 + 2}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 5}s`,
        ['--base-opacity' as string]: `${Math.random() * 0.5 + 0.3}`,
    };
    return <div className="star" style={style}></div>;
}
