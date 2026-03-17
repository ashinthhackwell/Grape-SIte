import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const BuiltFor = () => {
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: false, amount: 0.5 });

    return (
        <section
            ref={containerRef}
            style={{
                padding: '40px 24px 80px 24px',
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '80px'
            }}
        >
            {/* Left Side: Large 2-Line Headline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ flex: '0 1 560px' }}
            >
                <h2 style={{
                    fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    color: '#111827',
                    lineHeight: 1.1,
                    marginLeft: '-50px'
                }}>
                    Built for managers<br />
                    in the real-time era
                </h2>
            </motion.div>

            {/* Right Side: Smaller 4-Line Description Text */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    flex: '0 1 500px', // Constrain width tightly to match the Antigravity gap and 4-line wrap
                    paddingTop: '120px' // Pushed further down to align with bottom of title block
                }}
            >
                <p style={{
                    fontSize: '1rem',
                    lineHeight: 1.5,
                    color: '#4b5563',
                    margin: 0,
                    fontWeight: 500
                }}>
                    Workspace Monitoring is engineered for total visibility, whether
                    you're a security operations lead analyzing global threats, a
                    system administrator balancing endpoints loads, or an executive commanding
                    infrastructure health from a single pane of glass.
                </p>
            </motion.div>
        </section>
    );
};

export default BuiltFor;
