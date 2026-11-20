import { motion } from 'motion/react';
import { Clock3, FileCheck2, LockKeyhole, ShieldCheck, Triangle } from 'lucide-react';
import {
  CORE_VALUES_DATA,
  SECTION_TITLES,
  type CoreValueEntry,
} from '../data/companyData';
import { SILKY_EASE } from '../utils/motionPhysics';
import { GlowBeamCard } from './GlowBeamCard';
import { ParallaxSlideFrame, StaggerGlideItem } from './ParallaxSlideFrame';
import { SectionInfographicHeader } from './SectionInfographicHeader';

function ValueIcon({ iconKey }: { iconKey: CoreValueEntry['iconKey'] }) {
  switch (iconKey) {
    case 'accuracy':
      return <FileCheck2 className="w-5 h-5" />;
    case 'confidentiality':
      return <LockKeyhole className="w-5 h-5" />;
    case 'deadlines':
      return <Clock3 className="w-5 h-5" />;
    case 'triangle':
      return <Triangle className="w-5 h-5" />;
  }
}

interface CoreValuesSectionProps {
  direction: 1 | -1;
}

export function CoreValuesSection({ direction }: CoreValuesSectionProps) {
  return (
    <ParallaxSlideFrame
      id="core-values"
      direction={direction}
      watermark="OUR CORE VALUES"
      className="bg-transparent text-white pt-24 pb-20 lg:pb-10 lg:pr-14"
    >
      <div className="max-w-[1220px] w-full mx-auto px-6">
        <StaggerGlideItem index={0} direction={direction}>
          <SectionInfographicHeader
            titleEn={SECTION_TITLES.coreValues.en}
            titleAr={SECTION_TITLES.coreValues.ar}
            icon={ShieldCheck}
          />
        </StaggerGlideItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {CORE_VALUES_DATA.map((item, idx) => {
            const isTriangle = item.iconKey === 'triangle';
            return (
              <StaggerGlideItem key={item.id} index={idx + 1} direction={direction}>
                <GlowBeamCard
                  beamTone={isTriangle ? 'gold' : 'cyan'}
                  fastBeam={isTriangle}
                  delaySeconds={-idx * 1.7}
                  interactiveTilt
                  deepSurface={isTriangle}
                  className="h-full"
                  innerClassName={`p-6 sm:p-7 flex flex-col justify-between gap-5 ${
                    isTriangle
                      ? 'bg-gradient-to-br from-[#184056]/48 via-[#123548]/42 to-[#1D4255]/46'
                      : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-colors duration-200 ${
                        isTriangle
                          ? 'bg-[#D4AF37]/18 border-[#F3D37A]/48 text-[#F5DA88] shadow-[0_0_24px_rgba(212,175,55,0.28)]'
                          : 'bg-[#00F0FF]/10 border-[#00F0FF]/28 text-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.16)]'
                      }`}
                    >
                      <ValueIcon iconKey={item.iconKey} />
                    </div>

                    {isTriangle && (
                      <svg
                        viewBox="0 0 72 64"
                        fill="none"
                        className="w-12 h-11 text-[#F3D37A]"
                        aria-hidden="true"
                      >
                        <motion.polygon
                          points="36,6 66,58 6,58"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.85, delay: 0.16, ease: SILKY_EASE }}
                        />
                        <circle cx="36" cy="6" r="3" fill="#00F0FF" />
                        <circle cx="66" cy="58" r="3" fill="#F5DA88" />
                        <circle cx="6" cy="58" r="3" fill="#F5DA88" />
                      </svg>
                    )}
                  </div>

                  <div className="space-y-4">
                    <p className="font-display text-base sm:text-lg font-semibold leading-snug text-white">
                      {item.en}
                    </p>

                    <div
                      className={`h-[1px] w-full bg-gradient-to-r ${
                        isTriangle
                          ? 'from-[#F3D37A]/50 via-[#00F0FF]/28 to-transparent'
                          : 'from-[#00F0FF]/35 via-[#D4AF37]/20 to-transparent'
                      }`}
                    />

                    <p
                      dir="rtl"
                      lang="ar"
                      className={`font-arabic text-base sm:text-lg font-semibold leading-relaxed ${
                        isTriangle ? 'text-[#F5DA88]' : 'text-[#9DF4FF]'
                      }`}
                    >
                      {item.ar}
                    </p>
                  </div>
                </GlowBeamCard>
              </StaggerGlideItem>
            );
          })}
        </div>
      </div>
    </ParallaxSlideFrame>
  );
}
