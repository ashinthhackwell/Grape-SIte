import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const technologies = [
    { name: 'JavaScript', color: '#f7df1e', size: 120 },
    { name: 'Node.js', color: '#339933', size: 100 },
    { name: 'React', color: '#61dafb', size: 140 },
    { name: 'MongoDB', color: '#47a248', size: 110 },
    { name: 'Express', color: '#000000', size: 90 },
];

const TechnologySection = () => {
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const inView = useInView(containerRef, { once: false, margin: "-100px" });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [inView, controls]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left - rect.width / 2,
            y: e.clientY - rect.top - rect.height / 2
        });
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            style={{
                padding: '160px 24px',
                background: 'transparent',
                minHeight: '800px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div className="dot-background" />

            <motion.div
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
                }}
                style={{ textAlign: 'center', zIndex: 10, position: 'relative' }}
            >
                <h2 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 600,
                    color: '#111',
                    marginBottom: '20px',
                    letterSpacing: '-0.03em'
                }}>
                    Powered by Modern Tech
                </h2>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '600px',
                    lineHeight: 1.6
                }}>
                    A frictionless stack engineered for lightning-fast performance, unbounded scaling, and maximum developer velocity.
                </p>
            </motion.div>

            {/* Interactive Floating Tech Network */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                {technologies.map((tech, i) => {
                    // Distribute cards loosely in an orbital pattern
                    const angle = (i / technologies.length) * Math.PI * 2;
                    const radius = 250;
                    const baseX = Math.cos(angle) * radius;
                    const baseY = Math.sin(angle) * radius + 100; // Offset down slightly

                    // Mouse parallax weight
                    const parallaxFactor = (i % 2 === 0) ? -0.05 : 0.08;

                    return (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: baseX + mousePos.x * parallaxFactor,
                                y: baseY + mousePos.y * parallaxFactor
                            }}
                            transition={{
                                opacity: { duration: 1, delay: i * 0.1 },
                                scale: { duration: 1, delay: i * 0.1, type: "spring", bounce: 0.4 },
                                x: { type: "spring", stiffness: 50, damping: 20 },
                                y: { type: "spring", stiffness: 50, damping: 20 }
                            }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: `${tech.size}px`,
                                height: `${tech.size}px`,
                                marginLeft: `-${tech.size / 2}px`,
                                marginTop: `-${tech.size / 2}px`,
                                background: 'rgba(255, 255, 255, 0.5)',
                                backdropFilter: 'blur(24px)',
                                WebkitBackdropFilter: 'blur(24px)',
                                borderRadius: '32px',
                                border: '1px solid rgba(255,255,255,0.8)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 600,
                                fontSize: '1.05rem',
                                color: '#111',
                                pointerEvents: 'auto',
                                cursor: 'default'
                            }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: `0 30px 60px ${tech.color}30, inset 0 1px 0 rgba(255,255,255,1)`,
                                border: `1px solid ${tech.color}80`
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: `radial-gradient(circle at top left, ${tech.color}20 0%, transparent 70%)`,
                                borderRadius: 'inherit',
                                pointerEvents: 'none'
                            }} />
                            <span style={{ zIndex: 2 }}>{tech.name}</span>
                        </motion.div>
                    );
                })}

                {/* Connecting lines proxy (abstract background element) */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '600px',
                        height: '600px',
                        border: '1px solid rgba(0,0,0,0.02)',
                        borderRadius: '50%',
                        zIndex: 0
                    }}
                />
            </div>
        </section>
    );
};

export default TechnologySection;
