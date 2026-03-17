import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Individual character with smooth scroll-driven reveal + subtle bounce
const ScrollChar = ({ char, index, total, scrollYProgress }) => {
    // Wider overlap between characters for a feathered, smooth edge
    const spread = 0.3; // How much characters overlap (higher = smoother edge)
    const charStart = Math.max(0, (index / total) - spread / 2);
    const charEnd = Math.min(1, ((index + 1) / total) + spread / 2);

    const opacity = useTransform(scrollYProgress, [charStart, charEnd], [0.12, 1]);
    const color = useTransform(scrollYProgress, [charStart, charEnd], ['#d1d5db', '#111827']);

    // Subtle Y bounce — letter lifts slightly as it reveals, then settles
    const charMid = (charStart + charEnd) / 2;
    const y = useTransform(
        scrollYProgress,
        [charStart, charMid, charEnd],
        [4, -2, 0]  // starts low, bounces up slightly, settles to 0
    );

    return (
        <motion.span style={{
            opacity,
            color,
            y,
            display: 'inline-block',
            willChange: 'opacity, color, transform'
        }}>
            {char === ' ' ? '\u00A0' : char}
        </motion.span>
    );
};

const Mission = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    });

    const quoteText = "\"The right 5 can do the work of 50\"";
    const chars = quoteText.split('');

    // Attribution fade — appears after most letters are revealed
    const attrOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
    const attrY = useTransform(scrollYProgress, [0.7, 1], [10, 0]);

    return (
        <section
            ref={containerRef}
            style={{
                padding: '160px 24px 200px 24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#fafafa',
                minHeight: '350px'
            }}
        >
            <div style={{
                maxWidth: '850px',
                width: '100%',
                textAlign: 'center'
            }}>
                <p style={{
                    fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                    margin: 0
                }}>
                    {chars.map((char, i) => (
                        <ScrollChar
                            key={i}
                            char={char}
                            index={i}
                            total={chars.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </p>
                <motion.p style={{
                    display: "flex",
                    alignItems: "right",
                    justifyContent: "right",
                    fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
                    fontWeight: 400,
                    color: '#9d00ff46',
                    marginTop: '24px',
                    letterSpacing: '0.02em',
                    opacity: attrOpacity,
                    y: attrY
                }}>
                    — Grape
                </motion.p>
            </div>
        </section>
    );
};

export default Mission;
