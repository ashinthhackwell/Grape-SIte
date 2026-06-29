import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <footer style={{
            padding: isMobile ? '60px 20px 40px' : '100px 40px 40px 40px',
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
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    paddingBottom: isMobile ? '40px' : '80px',
                    marginBottom: '40px',
                    flexWrap: 'wrap',
                    gap: isMobile ? '40px' : '60px',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ flex: isMobile ? '1 1 100%' : '1 1 300px', textAlign: isMobile ? 'center' : 'left' }}
                >
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '20px', color: '#111', letterSpacing: '-0.02em' }}>Contact Us</h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: isMobile ? '100%' : '300px', fontSize: '1.125rem' }}>
                        Have questions about enterprise plans or custom deployments? Reach out to our specialized support team.
                    </p>
                    <a href="#" style={{ color: '#111', textDecoration: 'none', marginTop: '24px', display: 'inline-block', fontWeight: 500 }}>
                        support.grape@gmail.com
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, margin: '-40px' }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ flex: '1 1 auto', textAlign: isMobile ? 'center' : 'right', width: isMobile ? '100%' : 'auto' }}
                >
                    <h1 style={{
                        fontSize: isMobile ? 'clamp(3rem, 15vw, 6rem)' : 'clamp(4rem, 12vw, 10rem)',
                        fontWeight: 800,
                        letterSpacing: isMobile ? '0.15em' : '0.3em',
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
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    gap: isMobile ? '12px' : '0',
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                    position: 'relative',
                    zIndex: 1,
                    textAlign: isMobile ? 'center' : 'left'
                }}
            >
                <span>Uprael</span>
                <span>&copy; {new Date().getFullYear()} All rights reserved. Mithun</span>
            </motion.div>
        </footer>
    );
};

export default Footer;
