import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const useBreakpoint = () => {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    useEffect(() => {
        const handle = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, []);
    return { isMobile: width <= 640, isTablet: width <= 768, isSmallLaptop: width <= 1024, width };
};

const foundersData = [
    {
        role: "Frontend\ndeveloper",
        title: "Frontend developer",
        description: "Streamline UX development by leveraging browser-in-browser observability, bridging the gap between design and production code instantly.",
        imageUrl: "/Grape-Founder.webp"
    },
    {
        role: "Backend\narchitect",
        title: "Backend architect",
        description: "Sarah Chen architected the zero-latency telemetry engine that powers Workspace Monitoring's instant insights, ensuring massive scale without performance drops.",
        imageUrl: "/Grape-Co-Founder.webp"
    }
];

const TypewriterText = ({ text, isActive }) => {
    const textRef = useRef(null);

    useEffect(() => {
        let controls;
        if (textRef.current) {
            controls = animate(isActive ? 0 : text.length, isActive ? text.length : 0, {
                duration: isActive ? 1.8 : 1.0,
                ease: "easeInOut", // Buttery smooth acceleration/deceleration curve rather than harsh linear ticks
                onUpdate: (latest) => {
                    if (textRef.current) {
                        textRef.current.textContent = text.slice(0, Math.floor(latest));
                    }
                }
            });
        }
        return () => controls && controls.stop();
    }, [isActive, text]);

    return (
        <span style={{ position: 'relative' }}>
            <span ref={textRef}></span>
            {isActive && (
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                    style={{
                        display: 'inline-block',
                        background: 'linear-gradient(180deg, #4285F4 0%, #34A853 33%, #FBBC05 66%, #EA4335 100%)',
                        marginLeft: '8px',
                        width: '4px', // Very thin elegant cursor
                        height: '0.85em',
                        verticalAlign: 'middle',
                        transform: 'translateY(-8%)',
                        borderRadius: '2px'
                    }}
                />
            )}
        </span >
    );
};

const Founders = () => {
    const scrollRef = useRef(null);
    const isScrollingProgrammatically = useRef(false);
    const scrollTimeout = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHoveringImage, setIsHoveringImage] = useState(false);
    const { isMobile, isTablet } = useBreakpoint();
    const pLeft = isMobile ? 24 : 100;

    // Smooth cursor globally tracking viewport mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cursorX = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.5 });
    const cursorY = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.5 });

    const handleMouseMoveGlobal = (e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const handleScroll = () => {
        if (!scrollRef.current || isScrollingProgrammatically.current) return;

        const scrollLeft = scrollRef.current.scrollLeft;
        const childWidth = scrollRef.current.children[0]?.offsetWidth || 0;
        const totalWidthPerItem = childWidth + 32; // width + gap

        // When scrollLeft is 0, we are on index 0. 
        // We add 100 because the first item has no preceding scrollMargin,
        // but the subsequent items are staggered by the 100px scrollMargin offset.
        if (totalWidthPerItem > 0) {
            const adjustedScroll = Math.max(0, scrollLeft);
            const newIndex = Math.round(adjustedScroll / totalWidthPerItem);

            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < foundersData.length) {
                setCurrentIndex(newIndex);
            }
        }
    };

    const scrollTo = (index) => {
        if (!scrollRef.current) return;
        const targetChild = scrollRef.current.children[index];
        if (targetChild) {
            isScrollingProgrammatically.current = true;
            setCurrentIndex(index);

            const requiredScroll = targetChild.offsetLeft - pLeft;

            scrollRef.current.scrollTo({
                left: requiredScroll,
                behavior: 'smooth'
            });

            // Unlock passive scroll tracking slightly after the smooth scroll finishes (~600ms)
            clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                isScrollingProgrammatically.current = false;
            }, 600);
        }
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => clearTimeout(scrollTimeout.current);
    }, []);

    const activeFounder = foundersData[currentIndex];

    return (
        <section
            style={{ padding: '60px 0 100px 0', position: 'relative', overflow: 'hidden' }}
            onMouseMove={handleMouseMoveGlobal}
        >
            {/* Custom Mouse Cursor overlay */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: isHoveringImage ? 1 : 0, scale: isHoveringImage ? 1 : 0.5 }}
                transition={{ duration: 0.2 }}
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    x: cursorX, y: cursorY,
                    translateX: '-50%', translateY: '-50%', // Centering right on the mouse tip
                    pointerEvents: 'none',
                    zIndex: 9999
                }}
            >
                <div style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderRadius: '999px', padding: '12px 24px', display: 'flex', gap: '8px', alignItems: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                    <Play size={14} fill="#111" color="#111" />
                    <span style={{ fontWeight: 500, color: '#111', fontSize: '1rem', whiteSpace: 'nowrap' }}>Play snippet</span>
                </div>
            </motion.div>

            {/* CSS to hide scrollbar */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scroll::-webkit-scrollbar { display: none; }
                .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />

            <div style={{ width: '100%' }}>
                {/* Initial Entry Animation from Right */}
                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Native Horizontal Scroll Container */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="hide-scroll"
                        style={{
                            display: 'flex',
                            gap: isMobile ? '16px' : '32px',
                            overflowX: 'auto',
                            paddingBottom: '32px',
                            scrollSnapType: 'x mandatory',
                            paddingLeft: `${pLeft}px`,
                            paddingRight: '100vw'
                        }}
                    >
                        {foundersData.map((founder, idx) => {
                            const isActive = currentIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    style={{
                                        flex: isMobile ? '0 0 min(85vw, 800px)' : '0 0 min(75vw, 800px)',
                                        scrollSnapAlign: 'start',
                                        scrollMarginLeft: `${pLeft}px`
                                    }}
                                >
                                    {/* The Image Box */}
                                    <motion.div
                                        animate={{
                                            scale: 1,
                                            opacity: 1
                                        }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            aspectRatio: '16/9',
                                            maxHeight: '480px',
                                            borderRadius: '32px',
                                            overflow: 'hidden',
                                            backgroundColor: '#e5e7eb',
                                            cursor: 'none' // Hide native cursor when inside
                                        }}
                                        onMouseEnter={() => setIsHoveringImage(true)}
                                        onMouseLeave={() => setIsHoveringImage(false)}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                            style={{
                                                position: 'absolute',
                                                top: 0, left: 0, right: 0, bottom: 0,
                                                backgroundImage: `url(${founder.imageUrl})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                zIndex: 0
                                            }}
                                        />

                                        {/* Overlaid Animated Role Text */}
                                        <div style={{
                                            position: 'absolute',
                                            bottom: isMobile ? '24px' : '48px',
                                            left: isMobile ? '24px' : '48px',
                                            height: isMobile ? '80px' : '100px', // Adjusted for smaller text
                                            color: '#ffffff',
                                            fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
                                            fontWeight: 400, // Reduced from 600 for a much thinner, elegant look
                                            lineHeight: 1.1,
                                            letterSpacing: '-0.04em',
                                            whiteSpace: 'pre-line',
                                            zIndex: 2,
                                            textShadow: '0 4px 16px rgba(0,0,0,0.2)',
                                            display: 'flex',
                                            alignItems: 'flex-start'
                                        }}>
                                            <TypewriterText text={founder.role} isActive={isActive} />
                                        </div>

                                        {/* Subtle gradient to ensure text readability */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
                                            zIndex: 1,
                                            pointerEvents: 'none'
                                        }} />
                                    </motion.div>
                                </div>
                            )
                        })}
                    </div>

                    <div
                        style={{
                            width: '100%',
                            paddingLeft: `${pLeft}px`,
                            paddingRight: `max(${pLeft}px, calc(50% - 626px))`,
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            justifyContent: 'space-between',
                            alignItems: isMobile ? 'flex-start' : 'flex-start',
                            gap: isMobile ? '32px' : '24px'
                        }}
                    >
                        <div style={{ maxWidth: '600px', position: 'relative' }}>
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>
                                        {activeFounder.title}
                                    </h4>
                                    <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.5, margin: 0 }}>
                                        {activeFounder.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Arrows */}
                        <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
                            <div
                                onClick={() => scrollTo(Math.max(0, currentIndex - 1))}
                                style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s', opacity: currentIndex === 0 ? 0.3 : 1 }}
                                onMouseEnter={(e) => { if (currentIndex !== 0) e.currentTarget.style.background = '#f9fafb' }}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                            >
                                <ChevronLeft size={20} color="#111827" />
                            </div>
                            <div
                                onClick={() => scrollTo(Math.min(foundersData.length - 1, currentIndex + 1))}
                                style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s', opacity: currentIndex === foundersData.length - 1 ? 0.3 : 1 }}
                                onMouseEnter={(e) => { if (currentIndex !== foundersData.length - 1) e.currentTarget.style.background = '#f9fafb' }}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                            >
                                <ChevronRight size={20} color="#111827" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Founders;
