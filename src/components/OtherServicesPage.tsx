import {
  BadgeCheck,
  Briefcase,
  Building2,
  FileSignature,
  FolderCheck,
  GraduationCap,
  Landmark,
  Layers,
  Printer,
  Scale,
  ScrollText,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { OTHER_SERVICES_DATA, SECTION_TITLES } from '../data/companyData';
import { GlowBeamCard } from './GlowBeamCard';
import { ParallaxSlideFrame, StaggerGlideItem } from './ParallaxSlideFrame';
import { SectionInfographicHeader } from './SectionInfographicHeader';

const OTHER_SERVICE_ICONS: Record<string, LucideIcon> = {
  'business-setup': Building2,
  'drafting-contracts': FileSignature,
  'moa-amendments': ScrollText,
  'notary-public': Scale,
  'courts-prosecution': Landmark,
  'degree-recognition': GraduationCap,
  printing: Printer,
  'pr-representative': Users,
  attestation: BadgeCheck,
  'transactions-processing': FolderCheck,
};

interface OtherServicesPageProps {
  direction: 1 | -1;
}

export function OtherServicesPage({ direction }: OtherServicesPageProps) {
  return (
    <ParallaxSlideFrame
      id="other-services"
      direction={direction}
      watermark="OTHER SERVICES"
      className="bg-transparent text-white pt-24 pb-20 lg:pb-10 lg:pr-14"
    >
      <div className="max-w-[1220px] w-full mx-auto px-6">
        <StaggerGlideItem index={0} direction={direction}>
          <SectionInfographicHeader
            titleEn={SECTION_TITLES.specializedServices.en}
            titleAr={SECTION_TITLES.specializedServices.ar}
            icon={Briefcase}
            subPillar={{
              icon: Layers,
              en: SECTION_TITLES.otherServicesPillar.en,
              ar: SECTION_TITLES.otherServicesPillar.ar,
            }}
          />
        </StaggerGlideItem>

        <div
          data-testid="other-services-list"
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5"
        >
          {OTHER_SERVICES_DATA.map((service, idx) => {
            const Icon = OTHER_SERVICE_ICONS[service.id] ?? Briefcase;
            return (
              <StaggerGlideItem
                key={service.id}
                index={Math.floor(idx / 2) + 1}
                direction={direction}
              >
                <GlowBeamCard
                  beamTone={idx % 2 === 0 ? 'cyan' : 'gold'}
                  delaySeconds={-(idx * 0.75)}
                  interactiveTilt
                  roundedClass="rounded-xl"
                  className="h-full"
                  innerClassName="group px-4 sm:px-5 py-3.5 flex flex-col justify-between gap-1.5 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#2CE6DC]/14 border border-[#56EFE8]/32 text-[#7BF6F0] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#2CE6DC]/25 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </span>
                    <p className="font-display text-sm sm:text-[0.95rem] font-semibold text-white group-hover:text-[#9FFAF4] transition-colors leading-snug pt-1">
                      {service.en}
                    </p>
                  </div>

                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-sm sm:text-[0.95rem] text-[#F5DA88] font-medium ps-11 leading-snug"
                  >
                    {service.ar}
                  </p>
                </GlowBeamCard>
              </StaggerGlideItem>
            );
          })}
        </div>
      </div>
    </ParallaxSlideFrame>
  );
}
