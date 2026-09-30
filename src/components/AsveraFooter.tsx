import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface AsveraFooterProps {
  onOpenCategory: (category: 'T-SHIRTS' | 'SHIRTS' | 'HOODIES' | 'BOTTOMS') => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenInnerCircle: () => void;
  onTriggerToast: (message: string) => void;
  onEnterWomen?: () => void;
}

/**
 * Original 3D Sculptural Flowing Heavyweight Fabric / Silk-Cotton Ribbon Canvas
 * Rendered in ASVÉRA's signature palette:
 * Dark Cherry (#3A0D16), Deep Burgundy (#5A1724), Deep Plum (#241329),
 * Rich Plum (#3A1E42), Muted Champagne (#B8A58D), Warm Cream (#F3EBDD),
 * Soft Ivory (#FAF6EF), and Near Black (#111014).
 */
const SculpturalFabricCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.0085;

      // Smooth pointer interpolation
      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.05;
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.05;

      const px = pointerRef.current.x;
      const py = pointerRef.current.y;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Atmospheric Studio Backdrop
      const bgGrad = ctx.createRadialGradient(
        width * (0.52 + px * 0.05),
        height * (0.48 + py * 0.05),
        height * 0.05,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.78
      );
      bgGrad.addColorStop(0, '#3A1E42'); // Rich Plum core glow
      bgGrad.addColorStop(0.38, '#3A0D16'); // Dark Cherry mid-field
      bgGrad.addColorStop(0.72, '#241329'); // Deep Plum shadow
      bgGrad.addColorStop(1, '#111014'); // Near Black vignette
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle warm champagne ambient light bloom
      const bloomGrad = ctx.createRadialGradient(
        width * (0.35 + px * 0.08),
        height * (0.38 + py * 0.06),
        10,
        width * 0.35,
        height * 0.38,
        width * 0.45
      );
      bloomGrad.addColorStop(0, 'rgba(243, 235, 221, 0.14)');
      bloomGrad.addColorStop(0.45, 'rgba(184, 165, 141, 0.06)');
      bloomGrad.addColorStop(1, 'rgba(17, 16, 20, 0)');
      ctx.fillStyle = bloomGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Sculptural 3D Flowing Heavyweight Fabric Ribbon Strips
      // We project a continuous twisted 3D ribbon surface composed of fine cross-sectional filaments
      // and shaded quad strips with specular ivory/champagne highlights and deep cherry/plum folds.
      const numRibbons = 3;

      for (let r = 0; r < numRibbons; r++) {
        const ribbonOffset = r * 2.15;
        const segments = 150;
        const ribbonHalfWidth =
          (r === 1 ? height * 0.31 : height * 0.22) * (width < 640 ? 0.78 : 1);

        const topEdge: Array<{ x: number; y: number; z: number; nx: number; ny: number }> = [];
        const bottomEdge: Array<{ x: number; y: number; z: number; nx: number; ny: number }> = [];

        for (let i = 0; i <= segments; i++) {
          const u = i / segments; // 0 to 1 across width
          const xBase = -width * 0.08 + u * (width * 1.16);

          // Flowing 3D spline center
          const wave1 = Math.sin(u * Math.PI * 2.2 + time * 1.1 + ribbonOffset);
          const wave2 = Math.cos(u * Math.PI * 3.4 - time * 0.75 + ribbonOffset * 0.7);
          const wave3 = Math.sin(u * Math.PI * 1.3 + time * 0.5 + r);

          const yCenter =
            height * 0.52 +
            wave1 * (height * 0.18) +
            wave2 * (height * 0.09) +
            py * 24 * (r === 1 ? 1 : -0.6);

          const zCenter =
            Math.cos(u * Math.PI * 2.2 + time * 1.1 + ribbonOffset) * 90 +
            wave3 * 45;

          // 3D twist angle along the fabric length
          const twistAngle =
            u * Math.PI * (r === 1 ? 2.6 : 2.1) +
            time * (r === 1 ? 0.65 : -0.5) +
            ribbonOffset +
            px * 0.45;

          const cosT = Math.cos(twistAngle);
          const sinT = Math.sin(twistAngle);

          // Perspective scale from z depth
          const perspective = 1 + zCenter / 520;
          const halfW = ribbonHalfWidth * perspective * (0.65 + 0.35 * Math.sin(u * Math.PI));

          // Offset vectors for ribbon width in 3D space
          const dx = -sinT * halfW * 0.36;
          const dy = cosT * halfW;

          topEdge.push({
            x: xBase + dx,
            y: yCenter - dy,
            z: zCenter + sinT * 40,
            nx: sinT,
            ny: cosT,
          });

          bottomEdge.push({
            x: xBase - dx,
            y: yCenter + dy,
            z: zCenter - sinT * 40,
            nx: sinT,
            ny: cosT,
          });
        }

        // Draw quad strips along the ribbon with studio lighting calculation
        for (let i = 0; i < segments; i++) {
          const t0 = topEdge[i];
          const t1 = topEdge[i + 1];
          const b0 = bottomEdge[i];
          const b1 = bottomEdge[i + 1];

          // Compute surface normal & lighting intensity
          const normalY = (t0.ny + t1.ny) * 0.5;
          const normalX = (t0.nx + t1.nx) * 0.5;

          // Studio key light from upper-left + rim light from lower-right
          const keyLight = Math.max(0, normalY * 0.75 + normalX * 0.65);
          const rimLight = Math.pow(Math.max(0, 1 - Math.abs(normalY)), 3.2);
          const shadowDepth = Math.max(0, -normalY);

          const quadGrad = ctx.createLinearGradient(t0.x, t0.y, b0.x, b0.y);

          if (r === 1) {
            // Primary Foreground Hero Fabric Fold (Dark Cherry -> Burgundy -> Champagne/Ivory Rim)
            const highlightAlpha = Math.min(0.95, 0.18 + keyLight * 0.55 + rimLight * 0.45);
            quadGrad.addColorStop(0, `rgba(250, 246, 239, ${highlightAlpha * 0.88})`); // Soft Ivory edge catch
            quadGrad.addColorStop(0.18, `rgba(184, 165, 141, ${0.28 + keyLight * 0.42})`); // Muted Champagne sheen
            quadGrad.addColorStop(0.48, `rgba(90, 23, 36, ${0.88 - shadowDepth * 0.25})`); // Deep Burgundy body
            quadGrad.addColorStop(0.82, `rgba(58, 13, 22, 0.95)`); // Dark Cherry fold
            quadGrad.addColorStop(1, `rgba(36, 19, 41, 0.92)`); // Deep Plum shadow edge
          } else if (r === 0) {
            // Secondary Background Drape (Deep Plum -> Rich Plum -> Warm Cream Rim)
            quadGrad.addColorStop(0, `rgba(243, 235, 221, ${0.1 + rimLight * 0.32})`);
            quadGrad.addColorStop(0.35, `rgba(58, 30, 66, ${0.65 + keyLight * 0.25})`);
            quadGrad.addColorStop(0.75, `rgba(36, 19, 41, 0.85)`);
            quadGrad.addColorStop(1, `rgba(17, 16, 20, 0.9)`);
          } else {
            // Tertiary Sculptural Silk Accents (Burgundy / Champagne translucent veil)
            quadGrad.addColorStop(0, `rgba(250, 246, 239, ${0.12 + rimLight * 0.38})`);
            quadGrad.addColorStop(0.3, `rgba(184, 165, 141, ${0.16 + keyLight * 0.28})`);
            quadGrad.addColorStop(0.7, `rgba(90, 23, 36, 0.72)`);
            quadGrad.addColorStop(1, `rgba(58, 13, 22, 0.82)`);
          }

          ctx.beginPath();
          ctx.moveTo(t0.x, t0.y);
          ctx.lineTo(t1.x, t1.y);
          ctx.lineTo(b1.x, b1.y);
          ctx.lineTo(b0.x, b0.y);
          ctx.closePath();
          ctx.fillStyle = quadGrad;
          ctx.fill();
        }

        // Draw woven textile warp threads along the ribbon for tactile heavyweight fabric feel
        const threadCount = r === 1 ? 9 : 5;
        for (let th = 0; th <= threadCount; th++) {
          const frac = th / threadCount;
          ctx.beginPath();
          for (let i = 0; i <= segments; i++) {
            const tx = topEdge[i].x + (bottomEdge[i].x - topEdge[i].x) * frac;
            const ty = topEdge[i].y + (bottomEdge[i].y - topEdge[i].y) * frac;
            if (i === 0) {
              ctx.moveTo(tx, ty);
            } else {
              ctx.lineTo(tx, ty);
            }
          }
          const isEdge = th === 0 || th === threadCount;
          ctx.strokeStyle = isEdge
            ? r === 1
              ? 'rgba(250, 246, 239, 0.42)'
              : 'rgba(184, 165, 141, 0.24)'
            : 'rgba(243, 235, 221, 0.07)';
          ctx.lineWidth = isEdge ? 1.25 : 0.65;
          ctx.stroke();
        }
      }

      // 3. Subtle Cinematic Edge Vignette inside the rounded container
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        height * 0.25,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.72
      );
      vignette.addColorStop(0, 'rgba(17, 16, 20, 0)');
      vignette.addColorStop(1, 'rgba(17, 16, 20, 0.58)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    pointerRef.current.targetX = normX;
    pointerRef.current.targetY = normY;
  };

  const handlePointerLeave = () => {
    pointerRef.current.targetX = 0;
    pointerRef.current.targetY = 0;
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-[270px] sm:h-[340px] md:h-[400px] lg:h-[430px] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#111014] border border-[#B8A58D]/20 shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        aria-label="ASVÉRA abstract 3D sculptural flowing heavyweight fabric form"
      />

      {/* Subtle Editorial Corner Coordinates / Atelier Stamp */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-7 flex items-end justify-between text-[10px] tracking-[0.26em] text-[#FAF6EF]/65 uppercase">
        <span>ATELIER FORM · 480 GSM DRAPE STUDY</span>
        <span className="hidden sm:inline">ASVÉRA ARCHIVE — INDIA</span>
      </div>
    </div>
  );
};

export const AsveraFooter: React.FC<AsveraFooterProps> = ({
  onOpenCategory,
  onScrollToSection,
  onOpenInnerCircle,
  onTriggerToast,
  onEnterWomen,
}) => {
  return (
    <footer
      id="final-cta"
      className="relative w-full bg-[#111014] text-[#FAF6EF] pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-8 md:px-12 lg:px-[52px] border-t border-[#B8A58D]/15"
    >
      {/* Outer Editorial Frame inspired by modern luxury monograph layout */}
      <div className="max-w-[1440px] mx-auto rounded-[28px] sm:rounded-[40px] bg-gradient-to-b from-[#241329]/85 via-[#1A0D1E]/95 to-[#111014] border border-[#B8A58D]/15 p-6 sm:p-10 md:p-14 lg:p-16 shadow-2xl">
        {/* 1. Top Micro-Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 sm:pb-12 border-b border-[#B8A58D]/15">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onScrollToSection('top');
            }}
            className="font-brand text-[26px] sm:text-[32px] tracking-[0.08em] text-[#FAF6EF] leading-none uppercase cursor-pointer"
          >
            ASVÉRA
          </a>

          <span className="hidden md:inline-block text-[11px] tracking-[0.26em] text-[#B8A58D] uppercase">
            CONTEMPORARY INDIAN STREETWEAR · EST. 2025
          </span>

          <div className="flex items-center gap-5 sm:gap-7 text-[11px] tracking-[0.2em] text-[#F3EBDD]/80 uppercase">
            <button
              type="button"
              onClick={() => onScrollToSection('collections')}
              className="hover:text-[#FAF6EF] transition-colors cursor-pointer"
            >
              SHOP MEN
            </button>
            {onEnterWomen && (
              <button
                type="button"
                onClick={onEnterWomen}
                className="hover:text-[#FAF6EF] text-[#E8C7C8] transition-colors cursor-pointer"
              >
                WOMEN&apos;S COLLECTION →
              </button>
            )}
            <button
              type="button"
              onClick={() => onScrollToSection('new-arrivals')}
              className="hover:text-[#FAF6EF] transition-colors cursor-pointer"
            >
              NEW DROP
            </button>
            <button
              type="button"
              onClick={onOpenInnerCircle}
              className="inline-flex items-center gap-1 text-[#FAF6EF] border-b border-[#B8A58D]/50 pb-0.5 hover:border-[#FAF6EF] transition-colors cursor-pointer"
            >
              <span>INNER CIRCLE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Editorial Headline & Supporting Text */}
        <div className="mt-10 sm:mt-14 mb-10 sm:mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <span className="block text-[10px] sm:text-[11px] tracking-[0.28em] text-[#B8A58D] uppercase mb-4">
              09 — FINAL STATEMENT
            </span>
            <h2 className="font-brand text-[52px] sm:text-[72px] md:text-[86px] lg:text-[96px] font-normal leading-[0.9] tracking-[0.02em] text-[#FAF6EF] uppercase">
              <span className="block">WHERE IDENTITY</span>
              <span className="block text-[#F3EBDD]">MEETS FORM.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-2 flex flex-col items-start lg:items-end justify-end">
            <p className="text-[15px] sm:text-[16px] leading-[1.75] text-[#F3EBDD]/85 max-w-[400px] lg:text-right">
              Premium Indian streetwear, built with intention.
              <br />
              Designed in India for those who define their own identity.
            </p>
          </div>
        </div>

        {/* 3. Large Horizontal Rounded Center Visual — Original 3D Flowing Fabric Form */}
        <SculpturalFabricCanvas />

        {/* 4. Clean Editorial Navigation Columns */}
        <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-[#B8A58D]/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Signature Column */}
          <div className="lg:col-span-4 space-y-4">
            <span className="block font-brand text-[32px] tracking-[0.08em] text-[#FAF6EF] uppercase leading-none">
              ASVÉRA
            </span>
            <p className="text-[13.5px] leading-[1.7] text-[#B8A58D] max-w-[300px]">
              Heavyweight silhouettes, single-origin Indian cotton and modern
              architectural proportions. Crafted for permanence.
            </p>
            <div className="pt-1 text-[11px] tracking-[0.22em] text-[#F3EBDD]/70 uppercase">
              MUMBAI · NEW DELHI · BENGALURU
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-[11px] tracking-[0.26em] text-[#B8A58D] uppercase">
              SHOP MEN
            </h3>
            <ul className="space-y-2.5 text-[13.5px]">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCategory('T-SHIRTS')}
                  className="group inline-flex items-center gap-2 text-[#FAF6EF] hover:text-[#F3EBDD] transition-colors cursor-pointer"
                >
                  <span>T-Shirts</span>
                  <span className="text-[10px] tracking-[0.18em] text-[#B8A58D] uppercase">
                    EXPLORE →
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCategory('SHIRTS')}
                  className="inline-flex items-center gap-2 text-[#F3EBDD]/75 hover:text-[#FAF6EF] transition-colors cursor-pointer"
                >
                  <span>Shirts</span>
                  <span className="text-[10px] tracking-[0.16em] text-[#B8A58D]/65 uppercase">
                    · Coming Soon
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCategory('HOODIES')}
                  className="inline-flex items-center gap-2 text-[#F3EBDD]/75 hover:text-[#FAF6EF] transition-colors cursor-pointer"
                >
                  <span>Hoodies</span>
                  <span className="text-[10px] tracking-[0.16em] text-[#B8A58D]/65 uppercase">
                    · Coming Soon
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCategory('BOTTOMS')}
                  className="inline-flex items-center gap-2 text-[#F3EBDD]/75 hover:text-[#FAF6EF] transition-colors cursor-pointer"
                >
                  <span>Bottoms</span>
                  <span className="text-[10px] tracking-[0.16em] text-[#B8A58D]/65 uppercase">
                    · Coming Soon
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: EDITORIAL ARCHIVE */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-[11px] tracking-[0.26em] text-[#B8A58D] uppercase">
              EDITORIAL
            </h3>
            <ul className="space-y-2.5 text-[13.5px] text-[#F3EBDD]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('new-arrivals')}
                  className="hover:text-[#FAF6EF] transition-colors cursor-pointer"
                >
                  New Drop
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('mens-edit')}
                  className="hover:text-[#FAF6EF] transition-colors cursor-pointer"
                >
                  Men&apos;s Edit — Silhouette
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('asvera-standard')}
                  className="hover:text-[#FAF6EF] transition-colors cursor-pointer"
                >
                  The ASVÉRA Standard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('lookbook')}
                  className="hover:text-[#FAF6EF] transition-colors cursor-pointer"
                >
                  Campaign Lookbook
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('our-story')}
                  className="hover:text-[#FAF6EF] transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: CONNECT */}
          <div className="lg:col-span-2 space-y-3.5">
            <h3 className="text-[11px] tracking-[0.26em] text-[#B8A58D] uppercase">
              CONNECT
            </h3>
            <ul className="space-y-2.5 text-[13.5px] text-[#F3EBDD]/80">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onTriggerToast('Opening @asvera.official Instagram dispatch.')
                  }
                  className="hover:text-[#FAF6EF] transition-colors cursor-pointer"
                >
                  Instagram
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenInnerCircle}
                  className="hover:text-[#FAF6EF] transition-colors cursor-pointer"
                >
                  Private Access
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onTriggerToast('Client Concierge: concierge@asvera.in')
                  }
                  className="hover:text-[#FAF6EF] transition-colors cursor-pointer"
                >
                  Concierge
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 5. Bottom Legal & Origin Bar */}
        <div className="mt-12 pt-6 border-t border-[#B8A58D]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.2em] text-[#B8A58D] uppercase">
          <span>© 2025 ASVÉRA — ALL RIGHTS RESERVED</span>
          <span>DESIGNED IN INDIA · BUILT WITH INTENTION</span>
        </div>
      </div>
    </footer>
  );
};

export default AsveraFooter;
