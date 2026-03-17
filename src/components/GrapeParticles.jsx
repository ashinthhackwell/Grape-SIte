import React, { useRef, useEffect } from 'react';

const GrapeParticles = ({ mousePos, hoverState, cardRects }) => {
    const canvasRef = useRef(null);
    const stateRef = useRef({ mousePos, hoverState, cardRects });

    useEffect(() => {
        stateRef.current = { mousePos, hoverState, cardRects };
    }, [mousePos, hoverState, cardRects]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        let animationFrameId;

        // Base resolution scaling
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        const SPACING = 24;
        let particles = [];
        let enterpriseShape = [];
        let teamsShape = [];

        // Organic grape colors
        const grapeColors = [
            [147, 51, 234], // grapeBlue
            [168, 85, 247], // grapePurp
            [126, 34, 206], // grapeDark
            [192, 132, 252], // lightPurp
            [34, 197, 94]    // grapeGreen
        ];

        const buildShapes = () => {
            enterpriseShape = [];
            const S = 2.0;

            // Grape cluster matching the EXACT logo geometry
            // 3-2-1 cascading cluster, NOT centered rows
            // The cluster leans slightly right, berries overlap
            const R = 38 * S;  // Berry radius — large overlapping circles

            // Hand-placed positions matching the logo pixel-by-pixel
            // The logo's grapes are arranged as an inverted triangle cluster:
            //
            //         ● (center-top, highest)
            //       /   \
            //     ●       ● (left + right, lower)
            //      \     /
            //       ●   ● (bottom-left + bottom-right)
            //        \ /
            //         ● (bottom center)

            const circles = [
                // TOP CLUSTER (3 grapes forming inverted triangle)
                // Center-top: sits between left+right, slightly higher
                { x: 5 * S, y: -57 * S, r: R, c: grapeColors[0] },
                // Left: down-left, dark purple — overlaps center
                { x: -52 * S, y: -33 * S, r: R, c: grapeColors[2] },
                // Right: down-right, light pink — overlaps center
                { x: 55 * S, y: -37 * S, r: R, c: grapeColors[3] },

                // MIDDLE PAIR (2 grapes nestled between top cluster)
                // Bottom-left: between left and center, magenta-purple
                { x: -28 * S, y: 25 * S, r: R * 0.92, c: grapeColors[1] },
                // Bottom-right: between center and right, light purple
                { x: 32 * S, y: 23 * S, r: R * 0.92, c: grapeColors[3] },

                // BOTTOM (1 grape centered under middle pair)
                { x: 3 * S, y: 75 * S, r: R * 0.85, c: grapeColors[1] }
            ];

            circles.forEach(circle => {
                // Main ring — thick outline (particles along circumference)
                const mainDots = 85;
                for (let i = 0; i < mainDots; i++) {
                    const theta = (i / mainDots) * Math.PI * 2 + Math.random() * 0.1;
                    const jitter = (Math.random() - 0.5) * 7;
                    enterpriseShape.push({
                        x: circle.x + (circle.r + jitter) * Math.cos(theta),
                        y: circle.y + (circle.r + jitter) * Math.sin(theta),
                        color: circle.c
                    });
                }

                // Inner accent ring — lighter shade for depth
                const innerR = circle.r * 0.55;
                const innerDots = 40;
                const lighterColor = [
                    Math.min(255, circle.c[0] + 50),
                    Math.min(255, circle.c[1] + 50),
                    Math.min(255, circle.c[2] + 50)
                ];
                for (let i = 0; i < innerDots; i++) {
                    const theta = (i / innerDots) * Math.PI * 2 + Math.random() * 0.15;
                    const jitter = (Math.random() - 0.5) * 4;
                    enterpriseShape.push({
                        x: circle.x + (innerR + jitter) * Math.cos(theta),
                        y: circle.y + (innerR + jitter) * Math.sin(theta),
                        color: lighterColor
                    });
                }
            });

            // Grape Leaf — above center-top grape, slightly right, touching
            const leafCx = 22 * S;
            const leafCy = -57 * S - R * 1.5;  // Starts from the edge of center berry
            const leafLen = 26 * S;
            const leafWidth = 12 * S;
            const leafAngle = -Math.PI / 4;
            const leafDots = 220;
            for (let i = 0; i < leafDots; i++) {
                const u = (Math.random() * 2 - 1);
                const maxW = leafWidth * Math.sqrt(1 - u * u);
                const v = (Math.random() * 2 - 1) * maxW;
                const lx = u * leafLen;
                const ly = v;
                const rx = lx * Math.cos(leafAngle) - ly * Math.sin(leafAngle);
                const ry = lx * Math.sin(leafAngle) + ly * Math.cos(leafAngle);
                enterpriseShape.push({
                    x: leafCx + rx,
                    y: leafCy + ry,
                    color: grapeColors[4]
                });
            }

            // Randomize order for uniform global attraction
            for (let i = enterpriseShape.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [enterpriseShape[i], enterpriseShape[j]] = [enterpriseShape[j], enterpriseShape[i]];
            }

            // === LEFT SIDE: Developer Circle Cluster ===
            teamsShape = [];
            const devColors = [
                [34, 197, 94],    // emerald green
                [16, 185, 129],   // teal
                [5, 150, 105],    // deep green
                [52, 211, 153],   // mint
                [20, 184, 166],   // cyan-teal
                [4, 120, 87],     // forest green
                [74, 222, 128],   // lime
                [45, 212, 191]    // turquoise
            ];

            const D = 2.0;
            const ringRadius = 115 * D;  // Larger ring to cover the text area
            const ballRadius = 40 * D;   // Bigger balls
            const numBalls = 8;

            // Place 8 balls evenly around a large circle (vine ring)
            const devCircles = [];
            for (let i = 0; i < numBalls; i++) {
                const angle = (i / numBalls) * Math.PI * 2 - Math.PI / 2; // Start from top
                devCircles.push({
                    x: ringRadius * Math.cos(angle),
                    y: ringRadius * Math.sin(angle),
                    r: ballRadius,
                    c: devColors[i % devColors.length]
                });
            }

            devCircles.forEach(circle => {
                // Filled circle dots
                const dots = Math.floor((Math.PI * circle.r * circle.r) / 70);
                for (let i = 0; i < dots; i++) {
                    const isEdge = Math.random() > 0.8;
                    const r = isEdge ? circle.r * (0.8 + 0.2 * Math.random()) : Math.sqrt(Math.random()) * circle.r;
                    const theta = Math.random() * 2 * Math.PI;
                    teamsShape.push({
                        x: circle.x + r * Math.cos(theta),
                        y: circle.y + r * Math.sin(theta),
                        color: circle.c
                    });
                }

                // Concentric ring outlines (halo/aura)
                const ringRadii = [circle.r * 1.5, circle.r * 2.1, circle.r * 2.7];
                const ringDots = [35, 25, 18];
                ringRadii.forEach((ringR, ri) => {
                    const fade = 0.5 - ri * 0.12;
                    const fadedColor = [
                        Math.round(circle.c[0] * fade + 180 * (1 - fade)),
                        Math.round(circle.c[1] * fade + 180 * (1 - fade)),
                        Math.round(circle.c[2] * fade + 180 * (1 - fade))
                    ];
                    for (let i = 0; i < ringDots[ri]; i++) {
                        const theta = (i / ringDots[ri]) * Math.PI * 2 + Math.random() * 0.15;
                        const jitter = (Math.random() - 0.5) * 4;
                        teamsShape.push({
                            x: circle.x + (ringR + jitter) * Math.cos(theta),
                            y: circle.y + (ringR + jitter) * Math.sin(theta),
                            color: fadedColor
                        });
                    }
                });
            });

            // Randomize order
            for (let i = teamsShape.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [teamsShape[i], teamsShape[j]] = [teamsShape[j], teamsShape[i]];
            }
        };

        const initParticles = () => {
            particles = [];
            if (width === 0 || height === 0) return;

            buildShapes();

            // Truly random particle placement — NO grid structure at all
            const totalParticles = Math.floor((width * height) / (SPACING * SPACING));
            for (let i = 0; i < totalParticles; i++) {
                const randX = Math.random() * width;
                const randY = Math.random() * height;

                particles.push({
                    ox: randX, oy: randY,
                    x: randX, y: randY,
                    vx: 0, vy: 0,
                    baseR: 160, baseG: 165, baseB: 175,
                    cr: 160, cg: 165, cb: 175,
                    size: 2.5 + Math.random() * 1.5,
                    rank: -1,
                    teamsRank: -1,
                    rOffset: Math.random() * 20,
                    cIdx: Math.floor(Math.random() * grapeColors.length),
                    phase: Math.random() * Math.PI * 2,
                    driftSpeed: 0.3 + Math.random() * 0.5
                });
            }

            // === Right side: assign enterprise shape ranks ===
            const shapeSize = enterpriseShape.length;
            let shapeAssignIndex = 0;
            const rightParticles = particles.filter(p => p.ox > width * 0.45);
            for (let i = rightParticles.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [rightParticles[i], rightParticles[j]] = [rightParticles[j], rightParticles[i]];
            }
            rightParticles.forEach((p) => {
                if (Math.random() > 0.05) {
                    p.rank = shapeAssignIndex % shapeSize;
                    shapeAssignIndex++;
                }
            });

            // === Left side: assign teams shape ranks ===
            const teamsSize = teamsShape.length;
            let teamsAssignIndex = 0;
            const leftParticles = particles.filter(p => p.ox < width * 0.55);
            for (let i = leftParticles.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [leftParticles[i], leftParticles[j]] = [leftParticles[j], leftParticles[i]];
            }
            leftParticles.forEach((p) => {
                if (Math.random() > 0.05) {
                    p.teamsRank = teamsAssignIndex % teamsSize;
                    teamsAssignIndex++;
                }
            });
        };

        // Initialize immediately but also wait a tick in case CSS causes late layout shifts
        initParticles();
        setTimeout(initParticles, 100);

        const resizeObserver = new ResizeObserver(() => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
            initParticles();
        });
        resizeObserver.observe(canvas);

        // Off-screen culling: stop rendering aggressively when scrolled away
        let isVisible = true;
        const visibilityObserver = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0.1, rootMargin: '-80px 0px' }
        );
        visibilityObserver.observe(canvas);

        // Smooth transition states
        let formationStrength = 0;     // Right side (enterprise/grape)
        let teamsFormation = 0;        // Left side (teams/code brackets)
        let lastCardX = 0, lastCardY = 0;
        let lastTeamsX = 0, lastTeamsY = 0;

        const render = () => {
            animationFrameId = requestAnimationFrame(render);
            if (!isVisible) return; // Skip rendering entirely when off-screen
            ctx.clearRect(0, 0, width, height);
            const { mousePos, hoverState, cardRects } = stateRef.current;
            const t = Date.now() * 0.001;

            const INTERACTION_RADIUS = 180;
            const isEnterpriseHover = hoverState === 'enterprise' && cardRects?.enterprise && enterpriseShape.length > 0;
            const isTeamsHover = hoverState === 'teams' && cardRects?.teams && teamsShape.length > 0;

            if (isEnterpriseHover) { lastCardX = cardRects.enterprise.x; lastCardY = cardRects.enterprise.y; }
            if (isTeamsHover) { lastTeamsX = cardRects.teams.x; lastTeamsY = cardRects.teams.y; }
            const activeCx = lastCardX;
            const activeCy = lastCardY;
            const teamsCx = lastTeamsX;
            const teamsCy = lastTeamsY;

            // Asymmetric fade: snappy formation, smooth deformation
            const targetStrength = isEnterpriseHover ? 1 : 0;
            const fadeRate = isEnterpriseHover ? 0.20 : 0.09;
            formationStrength += (targetStrength - formationStrength) * fadeRate;
            if (formationStrength < 0.03) formationStrength = 0;
            if (formationStrength > 0.999) formationStrength = 1;

            const teamsTarget = isTeamsHover ? 1 : 0;
            const teamsFade = isTeamsHover ? 0.20 : 0.09;
            teamsFormation += (teamsTarget - teamsFormation) * teamsFade;
            if (teamsFormation < 0.03) teamsFormation = 0;
            if (teamsFormation > 0.999) teamsFormation = 1;

            // Set glowing sand blend mode (additive rendering)
            ctx.globalCompositeOperation = "lighter";

            // Pre-compute shared values outside the particle loop
            const anyForming = formationStrength > 0.01 || teamsFormation > 0.01;
            const colorSpeed = anyForming ? 0.03 : 0.08;
            const hasMouse = mousePos && mousePos.x > 0 && mousePos.y > 0;
            const enterpriseFirst = formationStrength >= teamsFormation;
            const activeStrength = Math.max(formationStrength, teamsFormation);
            const shapeCx = formationStrength > teamsFormation ? activeCx : teamsCx;
            const shapeCy = formationStrength > teamsFormation ? activeCy : teamsCy;
            const sinT15 = Math.sin(t * 1.5);

            // Reusable target color array (avoid per-particle allocation)
            const tc = [0, 0, 0];

            for (let idx = 0, len = particles.length; idx < len; idx++) {
                const p = particles[idx];
                let tx = p.ox;
                let ty = p.oy;
                tc[0] = p.baseR; tc[1] = p.baseG; tc[2] = p.baseB;
                let isHovered = false;
                let isFormingShape = false;

                const hasShape = p.rank !== -1 && p.rank < enterpriseShape.length;
                const hasTeams = p.teamsRank !== -1 && p.teamsRank < teamsShape.length;

                // Primary/secondary selection
                const priHas = enterpriseFirst ? hasShape : hasTeams;
                const priStr = enterpriseFirst ? formationStrength : teamsFormation;
                const priRank = enterpriseFirst ? p.rank : p.teamsRank;
                const priShape = enterpriseFirst ? enterpriseShape : teamsShape;
                const priCx = enterpriseFirst ? activeCx : teamsCx;
                const priCy = enterpriseFirst ? activeCy : teamsCy;

                // Try primary shape
                if (priHas && priStr > 0) {
                    const sp = priShape[priRank];
                    if (sp) {
                        let sTx = priCx + sp.x;
                        let sTy = priCy + sp.y;
                        if (priStr > 0.5) {
                            const alive = (priStr - 0.5) * 2;
                            const phase = t * 1.2 + priRank * 0.15;
                            sTx += Math.sin(phase) * 4.0 * alive;
                            sTy += Math.cos(phase * 0.7) * 3.5 * alive;
                            const pulse = Math.sin(t * 0.6 + priRank * 0.05) * 2.0 * alive;
                            sTx += pulse; sTy += pulse * 0.6;
                            sTx += Math.sin(t * 0.4 + p.phase) * 1.5 * alive;
                            sTy += Math.cos(t * 0.3 + p.phase * 1.7) * 1.5 * alive;
                        }
                        tx = p.ox + (sTx - p.ox) * priStr;
                        ty = p.oy + (sTy - p.oy) * priStr;
                        tc[0] = p.baseR + (sp.color[0] - p.baseR) * priStr;
                        tc[1] = p.baseG + (sp.color[1] - p.baseG) * priStr;
                        tc[2] = p.baseB + (sp.color[2] - p.baseB) * priStr;
                        isFormingShape = true;
                    }
                }

                // Try secondary shape
                if (!isFormingShape) {
                    const secHas = enterpriseFirst ? hasTeams : hasShape;
                    const secStr = enterpriseFirst ? teamsFormation : formationStrength;
                    if (secHas && secStr > 0) {
                        const secRank = enterpriseFirst ? p.teamsRank : p.rank;
                        const secShape = enterpriseFirst ? teamsShape : enterpriseShape;
                        const secCx = enterpriseFirst ? teamsCx : activeCx;
                        const secCy = enterpriseFirst ? teamsCy : activeCy;
                        const sp = secShape[secRank];
                        if (sp) {
                            let sTx = secCx + sp.x;
                            let sTy = secCy + sp.y;
                            if (secStr > 0.5) {
                                const alive = (secStr - 0.5) * 2;
                                const phase = t * 1.2 + secRank * 0.12;
                                sTx += Math.sin(phase) * 4.0 * alive;
                                sTy += Math.cos(phase * 0.8) * 3.5 * alive;
                                const pulse = Math.sin(t * 0.6 + secRank * 0.05) * 2.0 * alive;
                                sTx += pulse; sTy += pulse * 0.6;
                                sTx += Math.sin(t * 0.4 + p.phase) * 1.5 * alive;
                                sTy += Math.cos(t * 0.3 + p.phase * 1.7) * 1.5 * alive;
                            }
                            tx = p.ox + (sTx - p.ox) * secStr;
                            ty = p.oy + (sTy - p.oy) * secStr;
                            tc[0] = p.baseR + (sp.color[0] - p.baseR) * secStr;
                            tc[1] = p.baseG + (sp.color[1] - p.baseG) * secStr;
                            tc[2] = p.baseB + (sp.color[2] - p.baseB) * secStr;
                            isFormingShape = true;
                        }
                    }
                }

                // Non-shape: mouse interaction
                if (!isFormingShape && hasMouse) {
                    const dx = mousePos.x - p.ox;
                    const dy = mousePos.y - p.oy;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < INTERACTION_RADIUS * INTERACTION_RADIUS) {
                        const originDist = Math.sqrt(distSq);
                        isHovered = true;
                        const angle = p.ox * 10 + sinT15 * 2;
                        const clusterX = mousePos.x + Math.cos(angle) * p.rOffset * 3;
                        const clusterY = mousePos.y + Math.sin(angle) * p.rOffset * 3;
                        const intensity = Math.pow(1 - (originDist / INTERACTION_RADIUS), 1.5);
                        tx = p.ox + (clusterX - p.ox) * intensity;
                        ty = p.oy + (clusterY - p.oy) * intensity;
                        const gc = grapeColors[p.cIdx];
                        tc[0] = gc[0]; tc[1] = gc[1]; tc[2] = gc[2];
                    } else if (distSq < 14400) { // 120*120
                        const distA = Math.sqrt(distSq);
                        const force = (120 - distA) / 120;
                        tx -= (dx / distA) * force * 15;
                        ty -= (dy / distA) * force * 15;
                    }
                }

                // Non-forming: sparsity push/pull
                if (!isFormingShape && activeStrength > 0.01) {
                    const dx = p.ox - shapeCx;
                    const dy = p.oy - shapeCy;
                    const distSq = dx * dx + dy * dy;
                    if (distSq > 100) { // > 10*10
                        const dist = Math.sqrt(distSq);
                        if (dist < 200 && activeStrength < 0.85) {
                            const pullForce = activeStrength * 3 * (1 - dist / 200);
                            const invDist = 1 / dist;
                            tx -= dx * invDist * pullForce;
                            ty -= dy * invDist * pullForce;
                            tx += (-dy) * invDist * pullForce * 0.3;
                            ty += dx * invDist * pullForce * 0.3;
                        } else {
                            const pushForce = activeStrength * 30 / Math.max(dist * 0.3, 1);
                            const invDist = 1 / dist;
                            tx += dx * invDist * pushForce;
                            ty += dy * invDist * pushForce;
                        }
                    }
                }

                // Ambient idle drift
                if (!isFormingShape && !isHovered) {
                    tx += Math.sin(t * p.driftSpeed + p.phase) * 5.0;
                    ty += Math.cos(t * p.driftSpeed * 0.7 + p.phase * 1.3) * 4.0;
                }

                // Physics
                const dxP = tx - p.x;
                const dyP = ty - p.y;
                const isActivelyForming = isFormingShape && (isEnterpriseHover || isTeamsHover);
                if (isActivelyForming) {
                    const distSq = dxP * dxP + dyP * dyP;
                    const dist = Math.sqrt(distSq);
                    const spring = dist > 100 ? 0.06 + (dist - 100) * 0.0004 : 0.06;
                    const swirl = dist > 800 ? 0.008 : 0.003 + dist * 0.00001;
                    p.vx = dxP * spring - dyP * swirl;
                    p.vy = dyP * spring + dxP * swirl;
                } else if (isFormingShape) {
                    p.vx += dxP * 0.06;
                    p.vy += dyP * 0.06;
                    p.vx *= 0.82;
                    p.vy *= 0.82;
                } else {
                    const lerpSpeed = isHovered ? 0.08 : 0.02;
                    p.vx += dxP * lerpSpeed;
                    p.vy += dyP * lerpSpeed;
                    p.vx *= 0.85;
                    p.vy *= 0.85;
                }
                p.x += p.vx;
                p.y += p.vy;

                // Color lerp
                p.cr += (tc[0] - p.cr) * colorSpeed;
                p.cg += (tc[1] - p.cg) * colorSpeed;
                p.cb += (tc[2] - p.cb) * colorSpeed;

                // Render
                const activeFormation = Math.max(
                    hasShape && formationStrength > 0 ? formationStrength : 0,
                    hasTeams && teamsFormation > 0 ? teamsFormation : 0
                );
                const renderSize = p.size + (4.0 - p.size) * activeFormation;
                const alpha = 0.6 + Math.sin(t * 0.8 + p.phase) * 0.1 + 0.3 * activeFormation;
                ctx.fillStyle = `rgba(${p.cr + 0.5 | 0},${p.cg + 0.5 | 0},${p.cb + 0.5 | 0},${alpha.toFixed(2)})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, renderSize * 0.5, 0, 6.283);
                ctx.fill();
            }

            ctx.globalCompositeOperation = "source-over";
        };
        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
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
                pointerEvents: 'none', // Critical so it doesn't block the UI buttons
                zIndex: 0
            }}
        />
    );
};

export default GrapeParticles;
