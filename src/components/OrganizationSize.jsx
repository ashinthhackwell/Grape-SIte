import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import GrapeParticles from './GrapeParticles';

const OrganizationSize = () => {
    const sectionRef = useRef(null);
    const teamsRef = useRef(null);
    const enterpriseRef = useRef(null);

    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const [hoverState, setHoverState] = useState('none');
    const [cardRects, setCardRects] = useState({ teams: null, enterprise: null });

    useEffect(() => {
        const measure = () => {
            if (!sectionRef.current || !teamsRef.current || !enterpriseRef.current) return;
            const sRect = sectionRef.current.getBoundingClientRect();
            const tRect = teamsRef.current.getBoundingClientRect();
            const eRect = enterpriseRef.current.getBoundingClientRect();

            setCardRects({
                teams: {
                    x: tRect.left - sRect.left + tRect.width / 2,
                    y: tRect.top - sRect.top + tRect.height / 2
                },
                enterprise: {
                    x: eRect.left - sRect.left + eRect.width / 2,
                    y: eRect.top - sRect.top + eRect.height / 2
                }
            });
        };

        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: -1000, y: -1000 });
        setHoverState('none');
    };

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <section
            id="organization-size-section"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                minHeight: isMobile ? 'auto' : '100vh',
                padding: isMobile ? '80px 20px' : '20px 24px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ffffff',
                borderTop: '1px solid rgba(0,0,0,0.04)'
            }}
        >

            <GrapeParticles mousePos={mousePos} hoverState={hoverState} cardRects={cardRects} />

            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: isMobile ? '20px' : '40px',
                width: '100%',
                maxWidth: '1200px',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Left Area (For Developers) */}
                <div
                    ref={teamsRef}
                    onMouseEnter={() => setHoverState('teams')}
                    onMouseLeave={() => setHoverState('none')}
                    style={{
                        padding: isMobile ? '60px 20px' : '120px 40px',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <div style={{
                        fontSize: '0.875rem',
                        padding: '6px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '999px',
                        color: '#4b5563',
                        marginBottom: '32px',
                        background: '#fff'
                    }}>
                        Available at no charge
                    </div>

                    <h3 style={{ fontSize: isMobile ? '2.5rem' : '3rem', fontWeight: 400, marginBottom: '8px', letterSpacing: '-0.04em', color: '#111' }}>
                        For developers
                    </h3>
                    <p style={{ color: '#4b5563', marginBottom: '48px', fontSize: isMobile ? '1.75rem' : '2.5rem', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.2 }}>
                        Achieve new heights
                    </p>

                    <a href="#" className="premium-glow-btn" style={{
                        color: '#fff',
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '16px',
                        borderRadius: '999px',
                        width: isMobile ? '100%' : 'auto'
                    }}>
                        <div className="premium-glow-btn-inner" style={{ background: '#111', padding: '16px 36px', borderRadius: '999px', width: '100%' }}>
                            <span>Download</span>
                        </div>
                    </a>
                </div>

                {/* Right Area (For Organizations) */}
                <div
                    ref={enterpriseRef}
                    onMouseEnter={() => setHoverState('enterprise')}
                    onMouseLeave={() => setHoverState('none')}
                    style={{
                        padding: isMobile ? '60px 20px' : '120px 40px',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <div style={{
                        fontSize: '0.875rem',
                        padding: '6px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '999px',
                        color: '#4b5563',
                        marginBottom: '32px',
                        background: '#fff'
                    }}>
                        Coming soon
                    </div>

                    <h3 style={{ fontSize: isMobile ? '2.5rem' : '3rem', fontWeight: 400, marginBottom: '8px', letterSpacing: '-0.04em', color: '#111' }}>
                        For organizations
                    </h3>
                    <p style={{ color: '#4b5563', marginBottom: '48px', fontSize: isMobile ? '1.75rem' : '2.5rem', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.2 }}>
                        Level up your entire team
                    </p>

                    <a href="#" className="premium-glow-btn" style={{
                        color: '#111',
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '16px',
                        borderRadius: '999px',
                        width: isMobile ? '100%' : 'auto'
                    }}>
                        <div className="premium-glow-btn-inner" style={{ background: '#fff', padding: '16px 36px', borderRadius: '999px', width: '100%' }}>
                            <span>Notify me</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default OrganizationSize;
