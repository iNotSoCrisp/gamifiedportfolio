import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './hero/HeroSection';
import './App.css';

// Memoized sparkle component with sci-fi colors
interface SparkleProps {
    style: React.CSSProperties;
}

const Sparkle = ({ style }: SparkleProps) => (
    <motion.div
        className="sparkle"
        style={style}
        animate={{
            opacity: [0, style['--max-opacity' as keyof React.CSSProperties] as number || 0.5, style['--max-opacity' as keyof React.CSSProperties] as number || 0.5, 0],
            y: [0, -20, -20, 0],
            scale: [0.5, 1, 1, 0.5]
        }}
        transition={{
            duration: parseFloat(String(style['--duration' as keyof React.CSSProperties] || '10s')),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: parseFloat(String(style.animationDelay || '0s'))
        }}
    />
);

export default function App() {
    const [explored, setExplored] = useState(false);

    const handleExplore = useCallback(() => {
        setExplored(true);

        // Show static sections
        const staticSections = document.getElementById('staticSections');
        if (staticSections) {
            staticSections.classList.add('visible');
        }

        // Scroll to sections after a brief delay
        setTimeout(() => {
            const staticSections = document.getElementById('staticSections');
            if (staticSections) {
                staticSections.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Initialize scroll observers for static sections
            initScrollObservers();
        }, 100);
    }, []);

    const initScrollObservers = () => {
        const sections = document.querySelectorAll('.profile-section, .capabilities-section, .dual-ops-section, .comms-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

        sections.forEach(section => observer.observe(section));
    };

    // Memoize sparkle data with sci-fi color palette
    const sparkles = useMemo(() => {
        const colors = [
            'rgba(0, 240, 255, 0.6)',    // Neon Cyan
            'rgba(168, 85, 247, 0.5)',   // Ion Purple
            'rgba(34, 211, 238, 0.4)',   // Plasma Green
            'rgba(255, 255, 255, 0.3)',  // White
        ];

        return Array.from({ length: 50 }).map((_, i) => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 3 + 1.5;
            const maxOpacity = Math.random() * 0.3 + 0.15;

            return {
                id: i,
                style: {
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    ['--duration' as string]: `${Math.random() * 8 + 8}s`,
                    ['--color' as string]: color,
                    ['--max-opacity' as string]: `${maxOpacity}`,
                    animationDelay: `${Math.random() * 10}s`,
                    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`
                } as React.CSSProperties
            };
        });
    }, []);

    return (
        <div className={`main-content ${explored ? 'explored' : ''}`}>
            {/* Floating Sparkles */}
            <div className="sparkle-field">
                {sparkles.map(({ id, style }) => (
                    <Sparkle key={id} style={style} />
                ))}
            </div>

            {/* Ambient Glow - Cinematic Slow */}
            <motion.div
                className="ambient-glow"
                animate={{
                    opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />

            {/* Grid Overlay */}
            <div className="grid-overlay"></div>

            {/* Vignette */}
            <div className="vignette"></div>

            {/* Main Container - FIFA Pack */}
            <main className="container">
                <HeroSection onExplore={handleExplore} />
            </main>
        </div>
    );
}
