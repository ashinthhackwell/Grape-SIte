import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const BuiltFor = () => {
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: false, amount: 0.5 });

    return (
        <section
            ref={containerRef}
            className="flex-responsive-row max-container"
            style={{
                padding: 'clamp(40px, 8vw, 80px) 24px',
                alignItems: 'flex-start',
                flexWrap: 'wrap'
            }}
        >
            {/* Left Side: Large 2-Line Headline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ flex: '1 1 560px', width: '100%' }}
            >
                <h2 className="text-fluid-h2" style={{
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    color: '#111827',
                    lineHeight: 1.1,
                    marginLeft: 'clamp(0px, -4vw, -50px)'
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
                    flex: '1 1 500px',
                    paddingTop: 'clamp(0px, 8vw, 120px)',
                    width: '100%'
                }}
            >
                <p className="text-fluid-p" style={{
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
