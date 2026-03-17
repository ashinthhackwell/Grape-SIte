import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Apple, Monitor, ArrowRight } from 'lucide-react';
import InteractiveCanvas from './InteractiveCanvas';

const Typewriter = ({ text, speed = 40, onDone }) => {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        let i = 0;
        setDisplayed('');
        setDone(false);
        const interval = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(interval);
                setDone(true);
                if (onDone) onDone();
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return (
        <span>
            {displayed}
            <span
                style={{
                    display: 'inline-block',
                    width: '3px',
                    height: '1em',
                    background: '#111',
                    marginLeft: '4px',
                    verticalAlign: 'text-bottom',
                    animation: done ? 'cursorBlink 1s step-end infinite' : 'none',
                    opacity: 1
                }}
            />
        </span>
    );
};

const FinalDownload = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
    const [textDone, setTextDone] = useState(false);

    return (
        <section ref={sectionRef} style={{
            padding: '260px 0 200px',
            minHeight: '110vh',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            background: 'transparent'
        }}>
            <div className="dot-background" />

            {/* Interactive particle canvas — same as Hero section */}
            <InteractiveCanvas />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>
                <h2 style={{
                    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    marginBottom: '40px',
                    lineHeight: 1.3,
                    color: '#111',
                    maxWidth: '500px'
                }}>
                    {isInView ? (
                        <Typewriter
                            text="Download Grape for Windows"
                            speed={50}
                            onDone={() => setTextDone(true)}
                        />
                    ) : null}
                </h2>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={textDone ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                        display: 'flex',
                        gap: '24px',
                        flexWrap: 'wrap',
                        opacity: textDone ? undefined : 0
                    }}
                >
                    <motion.a
                        href="#"
                        className="premium-glow-btn"
                        whileHover={{ scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{ color: '#fff' }}
                    >
                        <div className="premium-glow-btn-inner" style={{ background: '#111', padding: '16px 36px' }}>
                            <Monitor size={18} />
                            <span>Download for Windows</span>
                        </div>
                    </motion.a>

                    <motion.a
                        href="#"
                        className="premium-glow-btn"
                        whileHover={{ scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{ color: '#111' }}
                    >
                        <div className="premium-glow-btn-inner" style={{ background: '#fff', padding: '16px 36px', border: '1px solid rgba(0,0,0,0.1)' }}>
                            <Apple size={18} />
                            <span>Download for Mac</span>
                        </div>
                    </motion.a>
                </motion.div>
            </div>

            {/* Blinking cursor keyframes */}
            <style>{`
                @keyframes cursorBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </section>
    );
};

export default FinalDownload;
