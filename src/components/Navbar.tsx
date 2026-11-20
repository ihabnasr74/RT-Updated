import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { BRAND_DATA, SECTION_TITLES } from '../data/companyData';
import type { DeckPageId, DeckTheme } from '../utils/deckNavigation';
import { INDICATOR_SPRING, LOGO_SPRING, SILKY_EASE } from '../utils/motionPhysics';

interface NavbarProps {
  activePageId: DeckPageId;
  theme: DeckTheme;
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'company-profile', label: SECTION_TITLES.companyProfile.en },
  { id: 'core-values', label: SECTION_TITLES.coreValues.en },
  { id: 'specialized-services', label: SECTION_TITLES.specializedServices.en },
  { id: 'process', label: SECTION_TITLES.translationRequestProcess.en },
] as const;

export function Navbar({ activePageId, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHero = activePageId === 'hero';
  const isFinalPage = activePageId === 'communication';
  const showNavbarLogo = !isHero && !isFinalPage;

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  const isNavActive = (linkId: string) => {
    if (linkId === 'specialized-services') {
      return activePageId === 'translation-services' || activePageId === 'other-services';
    }
    return activePageId === linkId;
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0D1B2A]/82 border-b border-[#4EEAE2]/16 text-white py-3.5 transition-colors duration-300 shadow-[0_8px_28px_rgba(7,19,31,0.34)]">
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Shared-Element Landing Slot for Brand Logo (empty on Hero & final Communication page) */}
        <a
          href="#hero"
          aria-label={BRAND_DATA.logoPrimary}
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          className="flex items-center gap-3 min-w-[170px] min-h-[28px] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2CE6DC] rounded-sm"
        >
          {showNavbarLogo && (
            <motion.div
              layoutId="rowad-shared-brand-logo"
              transition={{ layout: LOGO_SPRING }}
              className="flex items-center gap-2.5 shrink-0 will-change-transform"
            >
              <BrandMark
                layout="mark"
                variant="light"
                className="h-6 sm:h-7 w-auto shrink-0"
              />
              <span className="font-display text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0">
                {BRAND_DATA.logoPrimary}
              </span>
            </motion.div>
          )}
        </a>

        {/* Zone 2: 4 Verbatim Single-Line Section Links with Silky Sliding Underline */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const active = isNavActive(link.id);
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className={`relative text-[13px] font-semibold whitespace-nowrap shrink-0 transition-colors duration-300 ease-out py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2CE6DC] ${
                  active
                    ? 'text-[#9FFAF4]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    transition={INDICATOR_SPRING}
                    className="absolute bottom-0 inset-x-0 h-[2px] rounded-full bg-gradient-to-r from-[#2CE6DC] to-[#9FFAF4]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('communication')}
            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-semibold rounded-lg bg-[#143245]/85 border border-[#4EEAE2]/35 text-white hover:border-[#8FF6FF]/80 hover:bg-[#1A425A]/90 transition-all duration-300 ease-out whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2CE6DC]"
          >
            {SECTION_TITLES.communicationChannels.en}
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-white hover:bg-white/10 transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2CE6DC]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Smooth Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: SILKY_EASE }}
            className="lg:hidden border-t border-[#4EEAE2]/18 bg-[#102638]/96 text-white will-change-[transform,opacity]"
          >
            <nav aria-label="Mobile navigation" className="px-6 py-5 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.id);
                  }}
                  className="py-3 text-base font-semibold text-white hover:text-[#9FFAF4] transition-colors duration-200 border-b border-white/12 whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => handleLinkClick('communication')}
                className="mt-3 w-full py-3 px-4 rounded-lg bg-[#16384E] border border-[#4EEAE2]/40 text-white font-semibold text-sm whitespace-nowrap cursor-pointer transition-colors duration-200 hover:bg-[#1B4660]"
              >
                {SECTION_TITLES.communicationChannels.en}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
