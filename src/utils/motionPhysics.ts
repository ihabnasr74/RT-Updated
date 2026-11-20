export const SILKY_EASE = [0.16, 1, 0.3, 1] as const;

export const LOGO_SPRING = {
  type: 'spring' as const,
  stiffness: 175,
  damping: 26,
  mass: 0.9,
};

export const INDICATOR_SPRING = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 30,
  mass: 0.75,
};

/**
 * Clamps frame delta time (ms -> sec) so returning from a background tab
 * or a single slow frame never causes animations to jump abruptly.
 */
export function clampDeltaSec(deltaMs: number, maxDeltaSec: number = 0.05): number {
  if (!Number.isFinite(deltaMs) || deltaMs <= 0) {
    return 0;
  }
  return Math.min(deltaMs / 1000, maxDeltaSec);
}

/**
 * Computes frame-rate independent exponential damping alpha: 1 - exp(-lambda * dt).
 * Produces identical visual smoothness on 60Hz, 120Hz, and 144Hz displays.
 */
export function smoothDampFactor(lambda: number, dtSec: number): number {
  if (!Number.isFinite(lambda) || lambda <= 0 || !Number.isFinite(dtSec) || dtSec <= 0) {
    return 0;
  }
  return 1 - Math.exp(-lambda * dtSec);
}

/**
 * Smoothly moves `current` toward `target` using frame-rate independent damping.
 */
export function dampValue(
  current: number,
  target: number,
  lambda: number,
  dtSec: number
): number {
  const alpha = smoothDampFactor(lambda, dtSec);
  return current + (target - current) * alpha;
}

/**
 * Computes bounded, subtle 3D card tilt angles from normalized cursor coords [-0.5, 0.5].
 */
export function computeTiltAngles(
  normalizedX: number,
  normalizedY: number,
  maxDeg: number = 3.6
): { rx: number; ry: number } {
  const cx = Math.max(-0.5, Math.min(0.5, normalizedX));
  const cy = Math.max(-0.5, Math.min(0.5, normalizedY));
  return {
    rx: Number((-cy * maxDeg * 2).toFixed(3)),
    ry: Number((cx * maxDeg * 2).toFixed(3)),
  };
}
