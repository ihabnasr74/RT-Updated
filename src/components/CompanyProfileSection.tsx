import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Globe2 } from 'lucide-react';
import { COMPANY_PROFILE_DATA, SECTION_TITLES } from '../data/companyData';
import { SILKY_EASE } from '../utils/motionPhysics';
import { GlowBeamCard } from './GlowBeamCard';
import { ParallaxSlideFrame, StaggerGlideItem } from './ParallaxSlideFrame';
import { SectionInfographicHeader } from './SectionInfographicHeader';

interface CompanyProfileSectionProps {
  direction: 1 | -1;
}

export function CompanyProfileSection({ direction }: CompanyProfileSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <ParallaxSlideFrame
      id="company-profile"
      direction={direction}
      watermark="COMPANY PROFILE"
      className="bg-transparent text-white pt-24 pb-20 lg:pb-10 lg:pr-14"
    >
      <div className="max-w-[1220px] w-full mx-auto px-6">
        <StaggerGlideItem index={0} direction={direction}>
          <SectionInfographicHeader
            titleEn={SECTION_TITLES.companyProfile.en}
            titleAr={SECTION_TITLES.companyProfile.ar}
            icon={Building2}
          />
        </StaggerGlideItem>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            <StaggerGlideItem index={1} direction={direction}>
              <GlowBeamCard
                beamTone="cyan"
                interactiveTilt
                innerClassName="p-6 sm:p-7 space-y-4"
              >
                {COMPANY_PROFILE_DATA.paragraphsEn.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-[0.98rem] sm:text-[1.04rem] leading-[1.78] text-[#E6F1FF] max-w-[65ch]"
                  >
                    {para}
                  </p>
                ))}
              </GlowBeamCard>
            </StaggerGlideItem>

            <StaggerGlideItem index={2} direction={direction}>
              <GlowBeamCard
                beamTone="gold"
                delaySeconds={-3.5}
                interactiveTilt
                dir="rtl"
                lang="ar"
                innerClassName="p-6 sm:p-7 space-y-4 font-arabic"
              >
                {COMPANY_PROFILE_DATA.paragraphsAr.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-base sm:text-[1.12rem] leading-[1.9] text-[#F4F9FF] font-medium"
                  >
                    {para}
                  </p>
                ))}
              </GlowBeamCard>
            </StaggerGlideItem>
          </div>

          <StaggerGlideItem index={3} direction={direction} className="lg:col-span-5">
            <GlowBeamCard
              beamTone="cyan"
              delaySeconds={-1.8}
              className="h-[340px] sm:h-[400px] lg:h-full min-h-[410px]"
              innerClassName="p-2.5 flex flex-col"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#102A3A]">
                {!imgError ? (
                  <motion.img
                    src={COMPANY_PROFILE_DATA.imageSrc}
                    alt={COMPANY_PROFILE_DATA.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    initial={{ scale: 1.05, opacity: 0.55 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.68, ease: SILKY_EASE }}
                    className="w-full h-full object-cover will-change-[transform,opacity]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#102A3A] to-[#173D52] text-[#4EEAE2]">
                    <Globe2 className="w-12 h-12" />
                  </div>
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/45 via-transparent to-[#2CE6DC]/[0.06]"
                />
              </div>
            </GlowBeamCard>
          </StaggerGlideItem>
        </div>
      </div>
    </ParallaxSlideFrame>
  );
}
