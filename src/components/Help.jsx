import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import DownloadAgentAnimation from './DownloadAgentAnimation';
import LoginCredentialsAnimation from './LoginCredentialsAnimation';
import PairAgentAnimation from './PairAgentAnimation';
import FAQSection from './FAQSection';

const StepSection = ({ step, title, description, isReversed, AnimationComponent }) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : (isReversed ? 'row-reverse' : 'row'),
                alignItems: 'center',
                gap: isMobile ? '32px' : '60px',
                marginBottom: isMobile ? '80px' : '120px',
                width: '100%',
                flexWrap: 'wrap'
            }}
        >
            <div style={{ flex: 1, minWidth: isMobile ? '100%' : '300px', textAlign: isMobile ? 'center' : 'left' }}>
                <span style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#a855f7',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    display: 'block',
                    marginBottom: '16px'
                }}>
                    Step {step}
                </span>
                <h3 style={{
                    fontSize: isMobile ? '1.5rem' : '2.5rem',
                    fontWeight: 500,
                    color: '#111',
                    marginBottom: '24px',
                    letterSpacing: '-0.02em'
                }}>
                    {title}
                </h3>
                <p style={{
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    color: '#666',
                    lineHeight: 1.6,
                    maxWidth: isMobile ? '100%' : '450px',
                    margin: isMobile ? '0 auto' : '0'
                }}>
                    {description}
                </p>
            </div>

            <div style={{
                flex: 1,
                minWidth: isMobile ? '100%' : '300px',
                height: isMobile ? '320px' : '420px',
                background: '#fff',
                borderRadius: isMobile ? '24px' : '32px',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.03)',
                overflow: 'hidden'
            }} className="animation-container-mobile">
                {AnimationComponent ? (
                    <AnimationComponent />
                ) : (
                    <div style={{
                        width: '80%',
                        height: '60%',
                        background: '#f8f9fa',
                        borderRadius: '12px',
                        border: '1px dashed #dee2e6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#adb5bd',
                        fontSize: '14px'
                    }}>
                        Visual Placeholder
                    </div>
                )}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: '40%',
                    height: '40%',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.05) 0%, transparent 70%)',
                    zIndex: 0
                }} />
            </div>
        </motion.div>
    );
};

const Help = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const steps = [
        {
            step: "01",
            title: "Install the Monitoring Agent",
            description: "Download the Grape installer and install it on your system. We support both Windows and macOS natively."
        },
        {
            step: "02",
            title: "Obtain Your Credentials",
            description: "Admins can register a new organization directly. Employees should receive their secure login credentials from their organization administrator."
        },
        {
            step: "03",
            title: "Connect to the Dashboard",
            description: "Log in to your Grape dashboard and navigate to the Config section to generate a pairing code. Enter this code into your desktop agent to begin real-time monitoring."
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: '#fafafa',
            padding: isMobile ? '100px 20px 60px' : '120px 24px 80px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="dot-background" />

            <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-40px' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link to="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#666',
                        textDecoration: 'none',
                        marginBottom: isMobile ? '40px' : '80px',
                        fontSize: '14px',
                        fontWeight: 500,
                        transition: 'color 0.3s ease'
                    }} className="hover-dark">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                </motion.div>

                <div style={{ marginBottom: isMobile ? '80px' : '160px' }}>
                    {steps.map((item, index) => (
                        <StepSection
                            key={index}
                            step={item.step}
                            title={item.title}
                            description={item.description}
                            isReversed={index % 2 !== 0}
                            AnimationComponent={index === 0 ? DownloadAgentAnimation : index === 1 ? LoginCredentialsAnimation : index === 2 ? PairAgentAnimation : null}
                        />
                    ))}
                </div>

                <FAQSection />

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: isMobile ? '40px' : '80px' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            background: '#111',
                            borderRadius: isMobile ? '16px' : '24px',
                            padding: isMobile ? '40px 20px' : '60px',
                            textAlign: 'center',
                            color: '#fff',
                            position: 'relative',
                            overflow: 'hidden',
                            width: '100%',
                            maxWidth: '800px'
                        }}
                    >
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 500, marginBottom: '16px' }}>Still need help?</h2>
                            <p style={{ color: '#aaa', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                                Our engineering team is always available for technical consultations and troubleshooting.
                            </p>
                            <a href="mailto:support@grape.com" className="premium-glow-btn" style={{ color: '#fff', width: isMobile ? '100%' : 'auto' }}>
                                <div className="premium-glow-btn-inner" style={{ background: '#333', padding: '12px 32px' }}>
                                    <span>Contact Support</span>
                                </div>
                            </a>
                        </div>
                        <div style={{
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255, 255, 255, 0.05) 180deg, transparent 360deg)',
                            animation: 'spin 10s linear infinite'
                        }} />
                    </motion.div>
                </div>
            </div>

            <style>{`
                .hover-dark:hover {
                    color: #111 !important;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Help;
