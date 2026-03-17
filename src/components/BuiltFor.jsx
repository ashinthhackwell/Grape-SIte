import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const BuiltFor = () => {
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: false, amount: 0.5 });

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <section
            ref={containerRef}
            style={{
                padding: isMobile ? '60px 20px' : '40px 24px 80px 24px',
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'center' : 'flex-start',
                flexWrap: 'wrap',
                gap: isMobile ? '40px' : '80px'
            }}
        >
            {/* Left Side: Large 2-Line Headline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ flex: isMobile ? '1 1 100%' : '0 1 560px', textAlign: isMobile ? 'center' : 'left' }}
            >
                <h2 style={{
                    fontSize: isMobile ? '2.5rem' : 'clamp(2.5rem, 4.5vw, 3.5rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    color: '#111827',
                    lineHeight: 1.1,
                    marginLeft: isMobile ? '0' : '-50px'
                }}>
                    Clarity, Transparency<br />
                    Privacy Built In
                </h2>
            </motion.div>

            {/* Right Side: Smaller 4-Line Description Text */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    flex: isMobile ? '1 1 100%' : '0 1 500px',
                    paddingTop: isMobile ? '0' : '120px',
                    textAlign: isMobile ? 'center' : 'left'
                }}
            >
                <p style={{
                    fontSize: '1rem',
                    lineHeight: 1.5,
                    color: '#4b5563',
                    margin: 0,
                    fontWeight: 500
                }}>
                    Grape helps teams work better with real-time monitoring, offline tracking,
                    and privacy-friendly insights. A lightweight desktop agent sends live activity
                    data to the dashboard. If the internet stops, data is saved locally and synced
                    later. Grape focuses on productivity insights while respecting employee privacy
                    and building workplace trust
                </p>
            </motion.div>
        </section>
    );
};

export default BuiltFor;
