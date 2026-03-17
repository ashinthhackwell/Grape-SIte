import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Apple, Monitor } from 'lucide-react';
import InteractiveCanvas from './InteractiveCanvas';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
    const opacityGrid = useTransform(scrollY, [0, 300], [1, 0]);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [typedText, setTypedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    // Minimalist two-line text payload (using non-breaking space to force single line)
    const fullText = "GRAPE";
    const highlightText = "See what your team does :) ";

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) - 0.5,
                y: (e.clientY / window.innerHeight) - 0.5,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Typewriter Effect logic
        const totalText = `${fullText}\n${highlightText}`;
        let interval;

        // Start typing slightly after page load
        const typingTimer = setTimeout(() => {
            let currentIndex = 0;
            interval = setInterval(() => {
                if (currentIndex <= totalText.length) {
                    setTypedText(totalText.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    setIsTyping(false); // Stop blinking cursor
                }
            }, 50); // fast modern typing speed
        }, 400);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(typingTimer);
            if (interval) clearInterval(interval);
        };
    }, []);

    // Split the typed output into the two visual lines
    const typedLine1 = typedText.split('\n')[0] || "";
    const typedLine2 = typedText.split('\n')[1] || "";
    const isTypingLine1 = isTyping && !typedText.includes('\n');
    const isTypingLine2 = isTyping && typedText.includes('\n');

    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '80px var(--section-padding-x) 0',
            position: 'relative',
            overflow: 'hidden',
            background: 'transparent'
        }}>
            {/* Beautiful Custom Interactive Node Canvas with Physics */}
            <InteractiveCanvas />

            <motion.div
                style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '850px', y: y1 }}
            >
                <motion.div>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                            fontWeight: 500, // Leaner modern typography weight (Inter/Geist)
                            letterSpacing: '0.05em', // Elegantly tight
                            lineHeight: 1,
                            marginBottom: '0',
                            color: '#111',
                            display: 'inline-block'
                        }}
                    >
                        {typedLine1}
                        {isTypingLine1 && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    display: 'inline-block',
                                    width: '4px',
                                    height: 'clamp(2.5rem, 5vw, 4.5rem)',
                                    background: 'linear-gradient(to bottom, #2a8af6, #a853ba, #e92a67)',
                                    marginLeft: '8px',
                                    verticalAlign: 'middle'
                                }}
                            />
                        )}
                        <span className="gradient-text" style={{ display: 'block', marginTop: '4px', paddingLeft: window.innerWidth < 768 ? "0" : "40px", fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', whiteSpace: 'nowrap', background: 'linear-gradient(to right bottom, #111, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {typedLine2}
                            {isTypingLine2 && (
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                    style={{
                                        display: 'inline-block',
                                        width: '3px',
                                        height: 'clamp(1.2rem, 2.5vw, 2rem)',
                                        background: 'linear-gradient(to bottom, #2a8af6, #a853ba, #e92a67)',
                                        marginLeft: '4px',
                                        verticalAlign: 'middle',
                                        WebkitTextFillColor: 'initial'
                                    }}
                                />
                            )}
                        </span>
                    </motion.h1>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isTyping ? 0 : 1, y: isTyping ? 20 : 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        display: 'flex',
                        gap: 'clamp(12px, 3vw, 24px)',
                        justifyContent: 'center',
                        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                        alignItems: 'center',
                        marginTop: '40px',
                        marginBottom: '100px',
                        pointerEvents: isTyping ? 'none' : 'auto',
                        width: '100%'
                    }}
                >
                    <motion.a
                        href="#"
                        className="premium-glow-btn"
                        whileHover={{ scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{ color: '#fff', width: window.innerWidth < 480 ? '100%' : 'auto' }}
                    >
                        <div className="premium-glow-btn-inner" style={{ background: '#111', padding: '16px clamp(24px, 5vw, 36px)', width: '100%' }}>
                            <Monitor size={18} />
                            <span>Download for Windows</span>
                        </div>
                    </motion.a>

                    <motion.a
                        href="#"
                        className="premium-glow-btn"
                        whileHover={{ scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{ color: '#111', width: window.innerWidth < 480 ? '100%' : 'auto' }}
                    >
                        <div className="premium-glow-btn-inner" style={{ background: '#fff', padding: '16px clamp(24px, 5vw, 36px)', border: '1px solid rgba(0,0,0,0.1)', width: '100%' }}>
                            <Apple size={18} />
                            <span>Download for Mac</span>
                        </div>
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
};
const btnStylePrimary = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 28px', /* Sleeker padding */
    borderRadius: '100px',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '15px', /* Sleeker font size */
    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
};

const btnStyleSecondary = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 28px',
    borderRadius: '100px',
    color: '#111',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '15px',
    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
    border: '1px solid rgba(0,0,0,0.08)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
};

export default Hero;
