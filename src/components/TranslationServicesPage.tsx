import { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpenCheck,
  Briefcase,
  Cpu,
  FileText,
  Languages,
  Scale,
  type LucideIcon,
} from 'lucide-react';
import {
  SECTION_TITLES,
  TRANSLATION_SERVICES_DATA,
} from '../data/companyData';
import { SILKY_EASE } from '../utils/motionPhysics';
import { GlowBeamCard } from './GlowBeamCard';
import { ParallaxSlideFrame, StaggerGlideItem } from './ParallaxSlideFrame';
import { SectionInfographicHeader } from './SectionInfographicHeader';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  legal: Scale,
  commercial: Briefcase,
  technical: Cpu,
  specialized: BookOpenCheck,
};

interface TranslationServicesPageProps {
  direction: 1 | -1;
}

export function TranslationServicesPage({ direction }: TranslationServicesPageProps) {
  const [activeId, setActiveId] = useState(TRANSLATION_SERVICES_DATA[0].id);
  const [failedImgs, setFailedImgs] = useState<Record<string, boolean>>({});

  const activeItem =
    TRANSLATION_SERVICES_DATA.find((item) => item.id === activeId) ??
    TRANSLATION_SERVICES_DATA[0];

  const ActiveIcon = SERVICE_ICONS[activeItem.id] ?? FileText;

  return (
    <ParallaxSlideFrame
      id="translation-services"
      direction={direction}
      watermark="TRANSLATION SERVICES"
      className="bg-transparent text-white pt-24 pb-20 lg:pb-10 lg:pr-14"
    >
      <div className="max-w-[1220px] w-full mx-auto px-6">
        <StaggerGlideItem index={0} direction={direction}>
          <SectionInfographicHeader
            titleEn={SECTION_TITLES.specializedServices.en}
            titleAr={SECTION_TITLES.specializedServices.ar}
            icon={Languages}
            subPillar={{
              icon: FileText,
              en: SECTION_TITLES.translationServicesPillar.en,
              ar: SECTION_TITLES.translationServicesPillar.ar,
            }}
          />
        </StaggerGlideItem>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
          <StaggerGlideItem index={1} direction={direction} className="lg:col-span-5">
            <GlowBeamCard
              beamTone="gold"
              className="h-[300px] sm:h-[360px] lg:h-full min-h-[410px]"
              innerClassName="p-2.5 flex flex-col"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#102A3A]">
                {!failedImgs[activeItem.id] ? (
                  <motion.img
                    key={activeItem.id}
                    src={activeItem.imageSrc}
                    alt={activeItem.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImgs((prev) => ({ ...prev, [activeItem.id]: true }))
                    }
                    initial={{ opacity: 0.3, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.56, ease: SILKY_EASE }}
                    className="w-full h-full object-cover will-change-[transform,opacity]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#102A3A] to-[#173D52] text-[#4EEAE2]">
                    <FileText className="w-12 h-12" />
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/82 via-[#0D1B2A]/24 to-transparent"
                />
                <div className="absolute bottom-5 inset-x-5 text-white space-y-2.5">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#2CE6DC]/18 border border-[#56EFE8]/45 text-[#9FFAF4]">
                    <ActiveIcon className="w-4 h-4" />
                  </span>
                  <p dir="rtl" lang="ar" className="font-arabic text-base sm:text-lg font-semibold leading-snug text-white">
                    {activeItem.ar}
                  </p>
                </div>
              </div>
            </GlowBeamCard>
          </StaggerGlideItem>

          <div className="lg:col-span-7 flex flex-col justify-between gap-3">
            {TRANSLATION_SERVICES_DATA.map((item, idx) => {
              const isSelected = item.id === activeItem.id;
              const Icon = SERVICE_ICONS[item.id] ?? FileText;

              return (
                <StaggerGlideItem key={item.id} index={idx + 2} direction={direction}>
                  <GlowBeamCard
                    beamTone={isSelected ? 'gold' : 'cyan'}
                    fastBeam={isSelected}
                    delaySeconds={-idx * 1.4}
                    roundedClass="rounded-xl"
                    deepSurface={isSelected}
                    interactiveTilt
                    innerClassName="p-0"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      onMouseEnter={() => setActiveId(item.id)}
                      className={`relative w-full text-start p-4 sm:p-5 rounded-xl transition-colors duration-300 ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2CE6DC] ${
                        isSelected
                          ? 'bg-white/[0.09]'
                          : 'hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 mb-2">
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                            isSelected
                              ? 'bg-[#00F0FF]/20 border-[#00F0FF]/55 text-[#8FF6FF]'
                              : 'bg-white/[0.05] border-white/15 text-[#9CC9E0]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <p
                          className={`font-display text-sm sm:text-[1.02rem] font-semibold leading-snug ${
                            isSelected ? 'text-white' : 'text-white/88'
                          }`}
                        >
                          {item.en}
                        </p>
                      </div>

                      <p
                        dir="rtl"
                        lang="ar"
                        className={`font-arabic text-sm sm:text-[1.02rem] font-medium leading-relaxed ps-11 ${
                          isSelected ? 'text-[#F5DA88]' : 'text-[#B9DCF0]/85'
                        }`}
                      >
                        {item.ar}
                      </p>
                    </button>
                  </GlowBeamCard>
                </StaggerGlideItem>
              );
            })}
          </div>
        </div>
      </div>
    </ParallaxSlideFrame>
  );
}
