import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { Play, Copy, Link2, Square, CheckCircle2 } from 'lucide-react';

const PairAgentAnimation = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const cursorControls = useAnimation();
    const [activeScreen, setActiveScreen] = useState(0); // 0=start, 1=code, 2=agent
    const [configHighlight, setConfigHighlight] = useState(false);
    const [codeGlow, setCodeGlow] = useState(false);
    const [codeHighlighted, setCodeHighlighted] = useState(false);
    const [agentDigits, setAgentDigits] = useState('000000');
    const [pairBtnHover, setPairBtnHover] = useState(false);
    const [pairBtnClick, setPairBtnClick] = useState(false);
    const [connected, setConnected] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const pairingCode = '542275';

    const typeDigits = (digits, delay = 120) => {
        return new Promise((resolve) => {
            let i = 0;
            const current = '000000'.split('');
            const interval = setInterval(() => {
                current[i] = digits[i];
                setAgentDigits(current.join(''));
                i++;
                if (i >= digits.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, delay);
        });
    };

    useEffect(() => {
        let isMounted = true;

        if (isInView) {
            const runSequence = async () => {
                while (isMounted) {
                    // ── Reset ──
                    setActiveScreen(0);
                    setConfigHighlight(false);
                    setCodeGlow(false);
                    setCodeHighlighted(false);
                    setAgentDigits('000000');
                    setPairBtnHover(false);
                    setPairBtnClick(false);
                    setConnected(false);
                    setIsReady(false);
                    cursorControls.set({ opacity: 0, x: 100, y: 100, scale: 1 });

                    // Small delay then show
                    await new Promise(r => setTimeout(r, 300));
                    if (!isMounted) break;
                    setIsReady(true);

                    // Screen 1 appears
                    await new Promise(r => setTimeout(r, 600));
                    if (!isMounted) break;

                    // Cursor appears
                    await cursorControls.start({ opacity: 1, transition: { duration: 0.3 } });
                    if (!isMounted) break;
                    await new Promise(r => setTimeout(r, 300));

                    // Cursor moves to "Student" config card
                    await cursorControls.start({
                        x: -60, y: 60,
                        transition: { type: 'spring', stiffness: 80, damping: 15 }
                    });
                    if (!isMounted) break;

                    // Hover highlight
                    setConfigHighlight(true);
                    await new Promise(r => setTimeout(r, 400));
                    if (!isMounted) break;

                    // Click
                    cursorControls.start({ scale: 0.85, transition: { duration: 0.1 } });
                    await new Promise(r => setTimeout(r, 120));
                    cursorControls.start({ scale: 1, transition: { duration: 0.15, ease: 'easeOut' } });
                    if (!isMounted) break;

                    await new Promise(r => setTimeout(r, 400));
                    if (!isMounted) break;

                    // ── Transition to Screen 2 ──
                    setActiveScreen(1);
                    setConfigHighlight(false);
                    cursorControls.set({ x: 100, y: 100, opacity: 0 });

                    await new Promise(r => setTimeout(r, 600));
                    if (!isMounted) break;

                    // Code glow
                    setCodeGlow(true);
                    await new Promise(r => setTimeout(r, 800));
                    if (!isMounted) break;

                    // Cursor appears and moves to code
                    await cursorControls.start({ opacity: 1, transition: { duration: 0.3 } });
                    await cursorControls.start({
                        x: -10, y: 5,
                        transition: { type: 'spring', stiffness: 80, damping: 15 }
                    });
                    if (!isMounted) break;

                    // Highlight code (simulate copy)
                    setCodeHighlighted(true);
                    cursorControls.start({ scale: 0.85, transition: { duration: 0.1 } });
                    await new Promise(r => setTimeout(r, 120));
                    cursorControls.start({ scale: 1, transition: { duration: 0.15, ease: 'easeOut' } });
                    await new Promise(r => setTimeout(r, 600));
                    if (!isMounted) break;

                    // ── Transition to Screen 3 (Desktop Agent) ──
                    setActiveScreen(2);
                    setCodeHighlighted(false);
                    setCodeGlow(false);
                    cursorControls.set({ x: 100, y: 100, opacity: 0 });

                    await new Promise(r => setTimeout(r, 600));
                    if (!isMounted) break;

                    // Cursor appears and moves to input field
                    await cursorControls.start({ opacity: 1, transition: { duration: 0.3 } });
                    await cursorControls.start({
                        x: -20, y: -18,
                        transition: { type: 'spring', stiffness: 80, damping: 15 }
                    });
                    if (!isMounted) break;

                    // Click input
                    cursorControls.start({ scale: 0.85, transition: { duration: 0.1 } });
                    await new Promise(r => setTimeout(r, 120));
                    cursorControls.start({ scale: 1, transition: { duration: 0.15, ease: 'easeOut' } });
                    if (!isMounted) break;

                    // Type digits
                    await new Promise(r => setTimeout(r, 300));
                    await typeDigits(pairingCode, 140);
                    if (!isMounted) break;

                    // Cursor moves to "Pair & Connect"
                    await new Promise(r => setTimeout(r, 300));
                    await cursorControls.start({
                        x: -10, y: 48,
                        transition: { type: 'spring', stiffness: 80, damping: 15 }
                    });
                    if (!isMounted) break;

                    // Hover
                    setPairBtnHover(true);
                    await new Promise(r => setTimeout(r, 400));
                    if (!isMounted) break;

                    // Click
                    cursorControls.start({ scale: 0.85, transition: { duration: 0.1 } });
                    setPairBtnClick(true);
                    await new Promise(r => setTimeout(r, 150));
                    cursorControls.start({ scale: 1, transition: { duration: 0.2, ease: 'easeOut' } });
                    setPairBtnClick(false);
                    if (!isMounted) break;

                    // Success
                    await new Promise(r => setTimeout(r, 300));
                    setConnected(true);
                    setPairBtnHover(false);

                    // Fade cursor
                    await new Promise(r => setTimeout(r, 600));
                    await cursorControls.start({
                        opacity: 0, x: 100, y: 100,
                        transition: { duration: 0.6, ease: 'easeInOut' }
                    });

                    // Hold
                    await new Promise(r => setTimeout(r, 2000));
                }
            };

            runSequence();
        }

        return () => { isMounted = false; };
    }, [isInView, cursorControls]);

    // ── Screen transition variants ──
    const screenVariants = {
        enter: { opacity: 0, y: 20, scale: 0.97 },
        center: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -15, scale: 0.97 }
    };

    return (
        <div
            ref={ref}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fff',
                position: 'relative',
                padding: '28px 32px',
                userSelect: 'none',
                overflow: 'hidden'
            }}
        >
            {/* Dot background */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)',
                backgroundSize: '28px 28px',
                opacity: 0.3
            }} />

            {/* Screens */}
            <AnimatePresence mode="wait">
                {isReady && activeScreen === 0 && (
                    <motion.div
                        key="screen-start"
                        variants={screenVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            width: '100%',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        {/* Mini nav bar */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '24px',
                            paddingBottom: '10px',
                            borderBottom: '1px solid #f1f5f9'
                        }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.04em' }}>Organization Name</span>
                            <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Logout</span>
                        </div>

                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                            Start monitoring session
                        </h4>
                        <p style={{ fontSize: '0.72rem', color: '#64748b', margin: '0 0 20px', lineHeight: 1.5 }}>
                            Select a session config and start. The desktop agent will track allowed apps and websites.
                        </p>

                        {/* Config card */}
                        <div style={{
                            padding: '12px 16px',
                            borderRadius: '10px',
                            border: `1.5px solid ${configHighlight ? '#a855f7' : '#e2e8f0'}`,
                            background: configHighlight ? '#faf5ff' : '#fff',
                            boxShadow: configHighlight ? '0 0 12px rgba(168,85,247,0.15)' : '0 1px 2px rgba(0,0,0,0.04)',
                            transition: 'all 0.25s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            maxWidth: '260px'
                        }}>
                            {/* <Play size={14} color={configHighlight ? '#a855f7' : '#64748b'} fill={configHighlight ? '#a855f7' : 'none'} strokeWidth={2} /> */}
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111' }}>Student</span>
                        </div>
                    </motion.div>
                )}

                {isReady && activeScreen === 1 && (
                    <motion.div
                        key="screen-code"
                        variants={screenVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            width: '100%',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111', margin: '0 0 4px' }}>
                            Monitoring in progress
                        </h4>
                        <p style={{ fontSize: '0.7rem', color: '#64748b', margin: '0 0 20px' }}>
                            Config: <span style={{ fontWeight: 600 }}>Student</span>
                        </p>

                        {/* Pairing code card */}
                        <div style={{
                            padding: '20px',
                            borderRadius: '14px',
                            border: '1px solid #e2e8f0',
                            background: '#fefefe',
                            textAlign: 'center',
                            marginBottom: '16px'
                        }}>
                            <p style={{ fontSize: '0.68rem', color: '#94a3b8', margin: '0 0 10px' }}>
                                Enter this Pairing Code into your Desktop Agent:
                            </p>
                            <div style={{
                                fontSize: '2rem',
                                fontWeight: 800,
                                color: '#7c3aed',
                                letterSpacing: '0.25em',
                                padding: '4px 0',
                                position: 'relative'
                            }}>
                                <span style={{
                                    background: codeHighlighted ? '#f3e8ff' : 'transparent',
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    transition: 'background 0.2s ease'
                                }}>
                                    {pairingCode.split('').join(' ')}
                                </span>
                                {codeGlow && (
                                    <motion.div
                                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{
                                            position: 'absolute',
                                            inset: '-8px',
                                            background: 'radial-gradient(ellipse, rgba(168,85,247,0.12) 0%, transparent 70%)',
                                            borderRadius: '12px',
                                            pointerEvents: 'none',
                                            zIndex: -1
                                        }}
                                    />
                                )}
                            </div>
                            <p style={{ fontSize: '0.65rem', color: '#22c55e', margin: '6px 0 0', fontWeight: 500 }}>
                                Expires in 37s
                            </p>
                        </div>

                        {/* Copy hint */}
                        {codeHighlighted && (
                            <motion.div
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    gap: '6px', fontSize: '0.68rem', color: '#a855f7', fontWeight: 500
                                }}
                            >
                                <Copy size={12} /> Copied to clipboard
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {isReady && activeScreen === 2 && (
                    <motion.div
                        key="screen-agent"
                        variants={screenVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            width: '100%',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        {/* Agent header - logo stacked above text */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: '24px'
                        }}>
                            <img
                                src="/Grape.png"
                                alt="Grape"
                                style={{ width: '44px', height: '44px', marginBottom: '8px' }}
                            />
                            <span style={{
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                color: '#1a1a2e',
                                letterSpacing: '-0.01em'
                            }}>Grape</span>
                        </div>

                        {/* Pairing code input */}
                        <label style={{
                            fontSize: '0.7rem', fontWeight: 700, color: '#4b5563',
                            display: 'block', marginBottom: '8px',
                            letterSpacing: '0.08em', textTransform: 'uppercase'
                        }}>
                            Device Pairing Code
                        </label>
                        <div style={{
                            padding: '14px 20px',
                            borderRadius: '12px',
                            border: '1.5px solid #e5e7eb',
                            background: '#fafafa',
                            marginBottom: '20px',
                            fontSize: '1.15rem',
                            fontWeight: 500,
                            color: '#374151',
                            letterSpacing: '0.35em',
                            textAlign: 'center',
                            fontFamily: 'monospace'
                        }}>
                            {agentDigits.split('').join(' ')}
                        </div>

                        {/* Pair & Connect button - bright blue matching screenshot */}
                        <div style={{
                            padding: '12px 20px',
                            borderRadius: '12px',
                            background: pairBtnClick
                                ? '#1d4ed8'
                                : pairBtnHover
                                    ? '#2158d4'
                                    : '#2563eb',
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transform: pairBtnClick ? 'scale(0.97)' : pairBtnHover ? 'scale(1.02)' : 'scale(1)',
                            boxShadow: pairBtnHover
                                ? '0 6px 24px rgba(91,159,213,0.45)'
                                : '0 2px 8px rgba(91,159,213,0.2)',
                            transition: 'all 0.2s ease',
                            letterSpacing: '0.01em'
                        }}>
                            <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>$</span>
                            Pair & Connect
                        </div>

                        {/* Stop button */}
                        <div style={{
                            padding: '11px 20px',
                            borderRadius: '12px',
                            border: '1.5px solid #e5e7eb',
                            background: '#fefefe',
                            color: '#6b7280',
                            textAlign: 'center',
                            fontSize: '0.82rem',
                            fontWeight: 500,
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '7px'
                        }}>
                            <Square size={13} strokeWidth={2} color="#9ca3af" />
                            Stop
                        </div>

                        {/* Status message */}
                        <AnimatePresence>
                            {connected && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    style={{
                                        padding: '10px 14px',
                                        borderRadius: '10px',
                                        background: '#f0fdf4',
                                        border: '1px solid #bbf7d0',
                                        color: '#16a34a',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <CheckCircle2 size={14} strokeWidth={2.5} />
                                    Paired & Connected
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cursor */}
            <motion.div
                animate={cursorControls}
                initial={{ opacity: 0, x: 100, y: 100 }}
                style={{
                    position: 'absolute',
                    zIndex: 10,
                    pointerEvents: 'none',
                    willChange: 'transform, opacity',
                    left: '50%',
                    top: '50%',
                    marginTop: '-2px',
                    marginLeft: '-2px'
                }}
            >
                <svg
                    width="30"
                    height="30"
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
            </motion.div>
        </div>
    );
};

export default PairAgentAnimation;
