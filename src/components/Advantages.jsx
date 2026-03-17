import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ShieldAlert, Activity, Users, Clock, Cpu, Server, Lock } from 'lucide-react';

const Advantages = () => {
    const advantages = [
        {
            title: "Zero-Latency Telemetry",
            description: "Monitor every pulse of your digital environment instantly. High-fidelity telemetry provides uncompromised visibility into user behavior and system health.",
            reverse: false,
            id: 1
        },
        {
            title: "Unified Command Center",
            description: "Control your entire infrastructure from a single pane of glass. Contextual insights natively integrated into a frictionless workflow.",
            reverse: true,
            id: 2
        },
        {
            title: "Edge-to-Origin Security",
            description: "Enterprise-grade encryption keeps your organization's data strictly confidential. Identify and mitigate threats before they reach the core.",
            reverse: false,
            id: 3
        }
    ];

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <section style={{
            padding: isMobile ? '60px 20px 80px 20px' : '40px 24px 160px 24px',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* The global background overrides this but keeping relative positioning */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '80px' : '240px',
                position: 'relative',
                zIndex: 1
            }}>
                {advantages.map((adv, idx) => (
                    <AdvantageRow key={idx} {...adv} isMobile={isMobile} />
                ))}
            </div>
        </section>
    );
};

const AdvantageRow = ({ title, description, reverse, id, isMobile }) => {
    const x = useMotionValue(200);
    const y = useMotionValue(200);

    const rotateX = useTransform(y, [0, 400], [5, -5]);
    const rotateY = useTransform(x, [0, 400], [-5, 5]);

    function handleMouse(event) {
        if (isMobile) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : (reverse ? 'row-reverse' : 'row'),
            alignItems: 'center',
            gap: isMobile ? '40px' : '100px',
            flexWrap: 'wrap'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ flex: isMobile ? '1 1 100%' : '1 1 400px', textAlign: isMobile ? 'center' : 'left' }}
            >
                <h3 style={{
                    fontSize: isMobile ? '2.25rem' : 'clamp(2.5rem, 4vw, 3.25rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    marginBottom: '24px',
                    color: '#111827',
                    lineHeight: 1.1
                }}>
                    {title}
                </h3>
                <p style={{ color: '#4b5563', fontSize: isMobile ? '1.1rem' : '1.25rem', lineHeight: 1.6, fontWeight: 400 }}>
                    {description}
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ flex: isMobile ? '1 1 100%' : '1 1 500px', perspective: 1200, width: '100%' }}
            >
                <motion.div
                    onMouseMove={handleMouse}
                    onMouseLeave={() => {
                        x.set(200);
                        y.set(200);
                    }}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: isMobile ? '350px' : '400px',
                        rotateX: isMobile ? 0 : rotateX,
                        rotateY: isMobile ? 0 : rotateY,
                        transformStyle: "preserve-3d",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'default'
                    }}
                >
                    {id === 1 && <TelemetryMockup isMobile={isMobile} />}
                    {id === 2 && <CommandCenterMockup isMobile={isMobile} />}
                    {id === 3 && <SecurityMockup isMobile={isMobile} />}
                </motion.div>
            </motion.div>
        </div>
    );
};

// ----------------------------------------------------
// Custom Workspace Monitoring Mockups
// ----------------------------------------------------

const TelemetryMockup = ({ isMobile }) => {
    // Mimicking a real-time terminal/log feed of employee activity
    return (
        <div style={{ position: 'relative', width: '96%', height: '86%', translateZ: 30 }}>
            {/* Massive Soft Glow behind it */}
            <div style={{ position: 'absolute', inset: '-20px', background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(239, 68, 68, 0.15), rgba(59, 130, 246, 0.15))', filter: 'blur(40px)', zIndex: 0 }} />

            {/* The Border Gradients Box */}
            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '16px', background: 'linear-gradient(135deg, #4ade80 0%, #3b82f6 50%, #ef4444 100%)', padding: '1.5px', zIndex: 1, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
                {/* Inner Window */}
                <div style={{ background: '#ffffff', width: '100%', height: '100%', borderRadius: '15px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                    {/* Header */}
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', fontWeight: 500 }}>
                            <Activity size={18} color="#3b82f6" /> Live Telemetry Feed
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} /> Active
                        </div>
                    </div>

                    {/* Data Rows */}
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { name: 'Sarah Jenkins', action: 'Accessed Client DB', time: 'Just now', color: '#3b82f6' },
                            { name: 'Michael Chen', action: 'Idle (15m)', time: '2m ago', color: '#f59e0b' },
                            { name: 'System Auth', action: 'Token Rotated', time: '5m ago', color: '#10b981' },
                            { name: 'Dev Team API', action: 'High Latency Spike', time: '12m ago', color: '#ef4444' }
                        ].map((log, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: log.color }} />
                                    <span style={{ color: '#111827', fontWeight: 500 }}>{log.name}</span>
                                    <span style={{ color: '#6b7280' }}>{log.action}</span>
                                </div>
                                <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>{log.time}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

const CommandCenterMockup = ({ isMobile }) => {
    // Abstracted pill showing a unified command prompt or notification
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', translateZ: 40 }}>
            {/* Massive Soft Glow Blob behind it */}
            <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', width: '80%', height: '180%', background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.25) 0%, rgba(245, 158, 11, 0.2) 40%, rgba(16, 185, 129, 0.15) 80%, transparent 100%)', filter: 'blur(30px)', zIndex: 0 }}
            />

            {/* Thicker Glowing Pill Border */}
            <div style={{ position: 'relative', width: '90%', borderRadius: '16px', background: 'linear-gradient(90deg, #fbbf24, #10b981)', padding: '2px', zIndex: 1, boxShadow: '0 24px 48px rgba(0,0,0,0.06)' }}>
                {/* Pill Interior */}
                <div style={{ background: '#ffffff', width: '100%', padding: '24px 32px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '12px', color: '#3b82f6' }}>
                        <Users size={24} />
                    </div>
                    <div>
                        <div style={{ margin: 0, fontSize: '1.1rem', color: '#111827', fontWeight: 500 }}>Deploy Global Policy Update</div>
                        <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '4px' }}>Syncing configurations across 4,203 active agents...</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SecurityMockup = ({ isMobile }) => {
    return (
        <div style={{ position: 'relative', width: '80%', height: '80%', translateZ: 30 }}>
            {/* Soft background aura - Red/Orange biased for security warning */}
            <div style={{ position: 'absolute', inset: '-30px', background: 'linear-gradient(220deg, rgba(239, 68, 68, 0.2), rgba(245, 158, 11, 0.15), rgba(59, 130, 246, 0.1))', filter: 'blur(40px)', zIndex: 0 }} />

            {/* Glowing Border Card */}
            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '16px', background: 'linear-gradient(135deg, #ef4444 0%, #fbbf24 50%, #3b82f6 100%)', padding: '1.5px', zIndex: 1, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
                {/* Inner Card */}
                <div style={{ background: '#ffffff', width: '100%', height: '100%', borderRadius: '15px', padding: isMobile ? '20px' : '32px', display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '24px' }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <ShieldAlert size={16} /> Edge Threat Detected
                    </div>

                    <div>
                        <div style={{ fontSize: isMobile ? '1.1rem' : '1.4rem', fontWeight: 500, color: '#111827', marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Unauthorized Access Attempt</div>
                        <div style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', color: '#6b7280', lineHeight: 1.5 }}>
                            A suspicious login flag: unrecognized IP range outside corporate bounds.
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: isMobile ? '8px 12px' : '12px', background: '#f9fafb', borderRadius: '8px', fontSize: isMobile ? '0.75rem' : '0.85rem' }}>
                            <span style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px' }}><Server size={14} /> Source Node</span>
                            <span style={{ color: '#111827', fontFamily: 'monospace' }}>192.168.1.104</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: isMobile ? '8px 12px' : '12px', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '8px', fontSize: isMobile ? '0.75rem' : '0.85rem' }}>
                            <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}><Lock size={14} /> Action Taken</span>
                            <span style={{ color: '#ef4444', fontWeight: 500 }}>Terminated</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Advantages;
