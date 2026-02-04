import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './landing/LandingPage';
import HeroSection from './hero/HeroSection';
import './App.css';

// Memoized sparkle component for performance
interface SparkleProps {
    style: React.CSSProperties;
}

const Sparkle = ({ style }: SparkleProps) => (
    <motion.div
        className="sparkle"
        style={style}
        animate={{
            opacity: [0, style['--max-opacity' as keyof React.CSSProperties] as number || 0.6, style['--max-opacity' as keyof React.CSSProperties] as number || 0.6, 0],
            y: [0, -30, -30, 0],
            scale: [0.5, 1, 1, 0.5]
        }}
        transition={{
            duration: parseFloat(String(style['--duration' as keyof React.CSSProperties] || '8s')),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: parseFloat(String(style.animationDelay || '0s'))
        }}
    />
);

const mainContentVariants = {
    hidden: {
        opacity: 0,
        visibility: 'hidden' as const
    },
    visible: {
        opacity: 1,
        visibility: 'visible' as const,
        transition: {
            duration: 0.5,
            ease: 'easeOut' as const
        }
    }
};

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
        const sections = document.querySelectorAll('.about-section, .skills-section, .social-section, .projects-section, .experience-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

        sections.forEach(section => observer.observe(section));
    };

    // Memoize sparkle data for better performance
    const sparkles = useMemo(() => {
        const colors = [
            'rgba(212, 175, 55, 0.7)',  // Gold
            'rgba(244, 208, 63, 0.6)',  // Light gold
            'rgba(255, 255, 255, 0.5)', // White
            'rgba(0, 212, 255, 0.4)',   // Cyan (rare)
        ];

        return Array.from({ length: 60 }).map((_, i) => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 4 + 2;
            const maxOpacity = Math.random() * 0.4 + 0.2;

            return {
                id: i,
                style: {
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    ['--duration' as string]: `${Math.random() * 6 + 6}s`,
                    ['--color' as string]: color,
                    ['--max-opacity' as string]: `${maxOpacity}`,
                    animationDelay: `${Math.random() * 8}s`,
                    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`
                } as React.CSSProperties
            };
        });
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {!showMain && <LandingPage onEnter={handleEnter} />}
            </AnimatePresence>

            <AnimatePresence>
                {showMain && (
                    <motion.div
                        className="main-content"
                        variants={mainContentVariants}
                        initial="hidden"
                        animate={mainVisible ? 'visible' : 'hidden'}
                    >
                        {/* Floating Sparkles Background */}
                        <div className="sparkle-field">
                            {sparkles.map(({ id, style }) => (
                                <Sparkle key={id} style={style} />
                            ))}
                        </div>

                        {/* Ambient Glow */}
                        <motion.div
                            className="ambient-glow"
                            animate={{
                                opacity: [0.6, 1, 0.6]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        />

                        {/* Grid Overlay */}
                        <div className="grid-overlay"></div>

                        {/* Vignette */}
                        <div className="vignette"></div>

                        {/* Main Container */}
                        <main className="container">
                            <HeroSection />
                        </main>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
