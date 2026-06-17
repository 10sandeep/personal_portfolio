import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SplashCursor from './SplashCursor';
import ProfileCard from './components/ProfileCard';
import DecryptedText from './components/DecryptedText';
import Lanyard from './components/Lanyard';
import Globe from './components/Globe';
import BorderBeam from './components/BorderBeam';
import LineWaves from './components/LineWaves';

const tags = [
    'React Native',
    'Web Apps',
    'JavaScript',
    'TypeScript',
    'Mobile Dev',
    'Open Source',
    'React',
    'Problem Solver',
    'Clean Code',
    'Immediate Joiner'
];

const visualCards = [
    {
        id: 'zet-card',
        wrapperStyle: {
            background: 'linear-gradient(160deg,#2d1b69 0%,#1a0f3e 100%)'
        },
        blobStyle: {
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle,rgba(167,139,250,.25),transparent 70%)',
            top: '-40px',
            right: '-40px'
        },
        badge: { text: 'ZET Card', style: { background: 'rgba(167,139,250,.2)', color: '#c4b5fd' } },
        title: 'Top-Up Your FD, Boost Credit Power!',
        sub: 'Get higher limit with extra cashback',
        content: (
            <>
                <div style={{ fontSize: '32px', margin: '16px 0', textAlign: 'center' }}>🪙💳</div>
                <div className="vc-title" style={{ color: '#e9d5ff', fontSize: '13px', marginBottom: '8px' }}>
                    Why FD Top-Up Helps
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    <div style={{ background: 'rgba(255,255,255,.08)', borderRadius: '10px', padding: '9px 11px', fontSize: '11px', color: '#e9d5ff' }}>
                        💳 More Spending Power
                    </div>
                    <div style={{ background: 'rgba(255,255,255,.08)', borderRadius: '10px', padding: '9px 11px', fontSize: '11px', color: '#e9d5ff' }}>
                        💰 Smarter Savings
                    </div>
                    <div style={{ background: 'rgba(255,255,255,.08)', borderRadius: '10px', padding: '9px 11px', fontSize: '11px', color: '#e9d5ff' }}>
                        📈 Higher Credit Score
                    </div>
                </div>
            </>
        )
    },
    {
        id: 'score-card',
        wrapperStyle: {
            background: 'linear-gradient(160deg,#1a1200 0%,#2a1f00 50%,#1a0f3e 100%)'
        },
        blobStyle: {
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle,rgba(234,179,8,.15),transparent 70%)',
            bottom: '-20px',
            left: '-30px'
        },
        badge: { text: 'Credit Score', style: { background: 'rgba(234,179,8,.15)', color: '#fcd34d' } },
        title: '800+ Club Member',
        sub: 'You\'ve joined the top tier of credit excellence',
        content: (
            <>
                <div style={{ textAlign: 'center', margin: '12px 0' }}>
                    <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#4c1d95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto', boxShadow: '0 0 30px rgba(124,58,237,.5)' }}>
                        <div style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '28px', fontWeight: 800, color: '#fff' }}>780</div>
                        <div style={{ fontSize: '9px', color: '#c4b5fd' }}>Score</div>
                    </div>
                </div>
                <div className="vc-stats">
                    <div className="vc-stat" style={{ color: '#fcd34d' }}>
                        <div className="vc-stat-val">+12</div>
                        <div className="vc-stat-label">Points this month</div>
                    </div>
                    <div className="vc-stat" style={{ color: '#a78bfa' }}>
                        <div className="vc-stat-val">Top 5%</div>
                        <div className="vc-stat-label">Percentile Rank</div>
                    </div>
                </div>
            </>
        )
    },
    {
        id: 'steps-card',
        wrapperStyle: {
            background: 'linear-gradient(160deg,#0f172a 0%,#1e1b4b 100%)'
        },
        blobStyle: {
            width: '160px',
            height: '160px',
            background: 'radial-gradient(circle,rgba(99,102,241,.2),transparent 70%)',
            top: '20px',
            right: '-20px'
        },
        title: 'How can I save more?',
        content: (
            <>
                <div className="vc-steps">
                    {[
                        ['Step 1', 'Apply and activate ZET card'],
                        ['Step 2', 'Purchase the brand voucher'],
                        ['Step 3', 'Get cashback on your purchase'],
                        ['Step 4', 'Redeem your voucher online']
                    ].map(([label, text], index) => (
                        <div key={label} className="vc-step" style={index === 3 ? { borderBottom: 'none' } : {}}>
                            <div className="vc-step-num">{label}</div>
                            <div className="vc-step-text" style={{ color: '#e0e7ff' }}>{text}</div>
                        </div>
                    ))}
                </div>
                <div className="vc-title" style={{ color: '#fff', fontSize: '13px', marginTop: '12px', marginBottom: '6px' }}>
                    Your Savings with ZET
                </div>
                <div className="vc-table">
                    <div className="vc-row"><span className="vc-row-label" style={{ color: '#94a3b8' }}>Shop ₹5,000</span><span className="vc-row-val" style={{ color: '#f87171' }}>Pay ₹5,000</span></div>
                    <div className="vc-row"><span className="vc-row-label" style={{ color: '#94a3b8' }}>Cashback</span><span className="vc-row-val" style={{ color: '#4ade80' }}>₹500 back</span></div>
                </div>
            </>
        )
    },
    {
        id: 'partners-card',
        wrapperStyle: {
            background: 'linear-gradient(160deg,#0c1a0c 0%,#0f2010 100%)'
        },
        blobStyle: {
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle,rgba(34,197,94,.1),transparent 70%)',
            bottom: '-30px',
            right: '-30px'
        },
        badge: { text: 'Trusted', style: { background: 'rgba(34,197,94,.15)', color: '#4ade80' } },
        title: 'Banking Partners',
        sub: 'Partnered with India\'s top banks',
        content: (
            <>
                <div className="vc-partners">
                    <div className="vc-partner" style={{ color: '#fff' }}>
                        🏦 SBM Bank<div className="vc-partner-sub">Scheduled Commercial Bank</div>
                    </div>
                    <div className="vc-partner" style={{ color: '#fff' }}>
                        🏛️ Federal Bank<div className="vc-partner-sub">Trusted since 1931</div>
                    </div>
                    <div className="vc-partner" style={{ color: '#fff' }}>
                        💼 RBL Bank<div className="vc-partner-sub">Retail Banking Partner</div>
                    </div>
                </div>
                <div className="vc-stats" style={{ marginTop: '14px' }}>
                    <div className="vc-stat" style={{ color: '#4ade80' }}>
                        <div className="vc-stat-val">5M+</div>
                        <div className="vc-stat-label">Users</div>
                    </div>
                    <div className="vc-stat" style={{ color: '#4ade80' }}>
                        <div className="vc-stat-val">50+</div>
                        <div className="vc-stat-label">Years Trust</div>
                    </div>
                </div>
            </>
        )
    },
    {
        id: 'onboarding-card',
        wrapperStyle: {
            background: 'linear-gradient(160deg,#1e0a2e 0%,#2d1b69 100%)'
        },
        blobStyle: {
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle,rgba(196,181,253,.15),transparent 70%)',
            top: '-20px',
            left: '-20px'
        },
        badge: { text: 'Onboarding', style: { background: 'rgba(196,181,253,.15)', color: '#c4b5fd' } },
        title: 'Credit Builder Membership',
        sub: 'Build your credit score in 3 simple steps',
        content: (
            <>
                <div style={{ margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                        ['✅', 'Link your account', '30 sec'],
                        ['📊', 'Get your score', 'Instant'],
                        ['🚀', 'Start building', 'Today']
                    ].map(([emoji, headline, detail]) => (
                        <div key={headline} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,.07)', borderRadius: '12px', padding: '10px 12px' }}>
                            <span style={{ fontSize: '18px' }}>{emoji}</span>
                            <div>
                                <div style={{ fontSize: '12px', fontWeight: 600, color: '#e9d5ff' }}>{headline}</div>
                                <div style={{ fontSize: '10px', color: '#a78bfa' }}>{detail}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ background: 'linear-gradient(135deg,#7c3aed,#4c1d95)', borderRadius: '100px', padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#fff', marginTop: 'auto' }}>
                    Get Started →
                </div>
            </>
        )
    },
    {
        id: 'feedback-card',
        wrapperStyle: {
            background: 'linear-gradient(160deg,#0a1628 0%,#0f2044 100%)'
        },
        blobStyle: {
            width: '160px',
            height: '160px',
            background: 'radial-gradient(circle,rgba(59,130,246,.2),transparent 70%)',
            top: '30px',
            right: '-10px'
        },
        badge: { text: 'Feedback', style: { background: 'rgba(59,130,246,.15)', color: '#93c5fd' } },
        title: 'How was your experience?',
        sub: 'Rate us to help improve Moneyview',
        content: (
            <>
                <div style={{ display: 'flex', gap: '6px', margin: '16px 0', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {Array.from({ length: 10 }, (_, index) => (
                        <div key={index} style={{ width: '18px', height: '18px', borderRadius: '5px', background: index < 8 ? 'rgba(59,130,246,.5)' : 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#fff', fontWeight: 700 }}>
                            {index + 1}
                        </div>
                    ))}
                </div>
                <div className="vc-score" style={{ color: '#3b82f6', textAlign: 'center' }}>8.4</div>
                <div className="vc-score-label" style={{ color: '#93c5fd', textAlign: 'center' }}>Average NPS Score</div>
                <div className="vc-stats">
                    <div className="vc-stat" style={{ color: '#4ade80' }}>
                        <div className="vc-stat-val">↑12%</div>
                        <div className="vc-stat-label">vs last month</div>
                    </div>
                    <div className="vc-stat" style={{ color: '#93c5fd' }}>
                        <div className="vc-stat-val">2.4k</div>
                        <div className="vc-stat-label">Responses</div>
                    </div>
                </div>
            </>
        )
    }
];

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const heroSubRef = useRef(null);

    const tickerRepeats = useMemo(
        () => Array.from({ length: 4 }, () => tags).flat(),
        []
    );

    useEffect(() => {
        const elementList = document.querySelectorAll('a,button,.pc,.itag,.id-card');
        const addClass = () => document.body.classList.add('ch');
        const removeClass = () => document.body.classList.remove('ch');

        elementList.forEach((el) => {
            el.addEventListener('mouseenter', addClass);
            el.addEventListener('mouseleave', removeClass);
        });

        return () => {
            elementList.forEach((el) => {
                el.removeEventListener('mouseenter', addClass);
                el.removeEventListener('mouseleave', removeClass);
            });
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = sidebarOpen || navOpen || isLoading ? 'hidden' : '';
    }, [sidebarOpen, navOpen, isLoading]);

    useEffect(() => {
        const timer = window.setTimeout(() => setIsLoading(false), 2800);
        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        const el = heroSubRef.current;
        if (!el) return;

        const text = 'Started as a curious problem-solver, found my way to code. Now I build fast, scalable web and mobile products that deliver results.';
        el.textContent = '';
        el.style.opacity = '1';
        el.style.animation = 'none';

        const cursor = document.createElement('span');
        cursor.className = 'tw-cursor';
        el.appendChild(cursor);

        let index = 0;
        const timeoutId = window.setTimeout(() => {
            const intervalId = window.setInterval(() => {
                if (index < text.length) {
                    el.insertBefore(document.createTextNode(text[index]), cursor);
                    index += 1;
                } else {
                    clearInterval(intervalId);
                    window.setTimeout(() => {
                        cursor.style.transition = 'opacity .6s';
                        cursor.style.opacity = '0';
                    }, 2000);
                }
            }, 20);
        }, 1400);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('vis');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.rv').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const countUp = (el) => {
            const target = Number(el.dataset.c || '0');
            const suffix = el.dataset.s || '';
            let start = 0;

            const step = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / 1300, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                el.textContent = `${Math.floor(ease * target)}${suffix}`;
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = `${target}${suffix}`;
                }
            };

            requestAnimationFrame(step);
        };

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        countUp(entry.target);
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        document.querySelectorAll('.sn').forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);


    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                setNavOpen(false);
                setSidebarOpen(false);
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
        <>
            {isLoading && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: '#080810',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        animation: 'loaderFadeOut 0.45s ease 2.35s both'
                    }}
                >
                    <DecryptedText
                        text="SANDEEP"
                        speed={200}
                        maxIterations={14}
                        sequential
                        revealDirection="start"
                        animateOn="view"
                        className="font-black tracking-[0.18em] text-white"
                        encryptedClassName="font-black tracking-[0.18em] text-white/15"
                        parentClassName="block"
                        style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)', fontFamily: 'Roboto Mono, monospace', lineHeight: 1 }}
                    />
                    <DecryptedText
                        text="NAYAK"
                        speed={42}
                        maxIterations={18}
                        sequential
                        revealDirection="end"
                        animateOn="view"
                        className="font-black tracking-[0.28em]"
                        encryptedClassName="font-black tracking-[0.28em] text-white/10"
                        parentClassName="block"
                        style={{
                            fontSize: 'clamp(3rem, 10vw, 7.5rem)',
                            fontFamily: 'Roboto Mono, monospace',
                            lineHeight: 1,
                            background: 'linear-gradient(120deg,#c4b5fd 0%,#a78bfa 45%,#7c3aed 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    />
                    <p style={{
                        marginTop: '18px',
                        fontSize: '11px',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: 'rgba(167,139,250,0.5)',
                        fontFamily: 'Roboto Mono, monospace',
                        animation: 'loaderImgIn 0.6s ease 0.6s both'
                    }}>
                        Frontend Developer
                    </p>
                </div>
            )}

            {/* LineWaves full-page background */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <LineWaves
                    speed={0.3}
                    innerLineCount={32}
                    outerLineCount={36}
                    warpIntensity={1.0}
                    rotation={-45}
                    edgeFadeWidth={0.0}
                    colorCycleSpeed={1.0}
                    brightness={0.18}
                    color1="#A855F7"
                    color2="#A855F7"
                    color3="#7C3AED"
                    enableMouseInteraction={true}
                    mouseInfluence={2.0}
                />
            </div>

            <SplashCursor
                DENSITY_DISSIPATION={3.5}
                VELOCITY_DISSIPATION={2}
                PRESSURE={0.1}
                CURL={3}
                SPLAT_RADIUS={0.2}
                SPLAT_FORCE={6000}
                COLOR_UPDATE_SPEED={10}
                SHADING
                RAINBOW_MODE={false}
                COLOR="#A855F7"
            />

            <div className={`sb-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />

            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <button className="sb-close" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                    ✕
                </button>
                <div className="sb-avatar-wrap">
                    <div className="sb-avatar">
                        <img src="/sandeep_nayak.jpeg" alt="Sandeep Nayak" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </div>
                </div>
                <div className="sb-otw">💼 Open to Work</div>
                <div className="sb-name">Sandeep Nayak</div>
                <div className="sb-handle">
                    <span>@sandeepnayak</span>
                    <span className="sep">·</span>
                    <span>📍 India</span>
                </div>
                <div className="sb-role">Frontend Developer</div>
                <div className="sb-divider" />
                <div className="sb-exp-label">2 Years Experience Includes:</div>
                <div className="sb-exp-row">
                    <div className="sb-logo sb-logo-zet">
                        <img src="/zipto.jpeg" alt="Zipto" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />
                    </div>
                    <div className="sb-exp-text">
                        Zipto Hyperlogistic Pvt. Ltd.
                        <div className="sb-exp-sub">Frontend Developer</div>
                    </div>
                </div>
                <div className="sb-exp-row">
                    <div className="sb-logo sb-logo-mv" style={{ background: '#fff' }}>
                        <img src="/centurion_logo.png" alt="Centurion University" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px', padding: '4px', background: '#fff' }} />
                    </div>
                    <div className="sb-exp-text">
                        Centurion University
                        <div className="sb-exp-sub">Developer</div>
                    </div>
                </div>
                <div className="sb-btns">
                    <button className="sb-btn-msg" onClick={() => window.location.href = 'mailto:sandeepnayak1724@gmail.com'}>
                        ✉ Message
                    </button>
                    <button className="sb-btn-save" title="Save profile">🔖</button>
                </div>
            </aside>

            <div className="site-wrap">
                <nav id="mainNav">
                    <BorderBeam duration={8} colorFrom="#a78bfa" colorTo="#7c3aed" thickness={1} />
                    <a href="#hero" className="nav-logo">SN</a>
                    <div className="nav-links">
                        <a href="#hero">Home</a>
                        <a href="#projects">Projects</a>
                        <a href="#about-me">About</a>
                        <a href="#collab">Contact</a>
                        <a href="#" className="nav-cta">Resume ↗</a>
                    </div>
                    <button className="nav-hamburger" onClick={() => setNavOpen(true)} aria-label="Open menu">
                        <span />
                        <span />
                        <span />
                    </button>
                </nav>

                <div className={`nav-drawer ${navOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
                    <button className="nav-drawer-close" onClick={() => setNavOpen(false)} aria-label="Close">
                        ✕
                    </button>
                    <a href="#hero" onClick={() => setNavOpen(false)}>Home</a>
                    <a href="#projects" onClick={() => setNavOpen(false)}>Projects</a>
                    <a href="#about-me" onClick={() => setNavOpen(false)}>About</a>
                    <a href="#collab" onClick={() => setNavOpen(false)}>Contact</a>
                    <a href="#" onClick={(event) => { event.preventDefault(); setNavOpen(false); setSidebarOpen(true); }}>Profile</a>
                    <div className="nd-line" />
                    <a href="#" className="nav-cta" onClick={(event) => { event.preventDefault(); setNavOpen(false); }}>Resume ↗</a>
                </div>

                <section id="hero" style={{ overflow: 'visible' }}>
                    <div className="hero-grid" />
                    <div className="eyebrow">
                        Hello 👋, great to have you here
                        <span className="eyebrow-cursor" />
                    </div>
                    <h1 className="hero-heading">I'm a Developer<br />in React Native</h1>
                    <p className="hero-sub" ref={heroSubRef} />
                    <div className="hero-ctas">
                        <a href="#projects" className="btn-p">View Projects</a>
                        <a href="#collab" className="btn-o">Get in Touch</a>
                    </div>
                    <div className="scroll-ind">Scroll<div className="s-line" /></div>
                    {/* Full-width so card can swing anywhere in hero without being clipped */}
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
                        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} fov={16} />
                    </div>
                </section>

                <div className="ticker-wrap">
                    <div className="ticker-track">
                        {tickerRepeats.map((item, index) => (
                            <span key={`tk1-${item}-${index}`} className="t-item"><span className="t-dot" />{item}</span>
                        ))}
                    </div>
                </div>

                <section id="projects">
                    <div className="sec-label">Featured Work</div>
                    <h2 className="sec-title rv">Featured Projects</h2>
                    <div className="pg">
                        <a href="#" className="pc feat rv">
                            <BorderBeam duration={6} delay={0} />
                            <div className="p-arrow">↗</div>
                            <span className="p-tag">Mobile App</span>
                            <div className="p-title">Reducing Drop-Offs in a Complex Credit Card Onboarding Flow</div>
                            <p className="p-desc">Redesigned the ZET credit card journey to reduce friction and improve conversion through clearer IA and progressive disclosure.</p>
                        </a>
                        <a href="#" className="pc rv d1">
                            <BorderBeam duration={6} delay={-1.5} />
                            <div className="p-arrow">↗</div>
                            <span className="p-tag">Mobile App</span>
                            <div className="p-title">Improving Credit Builder Membership Conversions by 6%</div>
                            <p className="p-desc">Redesigned CBM onboarding to reduce drop-offs and drive repeat revenue at ZET.</p>
                        </a>
                        <a href="#" className="pc rv d2">
                            <BorderBeam duration={6} delay={-3} />
                            <div className="p-arrow">↗</div>
                            <span className="p-tag">Mobile App</span>
                            <div className="p-title">Boosting NPS Scores through Better User Engagement</div>
                            <p className="p-desc">Improved Moneyview's in-app feedback touchpoints to lift satisfaction scores.</p>
                        </a>
                        <a href="#" className="pc rv d3">
                            <BorderBeam duration={6} delay={-4.5} />
                            <div className="p-arrow">↗</div>
                            <span className="p-tag">Mobile App &amp; Website</span>
                            <div className="p-title">Designed a Seamless User Deletion Flow</div>
                            <p className="p-desc">Implemented a compliant, clear account deletion experience across Moneyview's surfaces.</p>
                        </a>
                    </div>
                </section>

                <div className="ticker-wrap">
                    <div className="ticker-track">
                        {tickerRepeats.map((item, index) => (
                            <span key={`tk2-${item}-${index}`} className="t-item"><span className="t-dot" />{item}</span>
                        ))}
                    </div>
                </div>

                <div className="vis-sec">
                    <div className="sec-label">Visual Work</div>
                    <div style={{ overflow: 'hidden' }}>
                        <div className="vt" id="vt">
                            {visualCards.concat(visualCards).map((card, idx) => (
                                <div key={`${card.id}-${idx}`} className="vc" style={card.wrapperStyle}>
                                    <BorderBeam duration={5} delay={-(idx * 0.7)} colorFrom="#a78bfa" colorTo="#e9d5ff" thickness={1} />
                                    <div className="vc-blob" style={card.blobStyle} />
                                    <div className="vc-inner">
                                        <div className="vc-statusbar"><span>9:41</span><span>●●●</span></div>
                                        {card.badge && (
                                            <div className="vc-badge" style={card.badge.style}>
                                                <span className="vc-badge-dot" />{card.badge.text}
                                            </div>
                                        )}
                                        <div className="vc-title" style={{ color: '#fff', fontSize: card.badge ? undefined : '15px' }}>{card.title}</div>
                                        {card.sub && <div className="vc-sub" style={{ color: card.badge ? undefined : '#c4b5fd' }}>{card.sub}</div>}
                                        {card.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <section id="about-me">
                    <div className="sec-label">About me</div>
                    <div className="ag">
                        <div className="at rv">
                            <h2 className="sec-title">A Bit About Me</h2>
                            <p><span className="hl">Passionate about building great user experiences through code.</span> I specialise in React Native for cross-platform mobile apps and React for the web — shipping clean, performant products.</p>
                            <p>I love turning complex problems into <span className="hl">simple, intuitive interfaces</span> — whether it's a mobile app or a full web platform — integrating <span className="hl">modern tooling</span> in my workflow.</p>
                            <p>Beyond code, I enjoy <span>gaming</span>, <span>Chess ♜</span>, tech gadgets and open-source exploration.</p>
                            <div className="tags">
                                <span className="itag">React Native</span><span className="itag">React</span>
                                <span className="itag">JavaScript</span><span className="itag">TypeScript</span>
                                <span className="itag">Mobile Apps</span><span className="itag">Web Apps</span>
                                <span className="itag">Immediate Joiner</span>
                            </div>
                            <div className="stats-row">
                                <div>
                                    <div className="sn" data-c="2">0</div>
                                    <div className="sl">Years Exp.</div>
                                </div>
                                <div>
                                    <div className="sn" data-c="10" data-s="+">0</div>
                                    <div className="sl">Projects</div>
                                </div>
                                <div>
                                    <div className="sn" data-c="2" data-s="+">0</div>
                                    <div className="sl">Companies</div>
                                </div>
                            </div>
                        </div>
                        <div className="a-img rv d2">
                            <ProfileCard
                                name="Sandeep Nayak"
                                title="Frontend Developer"
                                handle="sandeepnayak"
                                status="Open to Work"
                                contactText="Contact Me"
                                avatarUrl="/sandeep.jpeg"
                                showUserInfo={true}
                                enableTilt={true}
                                enableMobileTilt={false}
                                onContactClick={() => { window.location.href = 'mailto:sandeepnayak1724@gmail.com'; }}
                                behindGlowColor="rgba(125, 190, 255, 0.67)"
                                behindGlowEnabled
                                innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                            />
                        </div>
                    </div>
                </section>

                <section id="collab">
                    <div className="ci rv">
                        <BorderBeam duration={7} colorFrom="#c4b5fd" colorTo="#7c3aed" thickness={1.5} />
                        <div className="c-badge">Open to Work</div>
                        <h2 className="c-title">Available for<br />New Challenges</h2>
                        <p className="c-sub">Open to new roles, feedback, or a simple coffee chat.</p>
                        <a href="mailto:sandeepnayak1724@gmail.com" className="btn-p" style={{ fontSize: '15px', padding: '15px 34px' }}>sandeepnayak1724@gmail.com ↗</a>
                        <div className="globe-wrap">
                            <Globe />
                        </div>
                        <div className="c-links">
                            <a href="https://www.linkedin.com/in/naga-sai-parasa-050a50183/" className="c-link" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                            <a href="https://medium.com/@nagasaiparasa" className="c-link" target="_blank" rel="noreferrer">Medium ↗</a>
                            <a href="https://www.behance.net/nagasaiparasa" className="c-link" target="_blank" rel="noreferrer">Behance ↗</a>
                            <a href="https://www.instagram.com/niran_designer/" className="c-link" target="_blank" rel="noreferrer">Instagram ↗</a>
                        </div>
                    </div>
                </section>

                <footer>
                    <span>© Sandeep Nayak 2025</span>
                    <span>Developer · India</span>
                </footer>
            </div>
        </>
    );
}
