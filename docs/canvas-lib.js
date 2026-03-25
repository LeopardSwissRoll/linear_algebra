/* ================================================================
   MyAcademy — 캔버스 유틸리티 라이브러리
   수업 HTML에서 공통으로 쓰는 2D 캔버스 드로잉/인터랙션
   ================================================================ */

// ───── 수학 유틸 ─────
function dot(a, b)    { return a.x * b.x + a.y * b.y; }
function mag(v)       { return Math.sqrt(v.x * v.x + v.y * v.y); }
function norm(v)      { const m = mag(v); return m > 1e-9 ? { x: v.x/m, y: v.y/m } : { x: 0, y: 0 }; }
function dist(a, b)   { return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2); }
function vadd(a, b)   { return { x: a.x + b.x, y: a.y + b.y }; }
function vsub(a, b)   { return { x: a.x - b.x, y: a.y - b.y }; }
function vscale(v, s) { return { x: v.x * s, y: v.y * s }; }
function vlerp(a, b, t) { return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }; }

// ───── 색상 팔레트 (CSS 변수와 동기화) ─────
const PALETTE = {
    grid:     'rgba(60,60,110,0.25)',
    axis:     'rgba(90,90,140,0.5)',
    axisLabel:'rgba(120,120,170,0.6)',
    vecA:     '#e8c840',
    vecB:     '#58c4dd',
    vecC:     '#83c167',
    proj:     '#fc6255',
    perp:     'rgba(252,98,85,0.35)',
    arc:      'rgba(171,107,219,0.8)',
    arcFill:  'rgba(171,107,219,0.08)',
    positive: '#83c167',
    negative: '#fc6255',
    zero:     '#e8c840',
    accent:   '#ab6bdb',
    bgInner:  '#0e0e1f',
    bgOuter:  '#080812',
};

/* ================================================================
   createCanvas(id, options?)
   캔버스 초기화 + 드로잉 헬퍼 + 드래그 시스템 반환
   options: { width, height, unit, arrowSize, handleR, handleRHover, arcR, colors }
   ================================================================ */
function createCanvas(id, options = {}) {
    const W     = options.width  || 600;
    const H     = options.height || 600;
    const UNIT  = options.unit   || 50;
    const CX    = W / 2, CY = H / 2;
    const ARROW = options.arrowSize   || 14;
    const HR    = options.handleR     || 10;
    const HRH   = options.handleRHover|| 14;
    const ARC_R = options.arcR        || 38;
    const colors = Object.assign({}, PALETTE, options.colors);

    const cvs = document.getElementById(id);
    const ctx = cvs.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    cvs.width  = W * dpr;
    cvs.height = H * dpr;
    cvs.style.width  = W + 'px';
    cvs.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    let _rafPending = false;

    // ───── 좌표 변환 ─────
    function toS(v)      { return { x: CX + v.x * UNIT, y: CY - v.y * UNIT }; }
    function toW(sx, sy) { return { x: (sx - CX) / UNIT, y: (CY - sy) / UNIT }; }
    function mousePos(e) {
        const r = cvs.getBoundingClientRect();
        return { x: (e.clientX - r.left) * W / r.width,
                 y: (e.clientY - r.top)  * H / r.height };
    }

    // ───── 배경 & 격자 ─────
    function clear() {
        ctx.clearRect(0, 0, W, H);
        const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, W * 0.7);
        g.addColorStop(0, colors.bgInner);
        g.addColorStop(1, colors.bgOuter);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
    }

    function drawGrid() {
        const lo  = Math.floor(-CX / UNIT), hi  = Math.ceil((W - CX) / UNIT);
        const lo2 = Math.floor(-CY / UNIT), hi2 = Math.ceil((H - CY) / UNIT);

        ctx.strokeStyle = colors.grid; ctx.lineWidth = 1;
        for (let i = lo; i <= hi; i++) {
            if (!i) continue;
            const x = CX + i * UNIT;
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        }
        for (let j = lo2; j <= hi2; j++) {
            if (!j) continue;
            const y = CY + j * UNIT;
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }

        ctx.strokeStyle = colors.axis; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(0, CY); ctx.lineTo(W, CY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(CX, 0); ctx.lineTo(CX, H); ctx.stroke();

        ctx.fillStyle = colors.axisLabel;
        ctx.font = '11px Consolas, monospace';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        for (let i = lo; i <= hi; i++) { if (!i) continue; ctx.fillText(i, CX + i * UNIT, CY + 6); }
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        for (let j = lo2; j <= hi2; j++) { if (!j) continue; ctx.fillText(-j, CX - 6, CY + j * UNIT); }

        ctx.beginPath(); ctx.arc(CX, CY, 3, 0, Math.PI * 2);
        ctx.fillStyle = colors.axis; ctx.fill();
    }

    // ───── 기본 도형 ─────
    function arrowhead(fx, fy, tx, ty, color) {
        const a = Math.atan2(ty - fy, tx - fx);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx - ARROW * Math.cos(a - Math.PI / 7), ty - ARROW * Math.sin(a - Math.PI / 7));
        ctx.lineTo(tx - ARROW * Math.cos(a + Math.PI / 7), ty - ARROW * Math.sin(a + Math.PI / 7));
        ctx.closePath(); ctx.fill();
    }

    function drawVector(v, color, label) {
        return drawVectorFrom({ x: 0, y: 0 }, v, color, label);
    }

    function drawVectorFrom(from, to, color, label) {
        const o = toS(from), tip = toS(to);
        const sLen = dist(o, tip);
        if (sLen < 5) return;

        ctx.save();
        ctx.shadowColor = color; ctx.shadowBlur = 6;
        ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(tip.x, tip.y); ctx.stroke();
        arrowhead(o.x, o.y, tip.x, tip.y, color);
        ctx.restore();

        if (label) {
            const d = { x: (tip.x - o.x) / sLen, y: (tip.y - o.y) / sLen };
            ctx.fillStyle = color;
            ctx.font = 'bold italic 16px serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(label, tip.x + d.x * 18, tip.y + d.y * 18);
        }
    }

    function drawPoint(v, color, label) {
        const s = toS(v);
        ctx.beginPath(); ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1.5; ctx.stroke();
        if (label) {
            ctx.fillStyle = color;
            ctx.font = '13px "Noto Sans KR", sans-serif';
            ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
            ctx.fillText(label, s.x + 10, s.y - 6);
        }
    }

    function drawHandle(v, color, hovered) {
        const t = toS(v);
        const r = hovered ? HRH : HR;
        ctx.beginPath(); ctx.arc(t.x, t.y, r, 0, Math.PI * 2);
        ctx.fillStyle = color + '33'; ctx.fill();
        ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
    }

    function drawDashed(from, to, color, lineWidth, pattern) {
        const a = toS(from), b = toS(to);
        ctx.strokeStyle = color; ctx.lineWidth = lineWidth || 2;
        ctx.setLineDash(pattern || [6, 4]);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        ctx.setLineDash([]);
    }

    // ───── 각도 호 ─────
    function drawAngleArc(vA, vB, label) {
        if (mag(vA) < 1e-9 || mag(vB) < 1e-9) return;
        const o = toS({ x: 0, y: 0 }), tA = toS(vA), tB = toS(vB);
        const angA = Math.atan2(tA.y - o.y, tA.x - o.x);
        const angB = Math.atan2(tB.y - o.y, tB.x - o.x);

        let diff = angB - angA;
        while (diff >  Math.PI) diff -= 2 * Math.PI;
        while (diff < -Math.PI) diff += 2 * Math.PI;

        ctx.beginPath(); ctx.moveTo(o.x, o.y);
        ctx.arc(o.x, o.y, ARC_R, angA, angA + diff, diff < 0);
        ctx.closePath(); ctx.fillStyle = colors.arcFill; ctx.fill();

        ctx.beginPath();
        ctx.arc(o.x, o.y, ARC_R, angA, angA + diff, diff < 0);
        ctx.strokeStyle = colors.arc; ctx.lineWidth = 2; ctx.stroke();

        const mid = angA + diff / 2;
        ctx.fillStyle = colors.arc;
        ctx.font = 'italic 14px serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(label || 'θ', o.x + Math.cos(mid) * (ARC_R + 14),
                                    o.y + Math.sin(mid) * (ARC_R + 14));
    }

    // ───── 투영 시각화 ─────
    // base에 target을 사영. showRightAngle=true면 직각 표시
    function drawProjection(base, target, showRightAngle) {
        const dBB = dot(base, base);
        if (dBB < 1e-9) return;

        const s  = dot(base, target) / dBB;
        const pv = vscale(base, s);
        const o  = toS({ x: 0, y: 0 });
        const pt = toS(pv);
        const tt = toS(target);

        // 사영 벡터 (base 위)
        ctx.strokeStyle = colors.proj; ctx.lineWidth = 3;
        ctx.setLineDash([8, 4]);
        ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(pt.x, pt.y); ctx.stroke();
        ctx.setLineDash([]);

        // 수선 (target 끝 → 사영점)
        ctx.strokeStyle = colors.perp; ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(tt.x, tt.y); ctx.lineTo(pt.x, pt.y); ctx.stroke();
        ctx.setLineDash([]);

        // 직각 표시
        if (showRightAngle !== false) {
            const pDir = { x: tt.x - pt.x, y: tt.y - pt.y };
            const pL = Math.sqrt(pDir.x ** 2 + pDir.y ** 2);
            const aDir = { x: pt.x - o.x, y: pt.y - o.y };
            const aL = Math.sqrt(aDir.x ** 2 + aDir.y ** 2);
            if (pL > 8 && aL > 8) {
                const pn = { x: pDir.x / pL, y: pDir.y / pL };
                const an = { x: aDir.x / aL, y: aDir.y / aL };
                const sz = 10;
                ctx.strokeStyle = 'rgba(252,98,85,0.5)'; ctx.lineWidth = 1.5;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(pt.x + pn.x * sz, pt.y + pn.y * sz);
                ctx.lineTo(pt.x + pn.x * sz + an.x * sz, pt.y + pn.y * sz + an.y * sz);
                ctx.lineTo(pt.x + an.x * sz, pt.y + an.y * sz);
                ctx.stroke();
            }
        }

        // 사영점
        ctx.beginPath(); ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = colors.proj; ctx.fill();
    }

    // ───── 텍스트 ─────
    function drawText(worldPos, text, color, options = {}) {
        const s = toS(worldPos);
        ctx.fillStyle = color;
        ctx.font = options.font || '13px "Noto Sans KR", sans-serif';
        ctx.textAlign = options.align || 'left';
        ctx.textBaseline = options.baseline || 'middle';
        ctx.fillText(text, s.x + (options.dx || 0), s.y + (options.dy || 0));
    }

    // ───── rAF 스케줄러 ─────
    function scheduleRender(fn) {
        if (!_rafPending) {
            _rafPending = true;
            requestAnimationFrame(() => { _rafPending = false; fn(); });
        }
    }

    // ───── 드래그 시스템 ─────
    // vectors: [{ id, get:()=>vec, set:(v)=>void, color }]
    function makeDraggable(vectors, renderFn, options = {}) {
        const snapGet = options.snapGetter || (() => false);
        const clamp   = options.clamp || 5.8;
        let dragging = null, hovering = null;

        function hitTest(mx, my) {
            for (const v of vectors) {
                if (dist({ x: mx, y: my }, toS(v.get())) < 22) return v.id;
            }
            return null;
        }

        function applyDrag(pos) {
            let w = toW(pos.x, pos.y);
            if (snapGet()) { w.x = Math.round(w.x); w.y = Math.round(w.y); }
            w.x = Math.max(-clamp, Math.min(clamp, w.x));
            w.y = Math.max(-clamp, Math.min(clamp, w.y));
            const t = vectors.find(v => v.id === dragging);
            if (t) t.set(w);
            scheduleRender(renderFn);
        }

        cvs.addEventListener('mousedown', e => {
            const hit = hitTest(...Object.values(mousePos(e)));
            if (hit) { dragging = hit; cvs.style.cursor = 'grabbing'; }
        });
        cvs.addEventListener('mousemove', e => {
            const p = mousePos(e);
            if (dragging) { applyDrag(p); }
            else {
                const h = hitTest(p.x, p.y);
                if (h !== hovering) { hovering = h; cvs.style.cursor = h ? 'grab' : 'default'; scheduleRender(renderFn); }
            }
        });
        cvs.addEventListener('mouseup',    () => { dragging = null; cvs.style.cursor = hovering ? 'grab' : 'default'; });
        cvs.addEventListener('mouseleave', () => { dragging = null; hovering = null; cvs.style.cursor = 'default'; scheduleRender(renderFn); });

        // 터치
        cvs.addEventListener('touchstart', e => {
            e.preventDefault();
            const t = e.touches[0], r = cvs.getBoundingClientRect();
            const p = { x: (t.clientX - r.left) * W / r.width, y: (t.clientY - r.top) * H / r.height };
            const hit = hitTest(p.x, p.y);
            if (hit) dragging = hit;
        }, { passive: false });
        cvs.addEventListener('touchmove', e => {
            e.preventDefault();
            if (!dragging) return;
            const t = e.touches[0], r = cvs.getBoundingClientRect();
            applyDrag({ x: (t.clientX - r.left) * W / r.width, y: (t.clientY - r.top) * H / r.height });
        }, { passive: false });
        cvs.addEventListener('touchend', () => { dragging = null; });

        return {
            isHovered(id) { return hovering === id; },
            reset() { dragging = null; hovering = null; }
        };
    }

    // ───── Public API ─────
    return {
        cvs, ctx, W, H, UNIT, CX, CY, colors,
        toS, toW, mousePos,
        clear, drawGrid,
        arrowhead, drawVector, drawVectorFrom,
        drawPoint, drawHandle, drawDashed,
        drawAngleArc, drawProjection, drawText,
        scheduleRender, makeDraggable,
    };
}
