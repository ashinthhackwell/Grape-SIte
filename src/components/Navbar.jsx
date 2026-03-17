import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();
    const isHelpPage = location.pathname === '/help';

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Background appearance logic
            setScrolled(currentScrollY > 20);

            // Visibility logic
            // 1. Always show at the very top
            if (currentScrollY < 50) {
                setIsVisible(true);
            } 
            // 2. If scrolling down and past the Hero section (approx 100vh)
            else if (currentScrollY > lastScrollY && currentScrollY > 800) {
                setIsVisible(false);
            }
            // 3. If scrolling up
            else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);


    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: isVisible ? 0 : -100,
                opacity: isVisible ? 1 : 0
            }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '72px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 var(--section-padding-x)',
                zIndex: 100,
                transition: 'all 0.4s ease',
                background: scrolled ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent'
            }}
        >
            {/* Logo area */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', textDecoration: 'none' }}>
                <img src="/grape-logo.png" alt="Grape" style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'contain' }} />
                <span style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.02em', color: '#111' }}>
                    Grape
                </span>
            </Link>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)' }}>
                <Link to="/help" className="premium-glow-btn" style={{
                    color: '#4b5563',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '14px',
                    opacity: isHelpPage ? 0.5 : 1,
                    pointerEvents: isHelpPage ? 'none' : 'auto'
                }}>
                    <div className="premium-glow-btn-inner" style={{ background: '#f3f4f6', padding: '8px clamp(16px, 3vw, 24px)' }}>
                        <span>Help ?</span>
                    </div>
                </Link>

                <a href="#" className="premium-glow-btn" style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '14px',
                }}>
                    <div className="premium-glow-btn-inner" style={{ background: '#111', padding: '8px clamp(16px, 3vw, 24px)' }}>
                        <span>Download</span>
                    </div>
                </a>
            </div>
        </motion.nav>
    );
};

export default Navbar;
