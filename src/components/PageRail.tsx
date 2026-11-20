import { ChevronDown, ChevronUp } from 'lucide-react';
import { BRAND_DATA, SECTION_TITLES } from '../data/companyData';
import { DECK_PAGES, type DeckTheme } from '../utils/deckNavigation';

interface PageRailProps {
  currentIndex: number;
  theme: DeckTheme;
  onSelectPage: (index: number) => void;
  onStep: (delta: 1 | -1) => void;
}

const PAGE_ACCESSIBLE_LABELS = [
  BRAND_DATA.logoPrimary,
  SECTION_TITLES.companyProfile.en,
  SECTION_TITLES.coreValues.en,
  SECTION_TITLES.translationServicesPillar.en,
  SECTION_TITLES.otherServicesPillar.en,
  SECTION_TITLES.translationRequestProcess.en,
  SECTION_TITLES.communicationChannels.en,
] as const;

export function PageRail({
  currentIndex,
  onSelectPage,
  onStep,
}: PageRailProps) {
  const total = DECK_PAGES.length;
  const pageNumber = String(currentIndex + 1).padStart(2, '0');
  const totalFormatted = String(total).padStart(2, '0');

  return (
    <>
      {/* Desktop Vertical Luxury Obsidian Presentation Rail */}
      <aside
        aria-label="Page navigation"
        className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 select-none"
      >
        <button
          type="button"
          onClick={() => onStep(-1)}
          disabled={currentIndex === 0}
          aria-label="Previous page"
          className="w-9 h-9 rounded-full border border-[#4EEAE2]/28 bg-[#122D40]/85 text-white/90 hover:border-[#56EFE8] hover:text-[#9FFAF4] flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#2CE6DC]"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center gap-2 py-2">
          {DECK_PAGES.map((page, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={page.id}
                type="button"
                onClick={() => onSelectPage(idx)}
                aria-label={PAGE_ACCESSIBLE_LABELS[idx]}
                aria-current={active ? 'page' : undefined}
                className="group p-1.5 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2CE6DC] rounded-full"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    active
                      ? 'w-2 h-7 bg-gradient-to-b from-[#2CE6DC] to-[#B5FFF9] shadow-[0_0_14px_rgba(44,230,220,0.65)]'
                      : 'w-1.5 h-2.5 bg-white/32 group-hover:bg-[#56EFE8]/80'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onStep(1)}
          disabled={currentIndex === total - 1}
          aria-label="Next page"
          className="w-9 h-9 rounded-full border border-[#4EEAE2]/28 bg-[#122D40]/85 text-white/90 hover:border-[#56EFE8] hover:text-[#9FFAF4] flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#2CE6DC]"
        >
          <ChevronDown className="w-4 h-4" />
        </button>

        <div
          data-testid="deck-page-counter"
          className="pt-1 text-[11px] font-bold tabular-nums tracking-wider text-white/90"
        >
          {pageNumber}/{totalFormatted}
        </div>
      </aside>

      {/* Compact Mobile Teal-Slate Page Switcher */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#4EEAE2]/28 bg-[#122D40]/92 text-white shadow-[0_10px_28px_rgba(6,18,28,0.45)]">
        <button
          type="button"
          onClick={() => onStep(-1)}
          disabled={currentIndex === 0}
          aria-label="Previous page"
          className="w-8 h-8 rounded-md flex items-center justify-center text-white/90 hover:text-[#7BF6F0] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <span className="text-xs font-bold tabular-nums px-1 text-white">
          {pageNumber}/{totalFormatted}
        </span>
        <button
          type="button"
          onClick={() => onStep(1)}
          disabled={currentIndex === total - 1}
          aria-label="Next page"
          className="w-8 h-8 rounded-md flex items-center justify-center text-white/90 hover:text-[#7BF6F0] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
