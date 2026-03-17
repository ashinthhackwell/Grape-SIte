import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Monitor, Apple, MousePointer2 } from 'lucide-react';

const DownloadAgentAnimation = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    // Controls for complex sequencing
    const cursorControls = useAnimation();
    const windowButtonControls = useAnimation();
    const rippleControls = useAnimation();
    const contentControls = useAnimation();

    useEffect(() => {
        let isMounted = true;

        if (isInView) {
            const runSequence = async () => {
                while (isMounted) {
                    // Start fresh
                    cursorControls.set({ opacity: 0, x: 120, y: 120, scale: 1 });
                    rippleControls.set({ scale: 0, opacity: 0 });
                    windowButtonControls.set({ scale: 1, backgroundColor: "#111", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" });

                    // Force content to be visible
                    await contentControls.start({
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.8, ease: "easeOut" }
                    });

                    if (!isMounted) break;
                    await new Promise(r => setTimeout(r, 400));

                    // Cursor appears
                    await cursorControls.start({
                        opacity: 1,
                        transition: { duration: 0.3 }
                    });

                    if (!isMounted) break;
                    await new Promise(r => setTimeout(r, 200));

                    // Cursor moves to Windows button - Precision Target
                    await cursorControls.start({
                        x: isMobile ? 0 : -95,
                        y: isMobile ? 20 : 62,
                        transition: { type: "spring", stiffness: 80, damping: 15, mass: 1 }
                    });

                    if (!isMounted) break;

                    // Hover effect
                    windowButtonControls.start({
                        scale: 1.05,
                        backgroundColor: "#222",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.15), 0 0 20px rgba(168, 85, 247, 0.3)",
                        transition: { duration: 0.3, ease: "easeOut" }
                    });

                    await new Promise(r => setTimeout(r, 400));
                    if (!isMounted) break;

                    // Click sequence
                    cursorControls.start({
                        scale: 0.8,
                        transition: { duration: 0.1 }
                    });

                    windowButtonControls.start({
                        scale: 0.95,
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        transition: { duration: 0.1 }
                    });

                    await new Promise(r => setTimeout(r, 100));
                    if (!isMounted) break;

                    // Ripple and Zoom
                    cursorControls.start({
                        scale: 1,
                        transition: { type: "spring", stiffness: 400, damping: 12 }
                    });

                    rippleControls.start({
                        scale: [0, 2],
                        opacity: [0.6, 0],
                        transition: { duration: 0.6, ease: "easeOut" }
                    });

                    windowButtonControls.start({
                        scale: 1.15,
                        boxShadow: "0 0 60px rgba(168, 85, 247, 0.7)",
                        transition: { duration: 0.2, ease: "easeOut" }
                    });

                    await new Promise(r => setTimeout(r, 600));
                    if (!isMounted) break;

                    // Return to idle
                    windowButtonControls.start({
                        scale: 1,
                        backgroundColor: "#111",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        transition: { duration: 0.6, ease: "easeInOut" }
                    });

                    await cursorControls.start({
                        opacity: 0,
                        x: 120,
                        y: 120,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    });

                    await new Promise(r => setTimeout(r, 1500));
                }
            };

            runSequence();
        }

        return () => { isMounted = false; };
    }, [isInView, contentControls, cursorControls, windowButtonControls, rippleControls, isMobile]);

    return (
        <div
            ref={ref}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                position: 'relative',
                padding: '40px',
                userSelect: 'none',
                overflow: 'hidden'
            }}
        >
            {/* Background UI Grid for premium feel - directly on parent */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(#e2e8f0 2px, transparent 2px)',
                backgroundSize: '32px 32px',
                opacity: 0.4
            }} />

            {/* Title Bar Accents - directly on parent for full cover feel */}
            <div style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                display: 'flex',
                gap: '8px',
                zIndex: 2
            }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57', opacity: 0.6 }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e', opacity: 0.6 }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f', opacity: 0.6 }} />
            </div>

            {/* Main Content (Branding & Buttons) */}
            <motion.div
                animate={contentControls}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 1,
                    width: '100%',
                    position: 'relative',
                    opacity: 0 // Default to hidden, loop will bring it in
                }}
            >
                {/* Title & Subtitle */}
                <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '48px' }}>
                    <motion.h4
                        style={{
                            fontSize: isMobile ? '2.5rem' : '4.5rem',
                            fontWeight: 800,
                            margin: 0,
                            color: '#111',
                            letterSpacing: '-0.04em',
                            lineHeight: 1
                        }}
                    >
                        GRAPE
                    </motion.h4>
                    <p style={{
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        color: '#64748b',
                        margin: isMobile ? '8px 0 0' : '16px 0 0',
                        fontWeight: 500
                    }}>
                        See what your team does :)
                    </p>
                </div>

                {/* Buttons Area */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '12px' : '24px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: isMobile ? '240px' : 'none'
                }}>
                    <motion.div
                        animate={windowButtonControls}
                        initial={{ scale: 1, backgroundColor: "#111" }}
                        style={{
                            background: '#111',
                            color: '#fff',
                            padding: isMobile ? '12px 24px' : '16px 36px',
                            borderRadius: isMobile ? '12px' : '16px',
                            width: isMobile ? '100%' : 'auto',
                            justifyContent: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            position: 'relative',
                            zIndex: 2,
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            willChange: "transform, box-shadow"
                        }}
                    >
                        <Monitor size={isMobile ? 18 : 22} strokeWidth={2.5} />
                        <span style={{ fontSize: isMobile ? '0.95rem' : '1.1rem' }}>Windows</span>

                        {/* Ripple Effect */}
                        <motion.div
                            animate={rippleControls}
                            initial={{ scale: 0, opacity: 0 }}
                            style={{
                                position: 'absolute',
                                width: '200px',
                                height: '200px',
                                background: 'rgba(255, 255, 255, 0.3)',
                                borderRadius: '50%',
                                top: '50%',
                                left: '50%',
                                marginLeft: '-100px',
                                marginTop: '-100px',
                                pointerEvents: 'none',
                                zIndex: 0
                            }}
                        />
                    </motion.div>

                    <div style={{
                        background: '#fff',
                        color: '#111',
                        padding: isMobile ? '12px 24px' : '16px 32px',
                        borderRadius: isMobile ? '12px' : '16px',
                        width: isMobile ? '100%' : 'auto',
                        justifyContent: 'center',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <Apple size={isMobile ? 18 : 22} strokeWidth={2.5} />
                        <span style={{ fontSize: isMobile ? '0.95rem' : '1.1rem' }}>macOS</span>
                    </div>
                </div>
            </motion.div>

            {/* Animated Cursor */}
            <motion.div
                initial={{ opacity: 0, x: 150, y: 150 }}
                animate={cursorControls}
                style={{
                    position: 'absolute',
                    zIndex: 10,
                    pointerEvents: 'none',
                    willChange: "transform, opacity",
                    left: '50%',
                    top: '50%',
                    marginTop: '-2px', // Offset so the tip is at the exact center point
                    marginLeft: '-2px'
                }}
            >
                <div style={{ position: 'relative' }}>
                    <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="white"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}
                    >
                        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                    </svg>
                </div>
            </motion.div>
        </div>
    );
};

export default DownloadAgentAnimation;
