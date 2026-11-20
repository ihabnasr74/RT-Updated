import { useRef, type PointerEvent, type ReactNode } from 'react';
import { computeTiltAngles } from '../utils/motionPhysics';

interface GlowBeamCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  beamTone?: 'cyan' | 'gold';
  fastBeam?: boolean;
  interactiveTilt?: boolean;
  deepSurface?: boolean;
  delaySeconds?: number;
  dir?: 'rtl' | 'ltr';
  lang?: string;
  roundedClass?: string;
}

export function GlowBeamCard({
  children,
  className = '',
  innerClassName = '',
  beamTone = 'cyan',
  fastBeam = false,
  interactiveTilt = false,
  deepSurface = false,
  delaySeconds = 0,
  dir,
  lang,
  roundedClass = 'rounded-2xl',
}: GlowBeamCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactiveTilt || e.pointerType === 'touch') return;
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
    const ny = (e.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
    const { rx, ry } = computeTiltAngles(nx, ny, 3.4);

    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={interactiveTilt ? handlePointerMove : undefined}
      onPointerLeave={interactiveTilt ? handlePointerLeave : undefined}
      style={
        interactiveTilt
          ? {
              transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)',
              transition: 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform',
            }
          : undefined
      }
      className={`glow-beam-card ${roundedClass} shadow-[0_14px_38px_rgba(6,20,32,0.34)] ${className}`}
    >
      {/* Sleek Semi-Transparent Frosted Glass Surface */}
      <div
        dir={dir}
        lang={lang}
        className={`relative z-10 h-full w-full ${roundedClass} ${
          deepSurface ? 'glass-surface-deep' : 'glass-surface'
        } border border-[#56EFE8]/20 overflow-hidden ${innerClassName}`}
      >
        {/* Crisp subtle GPU opacity glow pulse on card entrance */}
        <span
          aria-hidden="true"
          className="card-entry-pulse pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3DF2E8] to-transparent"
        />
        {children}
      </div>

      {/* Masked 1.5px Perimeter-Only Animated Cyan-Gold Light Beam */}
      <span aria-hidden="true" className="glow-beam-ring">
        <span
          style={delaySeconds ? { animationDelay: `${delaySeconds}s` } : undefined}
          className={`glow-beam-rotor ${beamTone === 'gold' ? 'glow-beam-rotor-gold' : ''} ${
            fastBeam ? 'glow-beam-rotor-fast' : ''
          }`}
        />
      </span>
    </div>
  );
}
