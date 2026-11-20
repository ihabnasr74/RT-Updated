import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { computeCardStaggerDelay } from '../utils/deckNavigation';
import { SILKY_EASE } from '../utils/motionPhysics';

interface ParallaxSlideFrameProps {
  id: string;
  direction: 1 | -1;
  watermark?: string;
  children: ReactNode;
  className?: string;
  as?: 'section' | 'footer';
  foregroundGlyphs?: readonly [string, string, string, string];
}

export function ParallaxSlideFrame({
  id,
  direction,
  children,
  className = '',
  as = 'section',
}: ParallaxSlideFrameProps) {
  const prefersReducedMotion = useReducedMotion();
  const enterY = direction > 0 ? 34 : -34;

  const Tag = as;

  return (
    <Tag
      id={id}
      className={`relative min-h-full w-full flex flex-col justify-center overflow-hidden ${className}`}
    >
      {/* Multi-Layer GPU Parallax Depth Accent Plane (pure translate3d + opacity, zero blur) */}
      <motion.div
        aria-hidden="true"
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: enterY * 1.35 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: prefersReducedMotion ? 0.2 : 0.72,
            ease: SILKY_EASE,
          },
        }}
        className="pointer-events-none select-none absolute inset-0 z-[1] overflow-hidden will-change-[transform,opacity]"
      >
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full border border-[#4EEAE2]/[0.07]" />
        <div className="absolute -bottom-28 -right-24 w-[480px] h-[480px] rounded-full border border-[#4EEAE2]/[0.06]" />
        <span className="absolute top-[18%] left-[7%] w-1.5 h-1.5 rounded-full bg-[#56EFE8]/35" />
        <span className="absolute bottom-[20%] right-[10%] w-2 h-2 rounded-full bg-[#8FF6FF]/30" />
      </motion.div>

      {/* Main Content Stage (exit owned cleanly by parent AnimatePresence wrapper in App.tsx) */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center">
        {children}
      </div>
    </Tag>
  );
}

interface StaggerGlideItemProps {
  index: number;
  direction?: 1 | -1;
  children: ReactNode;
  className?: string;
}

export function StaggerGlideItem({
  index,
  direction = 1,
  children,
  className = '',
}: StaggerGlideItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const delay = computeCardStaggerDelay(index);
  const offsetY = direction > 0 ? 18 : -18;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: offsetY, scale: 0.988 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.56,
        delay,
        ease: SILKY_EASE,
      }}
      className={`will-change-[transform,opacity] ${className}`}
    >
      {children}
    </motion.div>
  );
}
