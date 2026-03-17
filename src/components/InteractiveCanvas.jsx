import React, { useRef, useEffect } from 'react';

const InteractiveCanvas = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const mouseParams = useRef({ x: 0, y: 0, active: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });

        const dpr = window.devicePixelRatio || 1;
        let animationFrameId;
        let canvasW = 0, canvasH = 0;

        const colors = [
            '#4285F4', // Blue
            '#EA4335', // Red
            '#FBBC04', // Yellow
            '#34A853', // Green
            '#7928CA', // Purple
            '#FF0080'  // Pink
        ];

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            canvasW = parent.clientWidth;
            canvasH = parent.clientHeight;
            canvas.width = canvasW * dpr;
            canvas.height = canvasH * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        class SwarmParticle {
            constructor() {
                this.x = Math.random() * canvasW;
                this.y = Math.random() * canvasH;
                this.vx = 0;
                this.vy = 0;
                this.baseSize = Math.random() * 2 + 1;
                this.size = this.baseSize;
                this.baseWidth = Math.random() * 40 + 20;
                this.width = this.baseWidth;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.baseAlpha = Math.random() * 0.4 + 0.2;
                this.alpha = 0;
                this.orbitRadiusX = Math.random() * 200 + 50;
                this.orbitRadiusY = Math.random() * 200 + 50;
                this.orbitSpeed = (Math.random() * 0.01 + 0.005) * (Math.random() < 0.5 ? 1 : -1);
                this.orbitAngle = Math.random() * Math.PI * 2;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.02;
                this.friction = Math.random() * 0.03 + 0.94;
                this.springEase = Math.random() * 0.005 + 0.005;
            }

            draw() {
                if (this.alpha <= 0.01) return;
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 25;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.beginPath();
                if (ctx.roundRect) {
                    ctx.roundRect(-this.width / 2, -this.size / 2, this.width, this.size, this.size / 2);
                } else {
                    ctx.rect(-this.width / 2, -this.size / 2, this.width, this.size);
                }
                ctx.fill();
                ctx.restore();
            }

            update(isActive) {
                this.orbitAngle += this.orbitSpeed;
                this.rotation += this.rotationSpeed;

                if (isActive) {
                    // Teleport if faded out OR too far from cursor (prevents slow-mo on re-entry)
                    const distToCursor = Math.abs(this.x - mouseParams.current.x) + Math.abs(this.y - mouseParams.current.y);
                    if (this.alpha < 0.15 || distToCursor > 500) {
                        this.x = mouseParams.current.x + (Math.random() - 0.5) * this.orbitRadiusX * 2;
                        this.y = mouseParams.current.y + (Math.random() - 0.5) * this.orbitRadiusY * 2;
                        this.vx = 0;
                        this.vy = 0;
                    }
                    this.alpha += (this.baseAlpha - this.alpha) * 0.05;
                    this.size += (this.baseSize - this.size) * 0.05;
                    this.width += (this.baseWidth - this.width) * 0.05;
                    const targetX = mouseParams.current.x + Math.cos(this.orbitAngle) * this.orbitRadiusX;
                    const targetY = mouseParams.current.y + Math.sin(this.orbitAngle) * this.orbitRadiusY;
                    const dx = targetX - this.x;
                    const dy = targetY - this.y;
                    this.vx += dx * this.springEase;
                    this.vy += dy * this.springEase;
                } else {
                    this.alpha += (0 - this.alpha) * 0.1;
                    this.size += (0 - this.size) * 0.1;
                    this.width += (0 - this.width) * 0.1;
                    this.vx += (this.orbitSpeed * 10 - this.vx) * 0.02;
                    this.vy += ((this.orbitSpeed > 0 ? 0.5 : -0.5) - this.vy) * 0.02;
                }

                this.vx *= this.friction;
                this.vy *= this.friction;
                this.x += this.vx;
                this.y += this.vy;
            }
        }

        const initParticles = () => {
            particles.current = [];
            const numberOfParticles = 45;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.current.push(new SwarmParticle());
            }
        };

        // Only animate when visible — IntersectionObserver for performance
        let isVisible = false;
        const observer = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0.05 }
        );
        observer.observe(canvas);

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (!isVisible) return; // Skip rendering entirely when off-screen

            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.fillRect(0, 0, canvasW, canvasH);

            for (let i = 0; i < particles.current.length; i++) {
                particles.current[i].update(mouseParams.current.active);
                particles.current[i].draw();
            }
        };

        const handleMouseMove = (e) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom &&
                e.clientX >= rect.left && e.clientX <= rect.right) {
                mouseParams.current.x = e.clientX - rect.left;
                mouseParams.current.y = e.clientY - rect.top;
                mouseParams.current.active = true;
            } else {
                mouseParams.current.active = false;
            }
        };

        const handleMouseLeave = () => {
            mouseParams.current.active = false;
        };

        resize();
        initParticles();

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                mixBlendMode: 'multiply'
            }}
        />
    );
};

export default InteractiveCanvas;
