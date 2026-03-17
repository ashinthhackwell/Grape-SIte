import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    LayoutDashboard, Users, FileText, Settings, Activity, ShieldAlert, Clock,
    Monitor, Lock, Eye, Database, Globe, Cpu, Server, Fingerprint, Shield,
    Wifi, HardDrive, AlertTriangle, Key, Search
} from 'lucide-react';

const useBreakpoint = () => {
    const [breakpoints, setBreakpoints] = useState(() => {
        const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
        return { isMobile: w <= 640, isTablet: w <= 768, isSmallLaptop: w <= 1024 };
    });

    useEffect(() => {
        let timeoutId;
        const handle = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const w = window.innerWidth;
                setBreakpoints(prev => {
                    const next = { isMobile: w <= 640, isTablet: w <= 768, isSmallLaptop: w <= 1024 };
                    if (prev.isMobile === next.isMobile && prev.isTablet === next.isTablet && prev.isSmallLaptop === next.isSmallLaptop) {
                        return prev;
                    }
                    return next;
                });
            }, 50); // slight debounce avoids thrashing
        };
        window.addEventListener('resize', handle);
        return () => {
            window.removeEventListener('resize', handle);
            clearTimeout(timeoutId);
        };
    }, []);
    return breakpoints;
};

const DemoSection = () => {
    const containerRef = useRef(null);
    const { isMobile, isTablet } = useBreakpoint();

    // Scroll-driven animation tracking the stable container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Transform values synchronized perfectly to scroll
    const containerOpacity = useTransform(smoothProgress, [0, 1], [0, 1]);
    const containerY = useTransform(smoothProgress, [0, 1], [80, 0]);
    const containerScale = useTransform(smoothProgress, [0, 1], [0.95, 1]);

    // Title Transform
    const titleOpacity = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);
    const titleY = useTransform(smoothProgress, [0.1, 0.4], [10, 0]);

    // Sidebar Items Transforms
    const sidebarOps = [
        useTransform(smoothProgress, [0.1, 0.4], [0, 1]),
        useTransform(smoothProgress, [0.15, 0.45], [0, 1]),
        useTransform(smoothProgress, [0.2, 0.5], [0, 1]),
        useTransform(smoothProgress, [0.25, 0.55], [0, 1]),
        useTransform(smoothProgress, [0.3, 0.6], [0, 1]),
    ];
    const sidebarXs = [
        useTransform(smoothProgress, [0.1, 0.4], [-10, 0]),
        useTransform(smoothProgress, [0.15, 0.45], [-10, 0]),
        useTransform(smoothProgress, [0.2, 0.5], [-10, 0]),
        useTransform(smoothProgress, [0.25, 0.55], [-10, 0]),
        useTransform(smoothProgress, [0.3, 0.6], [-10, 0]),
    ];

    // Card Items Transforms
    const cardOps = [
        useTransform(smoothProgress, [0.2, 0.5], [0, 1]),
        useTransform(smoothProgress, [0.25, 0.55], [0, 1]),
        useTransform(smoothProgress, [0.3, 0.6], [0, 1]),
        useTransform(smoothProgress, [0.35, 0.65], [0, 1]),
    ];
    const cardYs = [
        useTransform(smoothProgress, [0.2, 0.5], [20, 0]),
        useTransform(smoothProgress, [0.25, 0.55], [20, 0]),
        useTransform(smoothProgress, [0.3, 0.6], [20, 0]),
        useTransform(smoothProgress, [0.35, 0.65], [20, 0]),
    ];

    // Table Container Transforms
    const tableOpacity = useTransform(smoothProgress, [0.4, 0.7], [0, 1]);
    const tableY = useTransform(smoothProgress, [0.4, 0.7], [20, 0]);

    // Active Sessions Rows Transforms
    const rowOps = [
        useTransform(smoothProgress, [0.45, 0.75], [0, 1]),
        useTransform(smoothProgress, [0.5, 0.8], [0, 1]),
        useTransform(smoothProgress, [0.55, 0.85], [0, 1]),
        useTransform(smoothProgress, [0.6, 0.9], [0, 1]),
    ];
    const rowXs = [
        useTransform(smoothProgress, [0.45, 0.75], [-10, 0]),
        useTransform(smoothProgress, [0.5, 0.8], [-10, 0]),
        useTransform(smoothProgress, [0.55, 0.85], [-10, 0]),
        useTransform(smoothProgress, [0.6, 0.9], [-10, 0]),
    ];

    // Chart Container Transforms
    const chartOpacity = useTransform(smoothProgress, [0.5, 0.8], [0, 1]);
    const chartY = useTransform(smoothProgress, [0.5, 0.8], [20, 0]);

    // Chart Elements Transforms
    const chartPathLength = useTransform(smoothProgress, [0.6, 0.9], [0, 1]);
    const chartDotScales = [
        useTransform(smoothProgress, [0.7, 0.9], [0, 1]),
        useTransform(smoothProgress, [0.75, 0.95], [0, 1]),
        useTransform(smoothProgress, [0.8, 1.0], [0, 1]),
        useTransform(smoothProgress, [0.85, 1.0], [0, 1]),
    ];

    // Mock data based on the real AdminDashboard
    const metrics = [
        { label: 'Active Sessions', value: '1,248', icon: <Activity size={16} color="#10b981" />, change: '+12%' },
        { label: 'Total Employees', value: '450', icon: <Users size={16} color="#3b82f6" />, change: '+5%' },
        { label: 'Avg Hours (This Month)', value: '142.5h', icon: <Clock size={16} color="#8b5cf6" />, change: '+2.4%' },
        { label: 'Avg Efficiency', value: '94.2%', icon: <LayoutDashboard size={16} color="#f59e0b" />, change: '+1.1%' }
    ];

    const activeSessions = [
        { user: 'sarah.jenkins@company.grape', config: 'Developer Standard', status: 'Online', color: 'bg-green-100 text-green-700', time: '12s ago' },
        { user: 'michael.chen@company.grape', config: 'Sales Team', status: 'Online', color: 'bg-green-100 text-green-700', time: '45s ago' },
        { user: 'elena.rodriguez@company.grape', config: 'Support Tier 1', status: 'Idle', color: 'bg-yellow-100 text-yellow-700', time: '15m ago' },
        { user: 'david.kim@company.grape', config: 'Developer Standard', status: 'Offline', color: 'bg-red-100 text-red-700', time: '2h ago' }
    ];

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={16} />, active: true },
        { name: 'Session configs', icon: <Settings size={16} />, active: false },
        { name: 'Users', icon: <Users size={16} />, active: false },
        { name: 'Reports', icon: <FileText size={16} />, active: false },
        { name: 'Password Resets', icon: <ShieldAlert size={16} />, active: false, badge: 3 }
    ];

    // Marquee Icons Theme with unique glowing colors
    const marqueeIcons = [
        { Icon: Monitor, color: "#3b82f6" }, // Blue
        { Icon: Lock, color: "#10b981" },    // Emerald
        { Icon: Eye, color: "#8b5cf6" },     // Violet
        { Icon: Database, color: "#f59e0b" }, // Amber
        { Icon: Globe, color: "#06b6d4" },   // Cyan
        { Icon: Cpu, color: "#ef4444" },     // Red
        { Icon: Server, color: "#6366f1" },  // Indigo
        { Icon: Fingerprint, color: "#14b8a6" },// Teal
        { Icon: Shield, color: "#8b5cf6" },  // Violet
        { Icon: Wifi, color: "#3b82f6" },    // Blue
        { Icon: HardDrive, color: "#f59e0b" },// Amber
        { Icon: AlertTriangle, color: "#ef4444" }, // Red
        { Icon: Key, color: "#10b981" },     // Emerald
        { Icon: Search, color: "#6366f1" },  // Indigo
    ];

    return (
        <section style={{ padding: isMobile ? '40px 16px 160px' : isTablet ? '60px 20px 200px' : '80px 24px 280px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? '40px' : '80px', position: 'relative', background: 'transparent' }}>
            {/* Stable tracker for inView that does not animate its transform/scale */}
            <div ref={containerRef} style={{ width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'center' }}>
                <motion.div
                    style={{
                        opacity: containerOpacity,
                        y: containerY,
                        scale: containerScale,
                        width: '100%',
                    aspectRatio: isTablet ? 'auto' : '16/9',
                    minHeight: isTablet ? '600px' : 'auto',
                    borderRadius: '16px',
                    background: '#f9fafb', // Light gray background matching real app
                    border: '1px solid rgba(0,0,0,0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)'
                }}
            >
                {/* Mac-like Window Header (Light Mode) */}
                <div style={{
                    height: '40px',
                    background: '#ffffff',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    gap: '8px',
                    zIndex: 10
                }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                    <div style={{ flex: 1 }} />
                    <div style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 500 }}>Grape - Monitoring</div>
                    <div style={{ flex: 1 }} />
                </div>

                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

                    {/* Sidebar — hidden on tablet/mobile */}
                    {!isTablet && (
                    <div style={{ width: '240px', borderRight: '1px solid #e5e7eb', background: '#ffffff', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '24px', flexShrink: 0 }}>
                        <div>
                            <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111827', marginBottom: '16px', paddingLeft: '8px' }}>Admin Workspace</h2>
                            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        style={{
                                            opacity: sidebarOps[i],
                                            x: sidebarXs[i],
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '8px 12px', borderRadius: '6px',
                                            background: item.active ? '#f3f4f6' : 'transparent',
                                            color: item.active ? '#111827' : '#4b5563',
                                            fontWeight: item.active ? 600 : 500,
                                            fontSize: '14px', cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {item.icon}
                                            {item.name}
                                        </div>
                                        {item.badge && (
                                            <span style={{ background: '#ef4444', color: '#fff', fontSize: '11px', padding: '2px 6px', borderRadius: '99px', fontWeight: 600 }}>{item.badge}</span>
                                        )}
                                    </motion.div>
                                ))}
                            </nav>
                        </div>
                    </div>
                    )}

                    {/* Main Content */}
                    <div style={{ flex: 1, padding: isMobile ? '16px' : '32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <motion.h1 style={{ opacity: titleOpacity, y: titleY, fontSize: isMobile ? '20px' : '24px', fontWeight: 600, color: '#111827' }}>
                                Dashboard Overview
                            </motion.h1>
                        </div>

                        {/* Summary Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '12px' : '16px' }}>
                            {metrics.map((metric, i) => (
                                <motion.div
                                    key={i}
                                    style={{
                                        opacity: cardOps[i],
                                        y: cardYs[i],
                                        background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px',
                                        display: 'flex', flexDirection: 'column', gap: '8px',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '13px', fontWeight: 500 }}>
                                        {metric.icon}
                                        {metric.label}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>{metric.value}</span>
                                        <span style={{ fontSize: '13px', fontWeight: 500, color: '#10b981', marginBottom: '4px' }}>{metric.change}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Middle Row: Table & Chart */}
                        <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '2fr 1fr', gap: isMobile ? '16px' : '24px', flex: 1 }}>

                            {/* Live Active Sessions Table */}
                            <motion.div
                                style={{
                                    opacity: tableOpacity,
                                    y: tableY,
                                    background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden',
                                    overflowX: 'auto',
                                    display: 'flex', flexDirection: 'column',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
                                    <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>Active Sessions — Live Status</h2>
                                </div>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px', flex: 1, minWidth: '400px' }}>
                                    <thead>
                                        <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                                            <th style={{ padding: '12px 20px', fontWeight: 500 }}>User</th>
                                            <th style={{ padding: '12px 20px', fontWeight: 500 }}>Config</th>
                                            <th style={{ padding: '12px 20px', fontWeight: 500 }}>Status</th>
                                            <th style={{ padding: '12px 20px', fontWeight: 500 }} className="hide-on-mobile">Last Seen</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeSessions.map((session, i) => (
                                            <motion.tr
                                                key={i}
                                                style={{ opacity: rowOps[i], x: rowXs[i], borderBottom: i === activeSessions.length - 1 ? 'none' : '1px solid #e5e7eb' }}
                                            >
                                                <td style={{ padding: '12px 20px', fontWeight: 500, color: '#111827' }}>{session.user}</td>
                                                <td style={{ padding: '12px 20px', color: '#6b7280' }}>{session.config}</td>
                                                <td style={{ padding: '12px 20px' }}>
                                                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontWeight: 500, fontSize: '12px', background: session.status === 'Online' ? '#d1fae5' : session.status === 'Idle' ? '#fef3c7' : '#fee2e2', color: session.status === 'Online' ? '#047857' : session.status === 'Idle' ? '#b45309' : '#b91c1c' }}>
                                                        {session.status}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '12px 20px', color: '#6b7280' }} className="hide-on-mobile">{session.time}</td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </motion.div>

                            {/* Daily Hours Chart Graphic */}
                            <motion.div
                                style={{
                                    opacity: chartOpacity,
                                    y: chartY,
                                    background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px',
                                    display: 'flex', flexDirection: 'column', gap: '16px',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                    minHeight: '200px'
                                }}
                            >
                                <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>📊 Productivity Graph</h2>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                                        {/* Grid lines */}
                                        {[40, 100, 160].map(y => (
                                            <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#f3f4f6" strokeWidth="2" strokeDasharray="4 4" />
                                        ))}
                                        {/* Animated Area line */}
                                        <defs>
                                            <linearGradient id="blueArea" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <motion.path
                                            style={{ pathLength: chartPathLength, opacity: chartPathLength }}
                                            d="M0,140 C50,140 100,50 150,80 C200,110 250,40 300,70 C350,100 380,30 400,30 L400,180 L0,180 Z"
                                            fill="url(#blueArea)"
                                        />
                                        <motion.path
                                            style={{ pathLength: chartPathLength }}
                                            d="M0,140 C50,140 100,50 150,80 C200,110 250,40 300,70 C350,100 380,30 400,30"
                                            fill="none"
                                            stroke="#3b82f6"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                        />
                                        {/* Animated dots */}
                                        {[[0, 140], [150, 80], [300, 70], [400, 30]].map((pt, i) => (
                                            <motion.circle
                                                key={i}
                                                cx={pt[0]} cy={pt[1]} r="4"
                                                style={{ scale: chartDotScales[i] }}
                                                fill="#ffffff" stroke="#3b82f6" strokeWidth="2"
                                            />
                                        ))}
                                    </svg>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </motion.div>
            </div>

            {/* Glowing Icon Marquee Background Strip */}
            <div style={{
                position: 'absolute',
                bottom: '-24px',
                left: 0,
                right: 0,
                height: isMobile ? '140px' : '240px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                zIndex: 1
            }}>
                <motion.div
                    animate={{
                        x: ["0%", "-50%", "0%"],
                        y: ["0px", "-20px", "20px", "0px"] // Larger Organic floating for the container
                    }}
                    transition={{
                        x: {
                            ease: "easeInOut",
                            duration: 80, // Smooth speed
                            repeat: Infinity
                        },
                        y: {
                            ease: "easeInOut",
                            duration: 20, // Slower bob
                            repeat: Infinity
                        }
                    }}
                    style={{
                        display: 'flex',
                        gap: isMobile ? '20px' : '40px',
                        paddingRight: isMobile ? '20px' : '40px',
                        width: 'max-content'
                    }}
                >
                    {/* Double the array to ensure perfect seamless looping */}
                    {[...marqueeIcons, ...marqueeIcons].map((item, i) => {
                        const Icon = item.Icon;
                        // Add organic offset to individual icons
                        const verticalOffset = i % 2 === 0 ? '15px' : '-15px';

                        return (
                            <motion.div
                                key={i}
                                initial="idle"
                                whileHover="hover"
                                variants={{
                                    idle: {
                                        scale: 1,
                                        opacity: 0.6,
                                        color: 'rgb(18, 19, 23)',
                                        boxShadow: '0 0 0px rgba(0,0,0,0)',
                                        background: 'rgba(252,252,253,1)', // Faint off-white bubble
                                        border: '1px solid rgba(0,0,0,0.03)',
                                        y: verticalOffset
                                    },
                                    hover: {
                                        scale: 1.3, // Pop
                                        opacity: 1,
                                        color: item.color,
                                        boxShadow: `0 0 40px ${item.color}25`, // Beautiful soft glow
                                        background: 'rgba(255,255,255,1)',
                                        border: `1px solid ${item.color}15`,
                                        y: '0px'
                                    }
                                }}
                                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                                style={{
                                    width: isMobile ? '50px' : '80px',
                                    height: isMobile ? '50px' : '80px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(8px)',
                                    willChange: 'transform, color, box-shadow'
                                }}
                            >
                                <Icon size={isMobile ? 18 : 24} strokeWidth={1.5} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default DemoSection;
