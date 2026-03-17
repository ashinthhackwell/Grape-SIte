import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const useBreakpoint = () => {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    useEffect(() => {
        const handle = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, []);
    return { isMobile: width <= 640 };
};

const Footer = () => {
    const { isMobile } = useBreakpoint();
    return (
        <footer style={{
            padding: isMobile ? '60px 24px 32px' : '100px 40px 40px 40px',
            background: 'transparent',
            position: 'relative',
            borderTop: '1px solid rgba(0,0,0,0.04)',
            overflow: 'hidden'
        }}>
            <div className="dot-background" style={{ opacity: 0.3 }} />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    paddingBottom: '80px',
                    marginBottom: '40px',
                    flexWrap: 'wrap',
                    gap: '60px',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ flex: '1 1 300px' }}
                >
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '20px', color: '#111', letterSpacing: '-0.02em' }}>Contact Us</h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '300px', fontSize: '1.125rem' }}>
                        Have questions about enterprise plans or custom deployments? Reach out to our specialized support team.
                    </p>
                    <a href="#" style={{ color: '#111', textDecoration: 'none', marginTop: '24px', display: 'inline-block', fontWeight: 500 }}>
                        support@workspace.monitor
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, margin: '-40px' }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ flex: '1 1 auto', textAlign: 'center' }}
                >
                    <h1 style={{
                        fontSize: 'clamp(4rem, 12vw, 10rem)',
                        fontWeight: 800,
                        letterSpacing: '0.3em',
                        opacity: 0.1,
                        color: '#9d00ffff',
                        userSelect: 'none',
                        lineHeight: 0.8
                    }}>
                        GRAPE
                    </h1>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-20px' }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    justifyContent: 'space-between',
                    gap: isMobile ? '16px' : '0',
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <span>Workspace Monitoring Solution</span>
                <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
            </motion.div>
        </footer>
    );
};

export default Footer;
