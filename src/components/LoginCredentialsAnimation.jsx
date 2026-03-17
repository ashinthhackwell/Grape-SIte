import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Mail, Lock, Eye } from 'lucide-react';

const LoginCredentialsAnimation = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    // Animation controls
    const contentControls = useAnimation();
    const cursorControls = useAnimation();
    const signInBtnControls = useAnimation();
    const rippleControls = useAnimation();
    const emailFieldControls = useAnimation();
    const passwordFieldControls = useAnimation();

    // Text state for the typing animation
    const [emailText, setEmailText] = useState('');
    const [passwordDots, setPasswordDots] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const fullEmail = 'name@company.com';
    const fullPassword = '••••••••';

    const typeText = (text, setter, delay = 60) => {
        return new Promise((resolve) => {
            let i = 0;
            const interval = setInterval(() => {
                i++;
                setter(text.slice(0, i));
                if (i >= text.length) {
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
                    setEmailText('');
                    setPasswordDots('');
                    setEmailFocused(false);
                    setPasswordFocused(false);
                    cursorControls.set({ opacity: 0, x: 120, y: 120, scale: 1 });
                    rippleControls.set({ scale: 0, opacity: 0 });
                    signInBtnControls.set({
                        scale: 1,
                        boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)'
                    });
                    emailFieldControls.set({
                        borderColor: '#e2e8f0',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                    });
                    passwordFieldControls.set({
                        borderColor: '#e2e8f0',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                    });

                    // 0s → Login card fades in
                    await contentControls.start({
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.7, ease: 'easeOut' }
                    });
                    if (!isMounted) break;

                    // 0.6s → Cursor appears
                    await new Promise(r => setTimeout(r, 300));
                    await cursorControls.start({
                        opacity: 1,
                        transition: { duration: 0.3 }
                    });
                    if (!isMounted) break;

                    // 1.0s → Cursor moves to email field
                    await new Promise(r => setTimeout(r, 200));
                    await cursorControls.start({
                        x: -20,
                        y: -52,
                        transition: { type: 'spring', stiffness: 80, damping: 15 }
                    });
                    if (!isMounted) break;

                    // Click email field
                    cursorControls.start({ scale: 0.85, transition: { duration: 0.08 } });
                    setEmailFocused(true);
                    emailFieldControls.start({
                        borderColor: '#a855f7',
                        boxShadow: '0 0 0 3px rgba(168, 85, 247, 0.15)',
                        transition: { duration: 0.2 }
                    });
                    await new Promise(r => setTimeout(r, 100));
                    cursorControls.start({ scale: 1, transition: { duration: 0.15, ease: 'easeOut' } });
                    if (!isMounted) break;

                    // 1.2s → Email typing animation
                    await new Promise(r => setTimeout(r, 200));
                    await typeText(fullEmail, setEmailText, 55);
                    if (!isMounted) break;

                    // 2.0s → Cursor moves to password field
                    await new Promise(r => setTimeout(r, 200));
                    setEmailFocused(false);
                    emailFieldControls.start({
                        borderColor: '#e2e8f0',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                        transition: { duration: 0.2 }
                    });

                    await cursorControls.start({
                        x: -20,
                        y: 2,
                        transition: { type: 'spring', stiffness: 80, damping: 15 }
                    });
                    if (!isMounted) break;

                    // Click password field
                    cursorControls.start({ scale: 0.85, transition: { duration: 0.08 } });
                    setPasswordFocused(true);
                    passwordFieldControls.start({
                        borderColor: '#a855f7',
                        boxShadow: '0 0 0 3px rgba(168, 85, 247, 0.15)',
                        transition: { duration: 0.2 }
                    });
                    await new Promise(r => setTimeout(r, 100));
                    cursorControls.start({ scale: 1, transition: { duration: 0.15, ease: 'easeOut' } });
                    if (!isMounted) break;

                    // 2.2s → Password dots appear
                    await new Promise(r => setTimeout(r, 200));
                    await typeText(fullPassword, setPasswordDots, 70);
                    if (!isMounted) break;

                    // Deactivate password field
                    setPasswordFocused(false);
                    passwordFieldControls.start({
                        borderColor: '#e2e8f0',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                        transition: { duration: 0.2 }
                    });

                    // 3.0s → Cursor moves to Sign In button
                    await new Promise(r => setTimeout(r, 200));
                    await cursorControls.start({
                        x: -10,
                        y: 78,
                        transition: { type: 'spring', stiffness: 80, damping: 15 }
                    });
                    if (!isMounted) break;

                    // 3.3s → Hover effect on Sign In button
                    signInBtnControls.start({
                        scale: 1.03,
                        boxShadow: '0 8px 30px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3)',
                        transition: { duration: 0.3, ease: 'easeOut' }
                    });

                    await new Promise(r => setTimeout(r, 400));
                    if (!isMounted) break;

                    // 3.6s → Click animation (smooth, not bouncy)
                    cursorControls.start({ scale: 0.85, transition: { duration: 0.1 } });
                    signInBtnControls.start({
                        scale: 0.97,
                        boxShadow: '0 2px 10px rgba(168, 85, 247, 0.2)',
                        transition: { duration: 0.12, ease: 'easeInOut' }
                    });

                    await new Promise(r => setTimeout(r, 150));
                    if (!isMounted) break;

                    // 4.0s → Glow pulse (subtle)
                    cursorControls.start({ scale: 1, transition: { duration: 0.2, ease: 'easeOut' } });

                    rippleControls.start({
                        scale: [0, 2],
                        opacity: [0.4, 0],
                        transition: { duration: 0.6, ease: 'easeOut' }
                    });

                    signInBtnControls.start({
                        scale: 1.04,
                        boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)',
                        transition: { duration: 0.3, ease: 'easeInOut' }
                    });

                    await new Promise(r => setTimeout(r, 600));
                    if (!isMounted) break;

                    // Return to idle
                    signInBtnControls.start({
                        scale: 1,
                        boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)',
                        transition: { duration: 0.5, ease: 'easeInOut' }
                    });

                    await cursorControls.start({
                        opacity: 0,
                        x: 120,
                        y: 120,
                        transition: { duration: 0.6, ease: 'easeInOut' }
                    });

                    await new Promise(r => setTimeout(r, 1500));
                }
            };

            runSequence();
        }

        return () => { isMounted = false; };
    }, [isInView, contentControls, cursorControls, signInBtnControls, rippleControls, emailFieldControls, passwordFieldControls]);

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
                padding: '32px 36px',
                userSelect: 'none',
                overflow: 'hidden'
            }}
        >
            {/* Background Pattern */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(#f3e8ff 1.5px, transparent 1.5px)',
                backgroundSize: '28px 28px',
                opacity: 0.35
            }} />

            {/* Login Content - directly fills parent card */}
            <motion.div
                animate={contentControls}
                style={{
                    width: '100%',
                    position: 'relative',
                    zIndex: 1,
                    opacity: 0
                }}
            >
                {/* Title */}
                <h4 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#111',
                    margin: '0 0 6px',
                    letterSpacing: '-0.02em'
                }}>
                    Sign in to your account
                </h4>
                <p style={{
                    fontSize: '0.8rem',
                    color: '#94a3b8',
                    margin: '0 0 24px',
                    fontWeight: 400
                }}>
                    Welcome back to Grape
                </p>

                {/* Email Field */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#374151',
                        display: 'block',
                        marginBottom: '6px',
                        letterSpacing: '0.02em'
                    }}>
                        Work Email
                    </label>
                    <motion.div
                        animate={emailFieldControls}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 14px',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            background: emailFocused ? '#fefefe' : '#f8fafc',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                            transition: 'background 0.2s ease'
                        }}
                    >
                        <Mail size={16} color="#94a3b8" strokeWidth={2} />
                        <div style={{
                            fontSize: '0.85rem',
                            color: emailText ? '#111' : '#cbd5e1',
                            fontWeight: 400,
                            flex: 1,
                            minHeight: '20px',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <span>{emailText || 'you@company.com'}</span>
                            {emailFocused && (
                                <motion.div
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity }}
                                    style={{
                                        width: '1.5px',
                                        height: '16px',
                                        background: '#a855f7',
                                        borderRadius: '1px',
                                        marginLeft: '1px',
                                        flexShrink: 0
                                    }}
                                />
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Password Field */}
                <div style={{ marginBottom: '10px' }}>
                    <label style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#374151',
                        display: 'block',
                        marginBottom: '6px',
                        letterSpacing: '0.02em'
                    }}>
                        Password
                    </label>
                    <motion.div
                        animate={passwordFieldControls}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 14px',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            background: passwordFocused ? '#fefefe' : '#f8fafc',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                            transition: 'background 0.2s ease'
                        }}
                    >
                        <Lock size={16} color="#94a3b8" strokeWidth={2} />
                        <div style={{
                            fontSize: '0.85rem',
                            color: passwordDots ? '#111' : '#cbd5e1',
                            fontWeight: 400,
                            flex: 1,
                            minHeight: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            letterSpacing: passwordDots ? '2px' : '0'
                        }}>
                            <span>{passwordDots || 'Enter password'}</span>
                            {passwordFocused && (
                                <motion.div
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity }}
                                    style={{
                                        width: '1.5px',
                                        height: '16px',
                                        background: '#a855f7',
                                        borderRadius: '1px',
                                        marginLeft: '1px',
                                        flexShrink: 0
                                    }}
                                />
                            )}
                        </div>
                        <Eye size={16} color="#cbd5e1" strokeWidth={2} />
                    </motion.div>
                </div>

                {/* Forgot password */}
                <div style={{
                    textAlign: 'right',
                    marginBottom: '20px'
                }}>
                    <span style={{
                        fontSize: '0.72rem',
                        color: '#a855f7',
                        fontWeight: 500,
                        cursor: 'default'
                    }}>
                        Forgot password?
                    </span>
                </div>

                {/* Sign In Button */}
                <motion.div
                    animate={signInBtnControls}
                    style={{
                        background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                        color: '#fff',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)',
                        willChange: 'transform, box-shadow',
                        letterSpacing: '0.01em'
                    }}
                >
                    Sign In

                    {/* Ripple Effect */}
                    <motion.div
                        animate={rippleControls}
                        initial={{ scale: 0, opacity: 0 }}
                        style={{
                            position: 'absolute',
                            width: '200px',
                            height: '200px',
                            background: 'rgba(255, 255, 255, 0.35)',
                            borderRadius: '50%',
                            top: '50%',
                            left: '50%',
                            marginLeft: '-100px',
                            marginTop: '-100px',
                            pointerEvents: 'none'
                        }}
                    />
                </motion.div>

                {/* Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    margin: '20px 0'
                }}>
                    {/* <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} /> */}
                    {/* <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500 }}>New to Grape?</span> */}
                    {/* <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} /> */}
                </div>

                {/* Register Link */}
                <div style={{
                    textAlign: 'center',
                    fontSize: '0.78rem',
                    color: '#64748b',
                    fontWeight: 500
                }}>
                    <span style={{ color: '#a855f7', fontWeight: 600 }}>Register Organization</span>
                </div>
            </motion.div>

            {/* Animated Cursor */}
            <motion.div
                initial={{ opacity: 0, x: 120, y: 120 }}
                animate={cursorControls}
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
                    width="32"
                    height="32"
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

export default LoginCredentialsAnimation;
