import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable scroll-triggered reveal wrapper.
 * Elements fade in + slide up when entering viewport,
 * and reverse when scrolling back up (once: false).
 */
const ScrollReveal = ({
    children,
    delay = 0,
    duration = 0.7,
    y = 30,
    style = {},
    className = '',
    margin = '-60px'
}) => (
    <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin }}
        transition={{
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1]
        }}
        style={style}
        className={className}
    >
        {children}
    </motion.div>
);

export default ScrollReveal;
