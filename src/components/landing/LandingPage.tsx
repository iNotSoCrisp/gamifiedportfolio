import { useState, useEffect, useCallback } from 'react';
import './LandingPage.css';

interface LandingPageProps {
    onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
    const [impactTriggered, setImpactTriggered] = useState(false);
    const [crackShrinking, setCrackShrinking] = useState(false);
    const [contentRevealed, setContentRevealed] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    // Football animation timeline
    useEffect(() => {
        const impactTime = 1400; // 70% of 2s animation
        const crackShrinkTime = 1900; // After crack appears, start shrinking
        const animationEnd = 2600; // After crack shrinks, reveal content

        const impactTimer = setTimeout(() => {
            setImpactTriggered(true);
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 150, 50, 100, 50, 200]);
            }
        }, impactTime);

        const crackShrinkTimer = setTimeout(() => {
            setCrackShrinking(true);
        }, crackShrinkTime);

        const revealTimer = setTimeout(() => {
            setContentRevealed(true);
        }, animationEnd);

        return () => {
            clearTimeout(impactTimer);
            clearTimeout(crackShrinkTimer);
            clearTimeout(revealTimer);
        };
    }, []);

    const handleEnter = useCallback(() => {
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
        setIsHidden(true);
        setTimeout(onEnter, 400);
    }, [onEnter]);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.code === 'Enter' || e.code === 'Space') && contentRevealed && !isHidden) {
                handleEnter();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [contentRevealed, isHidden, handleEnter]);

    return (
        <div className={`landing-page ${isHidden ? 'hidden' : ''} ${impactTriggered ? 'shake' : ''}`}>
            <div className="landing-glow"></div>

            {/* Football Animation */}
            {!contentRevealed && (
                <div className="football-container">
                    <div className="football">
                        <FootballSVG />
                        <div className="football-shadow"></div>
                    </div>
                </div>
            )}

            {/* Screen Crack Effect */}
            <div className={`screen-crack ${impactTriggered ? 'active' : ''} ${crackShrinking ? 'shrinking' : ''}`}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path className="crack-line" d="M50,50 L30,20 L25,35 L10,25" />
                    <path className="crack-line" d="M50,50 L70,15 L85,30" />
                    <path className="crack-line" d="M50,50 L80,55 L95,50" />
                    <path className="crack-line" d="M50,50 L75,80 L90,85" />
                    <path className="crack-line" d="M50,50 L40,75 L30,90" />
                    <path className="crack-line" d="M50,50 L15,60 L5,70" />
                    <path className="crack-line" d="M50,50 L20,45 L5,40" />
                    <path className="crack-line" d="M50,50 L55,25 L60,5" />
                </svg>
            </div>

            {/* Impact Flash */}
            <div className={`impact-flash ${impactTriggered ? 'active' : ''}`}></div>

            {/* Landing Content */}
            <div className={`landing-content ${contentRevealed ? 'reveal' : 'hidden'}`}>
                <div className="intro-badge">
                    <span className="badge-icon">⚡</span>
                    <span className="badge-text">ICON CARD</span>
                </div>
                <h1 className="intro-title">
                    <span className="title-line line-1">GET READY</span>
                    <span className="title-line line-2">TO MEET</span>
                </h1>
                <div className="intro-name">
                    <span className="name-text">CRISP</span>
                    <span className="name-sub">FULL STACK DEVELOPER</span>
                </div>
                <p className="intro-tagline">A developer is loading...</p>

                <button className="football-btn" onClick={handleEnter}>
                    <FootballButtonSVG />
                    <span className="football-btn-text">TAP</span>
                    <div className="football-btn-glow"></div>
                </button>

                <div className="scroll-hint">
                    <span className="scroll-text">TAP THE BALL TO REVEAL</span>
                </div>
            </div>
        </div>
    );
}

function FootballSVG() {
    return (
        <svg viewBox="0 0 200 200" className="football-svg">
            <defs>
                <radialGradient id="ballGradient" cx="30%" cy="30%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#e8e8e8" />
                    <stop offset="80%" stopColor="#cccccc" />
                    <stop offset="100%" stopColor="#999999" />
                </radialGradient>
                <radialGradient id="shadowGradient" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="70%" stopColor="transparent" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
                </radialGradient>
                <linearGradient id="pentagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2a2a2a" />
                    <stop offset="50%" stopColor="#1a1a1a" />
                    <stop offset="100%" stopColor="#0a0a0a" />
                </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="95" fill="url(#ballGradient)" stroke="#888" strokeWidth="2" />
            <polygon points="100,55 130,75 120,110 80,110 70,75" fill="url(#pentagonGradient)" stroke="#333" strokeWidth="1.5" />
            <polygon points="100,55 130,75 145,55 130,30 100,25 85,35" fill="#f5f5f5" stroke="#aaa" strokeWidth="1" />
            <polygon points="130,75 145,55 170,70 175,100 150,105 135,90" fill="#f0f0f0" stroke="#aaa" strokeWidth="1" />
            <polygon points="120,110 150,105 165,130 150,160 115,150 110,125" fill="#ebebeb" stroke="#aaa" strokeWidth="1" />
            <polygon points="80,110 90,125 85,150 50,160 35,130 50,105" fill="#ebebeb" stroke="#aaa" strokeWidth="1" />
            <polygon points="70,75 50,105 25,100 30,70 55,55 70,60" fill="#f0f0f0" stroke="#aaa" strokeWidth="1" />
            <polygon points="100,55 85,35 70,60 70,75 80,65" fill="#f5f5f5" stroke="#aaa" strokeWidth="1" />
            <polygon points="100,15 125,25 120,45 80,45 75,25" fill="url(#pentagonGradient)" stroke="#333" strokeWidth="1.5" />
            <polygon points="175,85 185,105 175,130 155,125 155,95" fill="url(#pentagonGradient)" stroke="#333" strokeWidth="1.5" />
            <polygon points="155,165 145,185 115,185 110,165 130,155" fill="url(#pentagonGradient)" stroke="#333" strokeWidth="1.5" />
            <polygon points="45,165 55,185 85,185 90,165 70,155" fill="url(#pentagonGradient)" stroke="#333" strokeWidth="1.5" />
            <polygon points="25,85 15,105 25,130 45,125 45,95" fill="url(#pentagonGradient)" stroke="#333" strokeWidth="1.5" />
            <line x1="100" y1="55" x2="100" y2="25" stroke="#bbb" strokeWidth="1.5" />
            <line x1="130" y1="75" x2="155" y2="95" stroke="#bbb" strokeWidth="1.5" />
            <line x1="120" y1="110" x2="130" y2="155" stroke="#bbb" strokeWidth="1.5" />
            <line x1="80" y1="110" x2="70" y2="155" stroke="#bbb" strokeWidth="1.5" />
            <line x1="70" y1="75" x2="45" y2="95" stroke="#bbb" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="95" fill="url(#shadowGradient)" />
            <ellipse cx="70" cy="60" rx="25" ry="15" fill="rgba(255,255,255,0.4)" transform="rotate(-30 70 60)" />
        </svg>
    );
}

function FootballButtonSVG() {
    return (
        <svg viewBox="0 0 200 200" className="football-btn-svg">
            <defs>
                <radialGradient id="btnBallGradient" cx="30%" cy="30%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#e8e8e8" />
                    <stop offset="80%" stopColor="#cccccc" />
                    <stop offset="100%" stopColor="#999999" />
                </radialGradient>
                <linearGradient id="btnPentagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2a2a2a" />
                    <stop offset="50%" stopColor="#1a1a1a" />
                    <stop offset="100%" stopColor="#0a0a0a" />
                </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="95" fill="url(#btnBallGradient)" stroke="#888" strokeWidth="2" />
            <polygon points="100,55 130,75 120,110 80,110 70,75" fill="url(#btnPentagonGradient)" stroke="#333" strokeWidth="1.5" />
            <polygon points="100,55 130,75 145,55 130,30 100,25 85,35" fill="#f5f5f5" stroke="#aaa" strokeWidth="1" />
            <polygon points="130,75 145,55 170,70 175,100 150,105 135,90" fill="#f0f0f0" stroke="#aaa" strokeWidth="1" />
            <polygon points="120,110 150,105 165,130 150,160 115,150 110,125" fill="#ebebeb" stroke="#aaa" strokeWidth="1" />
            <polygon points="80,110 90,125 85,150 50,160 35,130 50,105" fill="#ebebeb" stroke="#aaa" strokeWidth="1" />
            <polygon points="70,75 50,105 25,100 30,70 55,55 70,60" fill="#f0f0f0" stroke="#aaa" strokeWidth="1" />
            <polygon points="100,15 125,25 120,45 80,45 75,25" fill="url(#btnPentagonGradient)" stroke="#333" strokeWidth="1.5" />
            <polygon points="175,85 185,105 175,130 155,125 155,95" fill="url(#btnPentagonGradient)" stroke="#333" strokeWidth="1.5" />
            <polygon points="155,165 145,185 115,185 110,165 130,155" fill="url(#btnPentagonGradient)" stroke="#333" strokeWidth="1.5" />
            <polygon points="45,165 55,185 85,185 90,165 70,155" fill="url(#btnPentagonGradient)" stroke="#333" strokeWidth="1.5" />
            <polygon points="25,85 15,105 25,130 45,125 45,95" fill="url(#btnPentagonGradient)" stroke="#333" strokeWidth="1.5" />
            <ellipse cx="70" cy="60" rx="25" ry="15" fill="rgba(255,255,255,0.4)" transform="rotate(-30 70 60)" />
        </svg>
    );
}
