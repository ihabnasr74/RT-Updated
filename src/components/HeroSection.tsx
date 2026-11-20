import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { BRAND_DATA, SECTION_TITLES } from '../data/companyData';
import { LOGO_SPRING, SILKY_EASE } from '../utils/motionPhysics';
import { BrandMark } from './BrandMark';
import { ParallaxSlideFrame } from './ParallaxSlideFrame';

interface HeroSectionProps {
  direction: 1 | -1;
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({ direction, onNavigate }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ParallaxSlideFrame
      id="hero"
      direction={direction}
      watermark="ROWAD AL TAMAYUZ"
      className="justify-between bg-transparent text-white pt-24 pb-10 sm:pb-12 lg:pb-14 lg:pr-14"
    >
      {/* Upper-Centered Hero Identity Block (Logo + Unified Deep-Teal/Turquoise Bilingual Titles) */}
      <div className="relative z-10 max-w-[1060px] w-full mx-auto px-6 pt-4 sm:pt-7 md:pt-9 flex flex-col items-center justify-start text-center">
        {/* Shared-Element Centered Big Transparent Logo (flies smoothly to Navbar top-left on scroll) */}
        <motion.div
          layoutId="rowad-shared-brand-logo"
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            layout: LOGO_SPRING,
            opacity: { duration: 0.62, ease: SILKY_EASE },
            scale: { duration: 0.68, ease: SILKY_EASE },
            y: { duration: 0.68, ease: SILKY_EASE },
          }}
          className="mb-5 sm:mb-7 flex items-center justify-center w-full will-change-[transform,opacity]"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 6.4, repeat: Infinity, ease: 'easeInOut' }
            }
            className="flex items-center justify-center will-change-transform"
          >
            <BrandMark
              layout="full"
              variant="light"
              className="w-[280px] sm:w-[430px] md:w-[530px] lg:w-[590px] h-auto drop-shadow-[0_12px_30px_rgba(24,184,176,0.26)]"
              alt={BRAND_DATA.heroTitleEn}
            />
          </motion.div>
        </motion.div>

        {/* Minimalist Turquoise Architectural Divider */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.62, delay: 0.08, ease: SILKY_EASE }}
          className="flex items-center justify-center gap-3 mb-5 sm:mb-6 will-change-[transform,opacity]"
        >
          <span className="w-16 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-[#18B8B0]/70 to-[#2CE6DC]" />
          <span className="w-2.5 h-2.5 rotate-45 bg-[#2CE6DC] shadow-[0_0_16px_rgba(44,230,220,0.75)]" />
          <span className="w-16 sm:w-28 h-[1.5px] bg-gradient-to-l from-transparent via-[#18B8B0]/70 to-[#2CE6DC]" />
        </motion.div>

        {/* Exact Hero Titles: Unified solid rich deep-teal / turquoise color (Cairo + Plus Jakarta Sans) */}
        <div className="flex flex-col items-center gap-2.5 sm:gap-3 max-w-[920px]">
          <div className="reveal-mask w-full">
            <motion.p
              dir="rtl"
              lang="ar"
              initial={{ y: '85%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.68, delay: 0.12, ease: SILKY_EASE }}
              className="font-arabic font-bold text-brand-turquoise leading-[1.35] tracking-normal will-change-[transform,opacity]"
              style={{ fontSize: 'clamp(1.22rem, 2.15vw, 1.92rem)' }}
            >
              {BRAND_DATA.heroTitleAr}
            </motion.p>
          </div>

          <div className="reveal-mask w-full">
            <motion.h1
              initial={{ y: '85%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.72, delay: 0.18, ease: SILKY_EASE }}
              className="font-display font-bold text-brand-turquoise tracking-[-0.015em] leading-[1.24] mx-auto max-w-[36ch] will-change-[transform,opacity]"
              style={{ fontSize: 'clamp(1.25rem, 2.22vw, 2.02rem)' }}
            >
              {BRAND_DATA.heroTitleEn}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Bottom-Centered Single Translucent Glass "Company Profile" CTA with Glowing Animated Border Aura */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.66, delay: 0.24, ease: SILKY_EASE }}
        className="relative z-10 mt-auto pt-12 pb-6 sm:pb-4 flex items-center justify-center will-change-[transform,opacity]"
      >
        <div className="relative inline-flex items-center justify-center">
          <span
            aria-hidden="true"
            className="soft-aura-breathe pointer-events-none absolute -inset-5 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(44,230,220,0.3)_0%,rgba(24,184,176,0.12)_52%,transparent_76%)]"
          />

          <div className="glow-beam-card relative rounded-xl shadow-[0_0_28px_rgba(44,230,220,0.24)] hover:-translate-y-0.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <button
              type="button"
              onClick={() => onNavigate('company-profile')}
              className="group relative z-10 inline-flex items-center justify-center gap-3.5 px-9 py-4 rounded-xl glass-surface border border-[#56EFE8]/25 text-white font-display font-bold text-sm sm:text-[15px] tracking-wide hover:bg-[#19435B]/70 hover:text-[#B5FFF9] transition-colors duration-300 ease-out whitespace-nowrap shrink-0 cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CE6DC]"
            >
              <span
                aria-hidden="true"
                className="btn-shimmer-streak pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/18 to-transparent"
              />
              <span className="relative z-10">{SECTION_TITLES.companyProfile.en}</span>
              <ArrowDown className="relative z-10 w-4 h-4 text-[#56EFE8] group-hover:translate-y-0.5 transition-transform duration-300 ease-out" />
            </button>
            <span aria-hidden="true" className="glow-beam-ring">
              <span className="glow-beam-rotor glow-beam-rotor-fast" />
            </span>
          </div>
        </div>
      </motion.div>
    </ParallaxSlideFrame>
  );
}
