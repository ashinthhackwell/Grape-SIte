import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: 'How does workspace monitoring work?',
        answer: 'Once the desktop agent is installed and paired, it runs quietly in the background tracking application and website usage based on the session configuration set by your admin. All data is securely transmitted to the Grape dashboard in real time.'
    },
    {
        question: 'Is my data secure?',
        answer: 'Absolutely. All data is encrypted in transit and at rest. We follow industry-standard security practices and never share your information with third parties. Admins can only view aggregated activity data relevant to the configured session.'
    },
    {
        question: 'Can admins manage multiple teams?',
        answer: 'Yes. Admins can create multiple session configurations for different teams or departments. Each configuration defines which applications and websites are monitored, giving full flexibility for diverse workflows.'
    },
    {
        question: 'What platforms are supported?',
        answer: 'The Grape desktop agent currently supports Windows and macOS. The web dashboard is accessible from any modern browser including Chrome, Firefox, Safari, and Edge.'
    },
    {
        question: 'Where can I contact support?',
        answer: 'You can reach our engineering team at support@grape.com. We typically respond within 24 hours on business days. For urgent issues, your organization admin can also escalate directly through the dashboard.'
    },
    {
        question: "Am I hiring too slow or too fast?",
        answer: "Growing too fast can create chaos. Growing too slowly can slow the company. Grape shows how your current team is working and where the workload is high, helping you understand when it’s the right time to hire."
    },
    {
        question: "Did I lose a good person because I didn’t pay enough?",
        answer: "Sometimes founders don’t realize how valuable someone is until they leave.Grape helps you see real contribution and work patterns, so you understand who your most valuable team members are."
    },
    {
        question: "Is my best person about to leave?",
        answer: "Good employees sometimes quietly lose motivation. Grape helps you notice changes in work patterns, so you can check in and support them before problems grow."
    },
    {
        question: "Can I afford to keep good people as we grow?",
        answer: "Growth always comes with difficult financial decisions. Grape helps you understand the real impact of each team member, so you can invest in the people who matter most."
    },
    {
        question: "Is this a place people actually like working?",
        answer: "Founders want to build a healthy work environment. Grape helps you understand team activity and balance, helping you create a sustainable work culture."
    },
    {
        question: "Are there problems between people that I’m not seeing?",
        answer: "Small conflicts can quietly reduce productivity. Grape helps highlight unusual changes in work activity, which can signal deeper problems that need attention."
    },
    {
        question: "Is this person struggling, or am I not helping enough?",
        answer: "Sometimes performance problems are really support problems. Grape shows how work is being done, helping you understand where employees might need help."
    },
    {
        question: "Firing someone feels awful — even when it’s the right call.",
        answer: "Founders care about people, which makes these moments difficult. Grape helps you make decisions with clarity, so choices are based on understanding, not assumptions."
    },
    {
        question: "Is my team being honest with me?",
        answer: "Sometimes employees hesitate to share the truth. Grape gives founders objective insights into how work happens, helping you see the real situation."
    },
    {
        question: "Does my team actually understand what we’re trying to build?",
        answer: "Vision can get lost when teams grow. Grape helps founders see how work aligns with goals, making it easier to guide the team."
    },
    {
        question: "Am I stressing people by sharing too much of my worries?",
        answer: "Founders carry a lot of pressure. Grape provides clarity about team productivity, reducing the need to constantly push or worry."
    },
    {
        question: "Who is performing well in my team?",
        answer: "Sometimes it’s hard to know who is truly contributing the most. Grape shows clear productivity insights and work activity, helping you recognize the employees who are performing well."
    },
    {
        question: "How fast is my team getting work done?",
        answer: "Speed matters for every startup. Grape helps founders see work progress and productivity trends, making it easier to understand how quickly tasks move forward."
    },
    {
        question: "What is the real power of my team?",
        answer: "Every team has hidden strengths. Grape gives a clear overview of team productivity and activity, helping you understand the true potential of your team."
    },
    {
        question: "Who deserves to be Employee of the Week?",
        answer: "Recognizing good work keeps teams motivated. Grape helps identify consistent performers, making it easier to celebrate the people who contribute the most."
    },
];

const FAQItem = ({ question, answer, isOpen, onClick, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClick}
            style={{
                borderRadius: '16px',
                border: `1px solid ${isOpen ? '#e9d5ff' : '#f1f5f9'}`,
                background: isOpen ? '#fefbff' : '#fff',
                boxShadow: isOpen
                    ? '0 8px 30px rgba(168, 85, 247, 0.08), 0 0 0 1px rgba(168, 85, 247, 0.05)'
                    : '0 1px 3px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                overflow: 'hidden'
            }}
            whileHover={{
                boxShadow: isOpen
                    ? '0 8px 30px rgba(168, 85, 247, 0.12), 0 0 0 1px rgba(168, 85, 247, 0.08)'
                    : '0 4px 16px rgba(0,0,0,0.06)',
                y: -1
            }}
        >
            {/* Question Row */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                gap: '16px'
            }}>
                <span style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: isOpen ? '#6b21a8' : '#1e293b',
                    lineHeight: 1.5,
                    transition: 'color 0.3s ease',
                    flex: 1
                }}>
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: isOpen ? '#f3e8ff' : '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'background 0.3s ease'
                    }}
                >
                    {isOpen
                        ? <Minus size={16} color="#a855f7" strokeWidth={2.5} />
                        : <Plus size={16} color="#94a3b8" strokeWidth={2.5} />
                    }
                </motion.div>
            </div>

            {/* Answer */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{
                            padding: '0 24px 20px',
                            fontSize: '0.88rem',
                            color: '#64748b',
                            lineHeight: 1.7,
                            fontWeight: 400
                        }}>
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQSection = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const generalFaqs = faqData.slice(0, 5);
    const founderFaqs = faqData.slice(5);

    return (
        <div style={{
            width: '100%',
            maxWidth: '860px',
            margin: '0 auto',
            padding: isMobile ? '0 0' : '0 20px',
            marginBottom: isMobile ? '80px' : '120px'
        }}>
            {/* Main Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '56px' }}
            >
                <h2 style={{
                    fontSize: isMobile ? '2rem' : '2.4rem',
                    fontWeight: 700,
                    color: '#111',
                    margin: '0 0 8px',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.2
                }}>
                    Got questions?
                </h2>
                <p style={{
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    color: '#94a3b8',
                    fontWeight: 400,
                    margin: 0
                }}>
                    We've got answers.
                </p>
            </motion.div>

            {/* General FAQ Items */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: isMobile ? '48px' : '64px'
            }}>
                {generalFaqs.map((item, index) => (
                    <FAQItem
                        key={`general-${index}`}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openIndex === `general-${index}`}
                        onClick={() => toggle(`general-${index}`)}
                        index={index}
                    />
                ))}
            </div>

            {/* Founder Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '40px' }}
            >
                <h3 style={{
                    fontSize: isMobile ? '1.5rem' : '1.8rem',
                    fontWeight: 700,
                    color: '#111',
                    margin: 0,
                    letterSpacing: '-0.02em',
                    padding: isMobile ? '0 10px' : '0'
                }}>
                    Questions Every Founder Thinks About
                </h3>
            </motion.div>

            {/* Founder FAQ Items */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                {founderFaqs.map((item, index) => (
                    <FAQItem
                        key={`founder-${index}`}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openIndex === `founder-${index}`}
                        onClick={() => toggle(`founder-${index}`)}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default FAQSection;
