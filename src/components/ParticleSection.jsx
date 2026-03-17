import React, { useEffect, useRef } from 'react';

const ParticleSection = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    // Use refs instead of state to avoid re-triggering useEffect on every mouse move
    const mousePos = useRef({ x: -1000, y: -1000 });
    const isHovered = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        let time = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const particles = [];
        const spacing = 45;

        for (let x = 0; x <= canvas.width + spacing; x += spacing) {
            for (let y = 0; y <= canvas.height + spacing; y += spacing) {
                particles.push({ base_x: x, base_y: y });
            }
        }

        const render = () => {
            time += 0.03;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';

            particles.forEach((p) => {
                let x = p.base_x + Math.sin(time + p.base_y * 0.05) * 15;
                let y = p.base_y + Math.cos(time + p.base_x * 0.05) * 15;

                if (isHovered.current) {
                    const dx = x - mousePos.current.x;
                    const dy = y - mousePos.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 200; // Wide interaction radius

                    if (dist < maxDist) {
                        const force = (maxDist - dist) / maxDist;
                        x += (dx / dist) * force * 50; // Smooth repulsion force
                        y += (dy / dist) * force * 50;

                        // Draw premium iridescent connecting lines
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(mousePos.current.x, mousePos.current.y);

                        // Subtle animated rainbow gradient
                        const hue = (time * 30 - dist) % 360;
                        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${force * 0.4})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }

                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mousePos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    return (
        <section
            ref={containerRef}
            onMouseEnter={() => isHovered.current = true}
            onMouseLeave={() => isHovered.current = false}
            onMouseMove={handleMouseMove}
            style={{ height: '700px', width: '100%', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,0.03)', borderBottom: '1px solid rgba(0,0,0,0.03)' }}
        >
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '800px',
                background: 'radial-gradient(circle, rgba(0,0,0,0.015) 0%, transparent 70%)',
                zIndex: 0,
                pointerEvents: 'none',
            }} />

            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    zIndex: 1
                }}
            />

            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none',
                zIndex: 2
            }}>
                <h2 style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px', color: '#111' }}>
                    Interactive Ecosystem
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '20px', fontWeight: 400 }}>
                    Hover the canvas to experience fluid motion.
                </p>
            </div>
        </section>
    );
};

export default ParticleSection;
