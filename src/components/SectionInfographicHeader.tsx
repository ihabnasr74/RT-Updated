import { motion } from 'motion/react';
import { ArrowLeftRight, type LucideIcon } from 'lucide-react';
import { GlowBeamCard } from './GlowBeamCard';

interface SubPillarInfo {
  icon: LucideIcon;
  en: string;
  ar: string;
}

interface SectionInfographicHeaderProps {
  titleEn: string;
  titleAr: string;
  icon: LucideIcon;
  subPillar?: SubPillarInfo;
}

export function SectionInfographicHeader({
  titleEn,
  titleAr,
  icon: Icon,
  subPillar,
}: SectionInfographicHeaderProps) {
  const SubIcon = subPillar?.icon;

  return (
    <div className="w-full mb-7 sm:mb-8">
      {/* Main Bilingual Dark Frosted Glass Infographic Bar — Glowing Cyan-Gold Borders, Zero Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 md:gap-0">
        {/* Left Wing — English Infographic Node */}
        <GlowBeamCard
          beamTone="cyan"
          innerClassName="px-4 sm:px-5 py-3.5 flex items-center gap-3.5 sm:gap-4"
        >
          <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/28 text-[#00F0FF] shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.16)]">
            <Icon className="w-5 h-5" />
          </div>

          <h2 className="font-display text-lg sm:text-2xl lg:text-[1.8rem] font-bold tracking-tight text-white leading-tight">
            {titleEn}
          </h2>
        </GlowBeamCard>

        {/* Center Luminous Translation Bridge Hub */}
        <div
          aria-hidden="true"
          className="hidden md:flex relative items-center justify-center px-2 lg:px-3.5 shrink-0"
        >
          <svg width="108" height="44" viewBox="0 0 108 44" fill="none" className="overflow-visible">
            <motion.path
              d="M0 22 H34"
              stroke="#00F0FF"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              d="M74 22 H108"
              stroke="#D4AF37"
              strokeOpacity="0.65"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
            />
            <circle cx="2" cy="22" r="3" fill="#00F0FF" />
            <circle cx="106" cy="22" r="3" fill="#F3D37A" />
            <circle
              cx="54"
              cy="22"
              r="18"
              fill="rgba(18, 45, 62, 0.85)"
              stroke="#2CE6DC"
              strokeOpacity="0.52"
              strokeWidth="1.25"
            />
            <circle
              cx="54"
              cy="22"
              r="13.5"
              stroke="#7BF6F0"
              strokeOpacity="0.6"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>
          <div className="absolute flex items-center justify-center text-[#9FFAF4]">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Right Wing — Arabic Infographic Node (RTL) */}
        <GlowBeamCard
          beamTone="cyan"
          delaySeconds={-3.2}
          dir="rtl"
          lang="ar"
          innerClassName="px-4 sm:px-5 py-3.5 flex items-center gap-3.5 sm:gap-4"
        >
          <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#2CE6DC]/14 border border-[#56EFE8]/34 text-[#7BF6F0] shrink-0 shadow-[0_0_20px_rgba(44,230,220,0.18)]">
            <Icon className="w-5 h-5" />
          </div>

          <p className="font-arabic text-lg sm:text-2xl lg:text-[1.8rem] font-bold text-white leading-snug">
            {titleAr}
          </p>
        </GlowBeamCard>
      </div>

      {/* Connected Infographic Sub-Pillar Branch (Clean Icons — Zero Numbers) */}
      {subPillar && SubIcon && (
        <div className="relative mt-3 pt-2.5 flex flex-col items-center">
          <span
            aria-hidden="true"
            className="hidden md:block absolute -top-1 left-1/2 -translate-x-1/2 w-[1.5px] h-3.5 bg-gradient-to-b from-[#2CE6DC]/75 to-[#7BF6F0]/35"
          />

          <GlowBeamCard
            className="w-full"
            roundedClass="rounded-xl"
            delaySeconds={-1.6}
            innerClassName="w-full flex flex-wrap items-center justify-between gap-3 px-5 py-2.5"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#2CE6DC]/15 border border-[#56EFE8]/38 text-[#7BF6F0] flex items-center justify-center shrink-0">
                <SubIcon className="w-4 h-4" />
              </span>
              <h3 className="font-display text-base sm:text-lg font-bold text-white">
                {subPillar.en}
              </h3>
            </div>

            <span
              aria-hidden="true"
              className="hidden sm:block flex-1 mx-4 h-[1px] bg-gradient-to-r from-[#2CE6DC]/25 via-[#8FF6FF]/55 to-[#2CE6DC]/25"
            />

            <div dir="rtl" lang="ar" className="flex items-center gap-3 font-arabic">
              <span className="w-8 h-8 rounded-lg bg-[#2CE6DC]/15 border border-[#56EFE8]/38 text-[#7BF6F0] flex items-center justify-center shrink-0">
                <SubIcon className="w-4 h-4" />
              </span>
              <p className="text-base sm:text-lg font-bold text-white">
                {subPillar.ar}
              </p>
            </div>
          </GlowBeamCard>
        </div>
      )}
    </div>
  );
}
