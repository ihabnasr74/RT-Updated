export type DeckTheme = 'dark' | 'light';

export type DeckPageId =
  | 'hero'
  | 'company-profile'
  | 'core-values'
  | 'translation-services'
  | 'other-services'
  | 'process'
  | 'communication';

export interface DeckPageMeta {
  id: DeckPageId;
  index: number;
  theme: DeckTheme;
  navSectionId: string;
  watermark: string;
}

export const PARALLAX_TIMING = {
  cooldownMs: 450,
  transitionDurationSec: 0.48,
  exitDurationSec: 0.35,
  cardStaggerSec: 0.05,
  layerStaggerSec: 0.05,
  easeBezier: [0.22, 1, 0.36, 1] as const,
  speeds: {
    atmosphere: 0.35,
    midBackWatermark: 0.55,
    contentStage: 1.0,
    foregroundDepth: 1.4,
  },
} as const;

export const DECK_PAGES: readonly DeckPageMeta[] = [
  { id: 'hero', index: 0, theme: 'dark', navSectionId: 'hero', watermark: 'ROWAD AL TAMAYUZ' },
  { id: 'company-profile', index: 1, theme: 'dark', navSectionId: 'company-profile', watermark: 'COMPANY PROFILE' },
  { id: 'core-values', index: 2, theme: 'dark', navSectionId: 'core-values', watermark: 'OUR CORE VALUES' },
  { id: 'translation-services', index: 3, theme: 'dark', navSectionId: 'specialized-services', watermark: 'TRANSLATION SERVICES' },
  { id: 'other-services', index: 4, theme: 'dark', navSectionId: 'specialized-services', watermark: 'OTHER SERVICES' },
  { id: 'process', index: 5, theme: 'dark', navSectionId: 'process', watermark: 'TRANSLATION REQUEST PROCESS' },
  { id: 'communication', index: 6, theme: 'dark', navSectionId: 'communication', watermark: 'COMMUNICATION CHANNELS' },
] as const;

export interface ParallaxLayerOffset {
  enterY: number;
  exitY: number;
  delaySec: number;
}

export function computeCardStaggerDelay(index: number, maxCards: number = 10): number {
  const clamped = Math.max(0, Math.min(maxCards, index));
  return Number((clamped * PARALLAX_TIMING.cardStaggerSec).toFixed(3));
}

export function computeParallaxLayerMotion(
  layerIndex: 0 | 1 | 2 | 3,
  direction: 1 | -1,
  baseDistancePx: number = 40
): ParallaxLayerOffset {
  const speedMultipliers = [
    PARALLAX_TIMING.speeds.atmosphere,
    PARALLAX_TIMING.speeds.midBackWatermark,
    PARALLAX_TIMING.speeds.contentStage,
    PARALLAX_TIMING.speeds.foregroundDepth,
  ] as const;

  const mult = speedMultipliers[layerIndex];
  const distance = Math.round(baseDistancePx * mult);
  return {
    enterY: direction > 0 ? distance : -distance,
    exitY: direction > 0 ? -Math.round(distance * 0.5) : Math.round(distance * 0.5),
    delaySec: Number((layerIndex * PARALLAX_TIMING.layerStaggerSec).toFixed(3)),
  };
}

export function getNextPageIndex(
  currentIndex: number,
  delta: number,
  totalPages: number = DECK_PAGES.length
): number {
  if (totalPages <= 0) return 0;
  const target = currentIndex + delta;
  return Math.max(0, Math.min(totalPages - 1, target));
}

export function getPageIndexById(id: string): number {
  if (id === 'specialized-services') {
    return 3;
  }
  const found = DECK_PAGES.find((page) => page.id === id);
  return found ? found.index : 0;
}

export interface ScrollEdgeContext {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

export interface WheelNavigationInput extends ScrollEdgeContext {
  deltaY: number;
  currentIndex: number;
  totalPages?: number;
  threshold?: number;
}

export function resolveWheelNavigation({
  deltaY,
  scrollTop,
  scrollHeight,
  clientHeight,
  currentIndex,
  totalPages = DECK_PAGES.length,
  threshold = 8,
}: WheelNavigationInput): { nextIndex: number; direction: 1 | -1 } | null {
  if (Math.abs(deltaY) < threshold) {
    return null;
  }

  const edgeTolerance = 6;
  const hasInternalScroll = scrollHeight > clientHeight + edgeTolerance;
  const atTop = scrollTop <= edgeTolerance;
  const atBottom = scrollTop + clientHeight >= scrollHeight - edgeTolerance;

  if (deltaY > 0) {
    if (hasInternalScroll && !atBottom) {
      return null;
    }
    const nextIndex = getNextPageIndex(currentIndex, 1, totalPages);
    if (nextIndex === currentIndex) return null;
    return { nextIndex, direction: 1 };
  }

  if (hasInternalScroll && !atTop) {
    return null;
  }
  const nextIndex = getNextPageIndex(currentIndex, -1, totalPages);
  if (nextIndex === currentIndex) return null;
  return { nextIndex, direction: -1 };
}

export interface TouchNavigationInput extends ScrollEdgeContext {
  startY: number;
  endY: number;
  currentIndex: number;
  totalPages?: number;
  threshold?: number;
}

export function resolveTouchNavigation({
  startY,
  endY,
  scrollTop,
  scrollHeight,
  clientHeight,
  currentIndex,
  totalPages = DECK_PAGES.length,
  threshold = 36,
}: TouchNavigationInput): { nextIndex: number; direction: 1 | -1 } | null {
  const swipeDeltaY = startY - endY;
  return resolveWheelNavigation({
    deltaY: swipeDeltaY,
    scrollTop,
    scrollHeight,
    clientHeight,
    currentIndex,
    totalPages,
    threshold,
  });
}

export function computeDeckProgress(
  currentIndex: number,
  totalPages: number = DECK_PAGES.length
): number {
  if (totalPages <= 1) return 1;
  const clamped = Math.max(0, Math.min(totalPages - 1, currentIndex));
  return (clamped + 1) / totalPages;
}

export function getNearestPageIndex(
  scrollTop: number,
  sectionOffsets: readonly number[]
): number {
  if (sectionOffsets.length === 0) return 0;
  let bestIdx = 0;
  let minDistance = Math.abs(scrollTop - sectionOffsets[0]);
  for (let i = 1; i < sectionOffsets.length; i++) {
    const dist = Math.abs(scrollTop - sectionOffsets[i]);
    if (dist < minDistance) {
      minDistance = dist;
      bestIdx = i;
    }
  }
  return bestIdx;
}

export function computeContinuousScrollProgress(
  scrollTop: number,
  maxScroll: number,
  totalPages: number = DECK_PAGES.length
): number {
  if (totalPages <= 1 || maxScroll <= 0) return 1;
  const ratio = Math.max(0, Math.min(1, scrollTop / maxScroll));
  const minBar = 1 / totalPages;
  return minBar + ratio * (1 - minBar);
}
