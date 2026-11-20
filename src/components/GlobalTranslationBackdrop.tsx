import { useEffect, useRef } from 'react';
import { clampDeltaSec, dampValue } from '../utils/motionPhysics';

interface GlobalTranslationBackdropProps {
  activePageIndex: number;
}

interface NebulaMood {
  globeX: number;
  globeY: number;
}

const SLIDE_MOODS: readonly NebulaMood[] = [
  { globeX: 0.5, globeY: 0.48 },
  { globeX: 0.72, globeY: 0.46 },
  { globeX: 0.28, globeY: 0.52 },
  { globeX: 0.34, globeY: 0.48 },
  { globeX: 0.66, globeY: 0.54 },
  { globeX: 0.5, globeY: 0.44 },
  { globeX: 0.5, globeY: 0.5 },
];

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  isWarm: boolean;
  depth: number;
  phase: number;
}

interface OrbitGlyph {
  char: string;
  orbitRadiusFactor: number;
  baseAngle: number;
  speed: number;
  ringTiltX: number;
  ringTiltZ: number;
  size: number;
  isWarm: boolean;
  bobPhase: number;
}

// Rich multilingual script constellation: Arabic, English, French, Spanish, German, Chinese, Japanese, Korean, Russian, Hindi
const MULTILINGUAL_CHARS = [
  'ع', 'ض', 'ق',
  'A', 'R', 'T',
  'É', 'Ç', 'Ñ', 'Ü',
  '译', '文', '翻', '訳',
  '언', 'Я', 'Д', 'अ',
] as const;

const PARTICLE_COUNT = 22;

export function GlobalTranslationBackdrop({ activePageIndex }: GlobalTranslationBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mistPrimaryRef = useRef<HTMLDivElement | null>(null);
  const mistSecondaryRef = useRef<HTMLDivElement | null>(null);
  const pageIndexRef = useRef(activePageIndex);
  pageIndexRef.current = activePageIndex;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastNow = performance.now();

    let smoothPage = pageIndexRef.current;
    const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

    // Velocities are in normalized viewport units per second for frame-rate independent smoothness
    const particles: DustParticle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: (i * 0.173 + 0.04) % 1,
      y: (i * 0.257 + 0.06) % 1,
      vx: (i % 2 === 0 ? 1 : -1) * (0.0055 + (i % 4) * 0.0016),
      vy: -(0.0052 + (i % 3) * 0.0018),
      r: 1.15 + (i % 3) * 0.6,
      alpha: 0.26 + (i % 4) * 0.08,
      isWarm: i % 5 === 0,
      depth: 0.42 + (i % 4) * 0.22,
      phase: i * 0.85,
    }));

    const orbitGlyphs: OrbitGlyph[] = MULTILINGUAL_CHARS.map((char, i) => {
      const ringIndex = i % 3;
      const ringRadius = ringIndex === 0 ? 1.18 : ringIndex === 1 ? 1.38 : 1.56;
      const ringTiltX = ringIndex === 0 ? 0.34 : ringIndex === 1 ? -0.28 : 0.14;
      const ringTiltZ = ringIndex === 0 ? -0.18 : ringIndex === 1 ? 0.24 : -0.06;
      return {
        char,
        orbitRadiusFactor: ringRadius,
        baseAngle: (i / MULTILINGUAL_CHARS.length) * Math.PI * 2,
        speed: (ringIndex === 1 ? -1 : 1) * (0.11 + ringIndex * 0.025),
        ringTiltX,
        ringTiltZ,
        size: ringIndex === 0 ? 20 : ringIndex === 1 ? 18 : 16,
        isWarm: i % 6 === 2,
        bobPhase: i * 0.85,
      };
    });

    // Pre-render high-DPI multilingual character sprites once so rAF never triggers per-frame font shaping
    const SPRITE_SIZE = 64;
    const glyphSprites = orbitGlyphs.map((g) => {
      const off = document.createElement('canvas');
      off.width = SPRITE_SIZE;
      off.height = SPRITE_SIZE;
      const octx = off.getContext('2d');
      if (octx) {
        const half = SPRITE_SIZE / 2;
        const halo = octx.createRadialGradient(half, half, 2, half, half, 24);
        if (g.isWarm) {
          halo.addColorStop(0, 'rgba(243, 211, 122, 0.22)');
          halo.addColorStop(0.65, 'rgba(243, 211, 122, 0.07)');
          halo.addColorStop(1, 'rgba(243, 211, 122, 0)');
        } else {
          halo.addColorStop(0, 'rgba(56, 240, 232, 0.24)');
          halo.addColorStop(0.65, 'rgba(56, 240, 232, 0.08)');
          halo.addColorStop(1, 'rgba(56, 240, 232, 0)');
        }
        octx.fillStyle = halo;
        octx.beginPath();
        octx.arc(half, half, 24, 0, Math.PI * 2);
        octx.fill();

        octx.textAlign = 'center';
        octx.textBaseline = 'middle';
        octx.font = `600 26px "Plus Jakarta Sans", "Cairo", sans-serif`;
        octx.fillStyle = g.isWarm ? '#F5E098' : '#94F8F2';
        octx.fillText(g.char, half, half + 1);
      }
      return off;
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handlePointerMove = (e: PointerEvent) => {
      if (window.innerWidth < 1024) return;
      pointer.targetX = Math.max(0, Math.min(1, e.clientX / Math.max(1, window.innerWidth)));
      pointer.targetY = Math.max(0, Math.min(1, e.clientY / Math.max(1, window.innerHeight)));
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleVisibility = () => {
      if (!document.hidden) {
        lastNow = performance.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let time = 0;

    const drawMultilingualGlobe = (
      cx: number,
      cy: number,
      radius: number,
      rotY: number,
      tiltX: number,
      heroIntensity: number
    ) => {
      const cosTilt = Math.cos(tiltX);
      const sinTilt = Math.sin(tiltX);

      const projectSphere = (lat: number, lon: number) => {
        const cosLat = Math.cos(lat);
        const x3 = cosLat * Math.sin(lon + rotY);
        const y3 = Math.sin(lat);
        const z3 = cosLat * Math.cos(lon + rotY);

        const yt = y3 * cosTilt - z3 * sinTilt;
        const zt = y3 * sinTilt + z3 * cosTilt;
        return {
          x: cx + x3 * radius,
          y: cy + yt * radius,
          z: zt,
        };
      };

      const projectOrbitPoint = (
        angle: number,
        rFactor: number,
        rTiltX: number,
        rTiltZ: number
      ) => {
        const x0 = Math.cos(angle) * rFactor;
        const z0 = Math.sin(angle) * rFactor;

        const rx = rTiltX + tiltX * 0.55;
        const y1 = -z0 * Math.sin(rx);
        const z1 = z0 * Math.cos(rx);

        const cosRz = Math.cos(rTiltZ);
        const sinRz = Math.sin(rTiltZ);
        const x2 = x0 * cosRz - y1 * sinRz;
        const y2 = x0 * sinRz + y1 * cosRz;

        return {
          x: cx + x2 * radius,
          y: cy + y2 * radius,
          z: z1,
        };
      };

      // Silky high-resolution outer orbital guide rings around the globe
      const orbitRings = [
        { rFactor: 1.18, tiltX: 0.34, tiltZ: -0.18, alpha: 0.13 * heroIntensity + 0.05 },
        { rFactor: 1.38, tiltX: -0.28, tiltZ: 0.24, alpha: 0.105 * heroIntensity + 0.04 },
        { rFactor: 1.56, tiltX: 0.14, tiltZ: -0.06, alpha: 0.085 * heroIntensity + 0.03 },
      ];

      for (const ring of orbitRings) {
        ctx.beginPath();
        const steps = 48;
        for (let i = 0; i <= steps; i++) {
          const a = (i / steps) * Math.PI * 2;
          const pt = projectOrbitPoint(a, ring.rFactor, ring.tiltX, ring.tiltZ);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = `rgba(76, 232, 224, ${ring.alpha.toFixed(3)})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();
      }

      // Outer globe rim
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(68, 236, 228, ${(0.17 + 0.08 * heroIntensity).toFixed(3)})`;
      ctx.lineWidth = 1.15;
      ctx.stroke();

      // Smooth Latitudes
      const latitudes = [-0.95, -0.46, 0, 0.46, 0.95];
      for (const lat of latitudes) {
        ctx.beginPath();
        const steps = 32;
        let started = false;
        for (let i = 0; i <= steps; i++) {
          const lon = (i / steps) * Math.PI * 2;
          const p = projectSphere(lat, lon);
          if (p.z > -0.1) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle =
          lat === 0
            ? `rgba(64, 238, 230, ${(0.21 + 0.08 * heroIntensity).toFixed(3)})`
            : `rgba(116, 220, 218, ${(0.115 + 0.05 * heroIntensity).toFixed(3)})`;
        ctx.lineWidth = lat === 0 ? 1.1 : 0.8;
        ctx.stroke();
      }

      // Smooth Meridians
      const meridians = 8;
      for (let m = 0; m < meridians; m++) {
        const lon = (m / meridians) * Math.PI * 2;
        ctx.beginPath();
        const steps = 22;
        let started = false;
        for (let i = 0; i <= steps; i++) {
          const lat = -Math.PI * 0.46 + (i / steps) * Math.PI * 0.92;
          const p = projectSphere(lat, lon);
          if (p.z > -0.1) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle =
          m % 3 === 0
            ? `rgba(243, 211, 122, ${(0.135 + 0.05 * heroIntensity).toFixed(3)})`
            : `rgba(64, 238, 230, ${(0.125 + 0.05 * heroIntensity).toFixed(3)})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();
      }

      // Project orbiting multilingual characters
      const projectedGlyphs = orbitGlyphs.map((g, idx) => {
        const angle = g.baseAngle + time * g.speed + smoothPage * 0.34;
        const pt = projectOrbitPoint(angle, g.orbitRadiusFactor, g.ringTiltX, g.ringTiltZ);
        const bobY = Math.sin(time * 0.9 + g.bobPhase) * 3.8;
        return {
          idx,
          size: g.size,
          isWarm: g.isWarm,
          x: pt.x,
          y: pt.y + bobY,
          z: pt.z,
        };
      });

      // Delicate glowing light arcs connecting orbiting scripts across the globe
      const arcOpacityBase = 0.165 * heroIntensity + 0.05;
      for (let i = 0; i < projectedGlyphs.length; i += 3) {
        const a = projectedGlyphs[i];
        const b = projectedGlyphs[(i + 4) % projectedGlyphs.length];
        if (a.z > -0.5 && b.z > -0.5) {
          const midX = (a.x + b.x) * 0.5 + (cx - (a.x + b.x) * 0.5) * 0.22;
          const midY = (a.y + b.y) * 0.5 - 22;
          const depthFactor = Math.max(0.25, Math.min(1, (a.z + b.z + 2) * 0.35));

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(midX, midY, b.x, b.y);
          ctx.strokeStyle = a.isWarm
            ? `rgba(243, 211, 122, ${(arcOpacityBase * depthFactor).toFixed(3)})`
            : `rgba(88, 244, 236, ${(arcOpacityBase * depthFactor).toFixed(3)})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();

          const tPulse = (time * 0.19 + i * 0.17) % 1;
          const inv = 1 - tPulse;
          const bx = inv * inv * a.x + 2 * inv * tPulse * midX + tPulse * tPulse * b.x;
          const by = inv * inv * a.y + 2 * inv * tPulse * midY + tPulse * tPulse * b.y;
          const beadAlpha = 0.56 * depthFactor * (0.45 + 0.55 * heroIntensity) * Math.sin(tPulse * Math.PI);
          ctx.fillStyle = `rgba(170, 255, 250, ${beadAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(bx, by, 1.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Globe surface translation hubs (smooth breathing beacons)
      const beacons = [
        { lat: 0.34, lon: 0.4, warm: false, phase: 0 },
        { lat: -0.24, lon: 2.1, warm: true, phase: 2.1 },
        { lat: 0.48, lon: 3.9, warm: false, phase: 4.2 },
      ];
      for (const b of beacons) {
        const p = projectSphere(b.lat, b.lon + time * 0.14);
        if (p.z > 0) {
          const pulse = 0.78 + 0.22 * Math.sin(time * 1.8 + b.phase);
          const haloRadius = 4.6 + pulse * 1.8;
          ctx.fillStyle = b.warm
            ? `rgba(243, 211, 122, ${(0.28 * pulse).toFixed(3)})`
            : `rgba(56, 240, 232, ${(0.3 * pulse).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = b.warm ? '#F5DA88' : '#A4FFF9';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Blit pre-rendered multilingual character sprites sorted back-to-front
      projectedGlyphs.sort((u, v) => u.z - v.z);
      const mobileFactor = width < 768 ? 0.82 : 1;

      for (const gl of projectedGlyphs) {
        const depthNorm = Math.max(0, Math.min(1, (gl.z + 1.6) / 3.2));
        const alpha = (0.18 + depthNorm * 0.54) * (0.38 + 0.62 * heroIntensity);
        const drawSize = gl.size * (1.85 + depthNorm * 0.65) * mobileFactor;
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.drawImage(
          glyphSprites[gl.idx],
          gl.x - drawSize / 2,
          gl.y - drawSize / 2,
          drawSize,
          drawSize
        );
      }
      ctx.globalAlpha = 1;
    };

    const drawFrame = (now: number) => {
      if (!prefersReducedMotion) {
        rafId = window.requestAnimationFrame(drawFrame);
      }

      const dt = clampDeltaSec(now - lastNow, 0.05);
      lastNow = now;

      if (document.hidden) return;

      // Frame-rate independent exponential damping (silky at 60Hz, 120Hz, 144Hz)
      pointer.x = dampValue(pointer.x, pointer.targetX, 3.8, dt || 0.016);
      pointer.y = dampValue(pointer.y, pointer.targetY, 3.8, dt || 0.016);
      smoothPage = dampValue(smoothPage, pageIndexRef.current, 5.2, dt || 0.016);

      if (!prefersReducedMotion) {
        time += dt;
      }

      const idxLow = Math.max(0, Math.min(SLIDE_MOODS.length - 1, Math.floor(smoothPage)));
      const idxHigh = Math.max(0, Math.min(SLIDE_MOODS.length - 1, Math.ceil(smoothPage)));
      const frac = smoothPage - idxLow;
      // Smoothstep easing across slide moods so transitions never have linear corners
      const smoothFrac = frac * frac * (3 - 2 * frac);

      const mA = SLIDE_MOODS[idxLow];
      const mB = SLIDE_MOODS[idxHigh];
      const lerp = (a: number, b: number) => a + (b - a) * smoothFrac;

      const offsetX = (pointer.x - 0.5) * 34;
      const offsetY = (pointer.y - 0.5) * 24;
      const pageDriftY = -smoothPage * height * 0.075;
      const heroIntensity = Math.max(0, 1 - Math.min(1, smoothPage));

      const targetGlobeX = lerp(mA.globeX, mB.globeX);
      const targetGlobeY = lerp(mA.globeY, mB.globeY);

      // Update GPU-composited atmospheric nebula layers (zero full-screen canvas gradient fill overhead!)
      if (mistPrimaryRef.current) {
        const mx = (targetGlobeX - 0.5) * width * 0.65 + offsetX * 0.45 + Math.sin(time * 0.25) * 14;
        const my = (targetGlobeY - 0.5) * height * 0.6 + offsetY * 0.38 + Math.cos(time * 0.2) * 10;
        mistPrimaryRef.current.style.transform = `translate3d(${mx.toFixed(2)}px, ${my.toFixed(2)}px, 0)`;
      }
      if (mistSecondaryRef.current) {
        const mx2 = -(targetGlobeX - 0.5) * width * 0.45 - offsetX * 0.3 + Math.cos(time * 0.22) * 12;
        const my2 = -offsetY * 0.24 + Math.sin(time * 0.18) * 10;
        mistSecondaryRef.current.style.transform = `translate3d(${mx2.toFixed(2)}px, ${my2.toFixed(2)}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      // Rotating 3D Wireframe Globe + Orbiting Multilingual Constellation & Glowing Light Arcs
      const globeRadius = Math.min(width, height) * (width < 768 ? 0.3 : 0.36);
      const globeCx = width * targetGlobeX + offsetX * 0.52;
      const globeCy = height * targetGlobeY + offsetY * 0.42;
      drawMultilingualGlobe(
        globeCx,
        globeCy,
        globeRadius,
        time * 0.13 + smoothPage * 0.46 + (pointer.x - 0.5) * 0.24,
        0.24 + (pointer.y - 0.5) * 0.14,
        heroIntensity
      );

      // Silky floating depth particles with delta-time motion
      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x = (p.x + p.vx * dt + 1) % 1;
          p.y = (p.y + p.vy * dt + 1) % 1;
        }
        const px = p.x * width + offsetX * p.depth;
        const py =
          (((p.y * height + offsetY * p.depth + pageDriftY * p.depth) % height) + height) % height;
        const twinkle = 0.72 + 0.28 * Math.sin(time * 1.15 + p.phase);
        const alpha = p.alpha * twinkle;
        ctx.fillStyle = p.isWarm
          ? `rgba(243, 211, 122, ${alpha.toFixed(3)})`
          : `rgba(114, 246, 238, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    drawFrame(performance.now());

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#152B3C] to-[#102A3A]"
    >
      {/* GPU-Composited Luminous Teal-Slate Nebula Layers */}
      <div
        ref={mistPrimaryRef}
        className="absolute -inset-[22%] will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(32, 212, 204, 0.22) 0%, rgba(16, 78, 96, 0.26) 36%, rgba(13, 27, 42, 0) 68%)',
        }}
      />
      <div
        ref={mistSecondaryRef}
        className="absolute -inset-[18%] will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 68% 24%, rgba(120, 240, 236, 0.14) 0%, rgba(20, 74, 96, 0.12) 32%, rgba(13, 27, 42, 0) 64%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(64, 236, 228, 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(64, 236, 228, 0.35) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(10,24,38,0.4)_100%)]" />
    </div>
  );
}
