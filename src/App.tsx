import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { PageRail } from './components/PageRail';
import { GlobalTranslationBackdrop } from './components/GlobalTranslationBackdrop';
import { HeroSection } from './components/HeroSection';
import { CompanyProfileSection } from './components/CompanyProfileSection';
import { CoreValuesSection } from './components/CoreValuesSection';
import { TranslationServicesPage } from './components/TranslationServicesPage';
import { OtherServicesPage } from './components/OtherServicesPage';
import { ProcessTimelineSection } from './components/ProcessTimelineSection';
import { CommunicationSection } from './components/CommunicationSection';
import {
  DECK_PAGES,
  PARALLAX_TIMING,
  computeDeckProgress,
  getNextPageIndex,
  getPageIndexById,
  resolveTouchNavigation,
  resolveWheelNavigation,
} from './utils/deckNavigation';
import { SILKY_EASE, clampDeltaSec, dampValue } from './utils/motionPhysics';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prefersReducedMotion = useReducedMotion();

  const isLockedRef = useRef(false);
  const lockTimerRef = useRef<number | null>(null);
  const currentIndexRef = useRef(0);
  const activeScrollContainerRef = useRef<HTMLDivElement | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  currentIndexRef.current = currentIndex;

  const goToPage = useCallback((targetIndex: number, explicitDirection?: 1 | -1) => {
    const clamped = Math.max(0, Math.min(DECK_PAGES.length - 1, targetIndex));
    if (clamped === currentIndexRef.current || isLockedRef.current) return;

    const computedDirection: 1 | -1 =
      explicitDirection ?? (clamped > currentIndexRef.current ? 1 : -1);

    isLockedRef.current = true;
    setDirection(computedDirection);
    setCurrentIndex(clamped);

    if (lockTimerRef.current) {
      window.clearTimeout(lockTimerRef.current);
    }
    lockTimerRef.current = window.setTimeout(() => {
      isLockedRef.current = false;
    }, PARALLAX_TIMING.cooldownMs);
  }, []);

  const stepPage = useCallback(
    (delta: 1 | -1) => {
      const next = getNextPageIndex(currentIndexRef.current, delta, DECK_PAGES.length);
      goToPage(next, delta);
    },
    [goToPage]
  );

  const navigateBySectionId = useCallback(
    (sectionId: string) => {
      const idx = getPageIndexById(sectionId);
      goToPage(idx);
    },
    [goToPage]
  );

  useEffect(() => {
    return () => {
      if (lockTimerRef.current) {
        window.clearTimeout(lockTimerRef.current);
      }
    };
  }, []);

  // Silky rAF-damped desktop custom cursor halo (auto-sleeps when idle, zero React re-renders)
  useEffect(() => {
    if (prefersReducedMotion || window.innerWidth < 1024) return;
    const ring = cursorRingRef.current;
    if (!ring) return;

    let rafId = 0;
    let active = false;
    let visible = false;
    let lastNow = performance.now();
    let x = window.innerWidth * 0.5;
    let y = window.innerHeight * 0.5;
    let targetX = x;
    let targetY = y;
    let scale = 1;
    let targetScale = 1;

    const tick = (now: number) => {
      const dt = clampDeltaSec(now - lastNow, 0.05) || 0.016;
      lastNow = now;

      x = dampValue(x, targetX, 14, dt);
      y = dampValue(y, targetY, 14, dt);
      scale = dampValue(scale, targetScale, 12, dt);

      ring.style.transform = `translate3d(${(x - 18).toFixed(2)}px, ${(y - 18).toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;

      const dx = Math.abs(targetX - x);
      const dy = Math.abs(targetY - y);
      const ds = Math.abs(targetScale - scale);

      if (visible && (dx > 0.15 || dy > 0.15 || ds > 0.004)) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        active = false;
      }
    };

    const startLoop = () => {
      if (active) return;
      active = true;
      lastNow = performance.now();
      rafId = window.requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const interactive = (e.target as HTMLElement | null)?.closest('a, button');
      targetScale = interactive ? 1.55 : 1;
      if (!visible) {
        x = e.clientX;
        y = e.clientY;
        visible = true;
        ring.style.opacity = '1';
      }
      targetX = e.clientX;
      targetY = e.clientY;
      startLoop();
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  // Zero-delay wheel handler: very first scroll tick triggers 4-layer overlapping parallax transition
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;

      const scroller = activeScrollContainerRef.current;
      const scrollTop = scroller ? scroller.scrollTop : 0;
      const scrollHeight = scroller ? scroller.scrollHeight : window.innerHeight;
      const clientHeight = scroller ? scroller.clientHeight : window.innerHeight;

      if (isLockedRef.current) {
        if (scrollHeight <= clientHeight + 6) {
          e.preventDefault();
        }
        return;
      }

      const decision = resolveWheelNavigation({
        deltaY: e.deltaY,
        scrollTop,
        scrollHeight,
        clientHeight,
        currentIndex: currentIndexRef.current,
        totalPages: DECK_PAGES.length,
      });

      if (decision) {
        e.preventDefault();
        goToPage(decision.nextIndex, decision.direction);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [goToPage]);

  // Direct touch swipe handler for mobile/tablet overlapping parallax transitions
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null || isLockedRef.current) return;
      const endY = e.changedTouches[0]?.clientY;
      if (typeof endY !== 'number') return;

      const scroller = activeScrollContainerRef.current;
      const decision = resolveTouchNavigation({
        startY: touchStartYRef.current,
        endY,
        scrollTop: scroller ? scroller.scrollTop : 0,
        scrollHeight: scroller ? scroller.scrollHeight : window.innerHeight,
        clientHeight: scroller ? scroller.clientHeight : window.innerHeight,
        currentIndex: currentIndexRef.current,
        totalPages: DECK_PAGES.length,
      });

      touchStartYRef.current = null;
      if (decision) {
        goToPage(decision.nextIndex, decision.direction);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goToPage]);

  // Keyboard navigation (ArrowDown, ArrowUp, PageDown, PageUp, Home, End)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        stepPage(1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        stepPage(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToPage(0, -1);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToPage(DECK_PAGES.length - 1, 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPage, stepPage]);

  const activePage = DECK_PAGES[currentIndex];
  const deckProgress = computeDeckProgress(currentIndex, DECK_PAGES.length);

  const renderPageContent = () => {
    switch (activePage.id) {
      case 'hero':
        return <HeroSection direction={direction} onNavigate={navigateBySectionId} />;
      case 'company-profile':
        return <CompanyProfileSection direction={direction} />;
      case 'core-values':
        return <CoreValuesSection direction={direction} />;
      case 'translation-services':
        return <TranslationServicesPage direction={direction} />;
      case 'other-services':
        return <OtherServicesPage direction={direction} />;
      case 'process':
        return <ProcessTimelineSection direction={direction} />;
      case 'communication':
        return <CommunicationSection direction={direction} onNavigate={navigateBySectionId} />;
    }
  };

  return (
    <LayoutGroup>
      <div
        data-testid="deck-shell"
        data-active-page={activePage.id}
        data-active-index={currentIndex}
        className="relative h-dvh w-screen overflow-hidden bg-[#0D1B2A] text-white"
      >
        {/* Layer 1 & Layer 2 Persistent Luminous Teal-Slate Nebula + 3D Multilingual Wireframe Globe */}
        <GlobalTranslationBackdrop activePageIndex={currentIndex} />

        {/* Thin Luminous Teal-Cyan Scroll Progress Bar */}
        <motion.div
          aria-hidden="true"
          animate={{ scaleX: deckProgress }}
          transition={{ duration: 0.6, ease: SILKY_EASE }}
          style={{ transformOrigin: 'left' }}
          className="fixed top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-[#18B8B0] via-[#4EEAE2] to-[#B5FFF9] z-[60] pointer-events-none will-change-transform"
        />

        {/* Subtle Desktop Custom Cursor Halo */}
        <div
          ref={cursorRingRef}
          aria-hidden="true"
          className="hidden lg:block pointer-events-none fixed top-0 left-0 z-[70] w-9 h-9 rounded-full border border-[#4EEAE2]/45 bg-[#2CE6DC]/[0.05] opacity-0 transition-opacity duration-300 ease-out will-change-[transform,opacity]"
        />

        <Navbar
          activePageId={activePage.id}
          theme={activePage.theme}
          onNavigate={navigateBySectionId}
        />

        <PageRail
          currentIndex={currentIndex}
          theme={activePage.theme}
          onSelectPage={(idx) => goToPage(idx)}
          onStep={stepPage}
        />

        {/* Silky 60fps/120fps 3D Depth Curtain & Staggered Card Glide Stage */}
        <main className="relative z-10 h-full w-full overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.div
              key={activePage.id}
              custom={direction}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: direction > 0 ? 30 : -30, scale: 0.99 }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                zIndex: 15,
                transition: {
                  duration: prefersReducedMotion ? 0.2 : 0.56,
                  ease: SILKY_EASE,
                },
              }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0, zIndex: 10, transition: { duration: 0.18 } }
                  : {
                      opacity: 0,
                      y: direction > 0 ? -18 : 18,
                      scale: 0.975,
                      zIndex: 10,
                      transition: {
                        duration: 0.4,
                        ease: SILKY_EASE,
                      },
                    }
              }
              className="absolute inset-0 h-full w-full will-change-[transform,opacity]"
            >
              <div
                ref={(node) => {
                  if (node) {
                    activeScrollContainerRef.current = node;
                  }
                }}
                className="h-full w-full overflow-y-auto overflow-x-hidden overscroll-contain"
              >
                {renderPageContent()}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </LayoutGroup>
  );
}
