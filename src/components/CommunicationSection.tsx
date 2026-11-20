import { motion } from 'motion/react';
import { Mail, MessagesSquare, Phone } from 'lucide-react';
import {
  BRAND_DATA,
  COMMUNICATION_DATA,
  SECTION_TITLES,
} from '../data/companyData';
import {
  buildMailtoUrl,
  buildTelUrl,
  buildWhatsAppUrl,
} from '../utils/brochureHelpers';
import { LOGO_SPRING } from '../utils/motionPhysics';
import { BrandMark } from './BrandMark';
import { GlowBeamCard } from './GlowBeamCard';
import { ParallaxSlideFrame, StaggerGlideItem } from './ParallaxSlideFrame';
import { SectionInfographicHeader } from './SectionInfographicHeader';

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M9.5 8.8c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.5.6c-.1.1-.1.3 0 .5.4.8 1.2 1.6 2 2 .2.1.4.1.5 0l.6-.5c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.5.8-.6.4-1.5.5-2.6.1-1.9-.7-3.6-2.4-4.3-4.3-.4-1.1-.3-2 .1-2.6z" />
    </svg>
  );
}

interface CommunicationSectionProps {
  direction: 1 | -1;
  onNavigate: (sectionId: string) => void;
}

export function CommunicationSection({
  direction,
  onNavigate,
}: CommunicationSectionProps) {
  return (
    <ParallaxSlideFrame
      as="footer"
      id="communication"
      direction={direction}
      watermark="COMMUNICATION CHANNELS"
      className="justify-between bg-transparent text-white pt-24 pb-16 lg:pb-8 lg:pr-14"
    >
      {/* Top Section Infographic Header */}
      <div className="relative z-10 max-w-[1160px] w-full mx-auto px-6">
        <StaggerGlideItem index={0} direction={direction}>
          <SectionInfographicHeader
            titleEn={SECTION_TITLES.communicationChannels.en}
            titleAr={SECTION_TITLES.communicationChannels.ar}
            icon={MessagesSquare}
          />
        </StaggerGlideItem>
      </div>

      {/* Lower-Positioned Compact Contact Channels Cluster — Crisp Pure White Typography */}
      <div className="relative z-10 max-w-[1040px] w-full mx-auto px-6 mt-auto pt-4 sm:pt-8">
        <StaggerGlideItem index={1} direction={direction}>
          <GlowBeamCard
            beamTone="cyan"
            className="mb-4 sm:mb-5"
            roundedClass="rounded-xl"
            innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center px-5 py-4"
          >
            <p className="lg:col-span-6 font-display text-base sm:text-lg font-semibold text-white leading-relaxed">
              {COMMUNICATION_DATA.promptEn}
            </p>
            <p
              dir="rtl"
              lang="ar"
              className="lg:col-span-6 font-arabic text-lg sm:text-xl font-bold text-white leading-relaxed"
            >
              {COMMUNICATION_DATA.promptAr}
            </p>
          </GlowBeamCard>
        </StaggerGlideItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Compact Email Channel Card with Email Icon beside each address */}
          <StaggerGlideItem index={2} direction={direction}>
            <GlowBeamCard
              beamTone="cyan"
              interactiveTilt
              className="h-full"
              roundedClass="rounded-xl"
              innerClassName="p-5 flex flex-col justify-between gap-3.5"
            >
              <span className="font-display text-base font-bold text-white">
                {COMMUNICATION_DATA.emailLabel}
              </span>

              <div className="flex flex-col gap-2.5">
                {COMMUNICATION_DATA.emails.map((email) => (
                  <a
                    key={email}
                    href={buildMailtoUrl(email)}
                    className="group inline-flex items-center gap-3 font-display text-base sm:text-lg font-semibold text-white hover:text-[#9FFAF4] transition-colors w-fit"
                  >
                    <span className="w-9 h-9 rounded-lg bg-[#2CE6DC]/16 border border-[#56EFE8]/40 text-white group-hover:bg-[#2CE6DC]/28 group-hover:border-[#9FFAF4] flex items-center justify-center shrink-0 transition-colors">
                      <Mail className="w-4 h-4" />
                    </span>
                    <span className="break-all sm:break-normal">{email}</span>
                  </a>
                ))}
              </div>
            </GlowBeamCard>
          </StaggerGlideItem>

          {/* Compact WhatsApp & Phone Call Card with BOTH WhatsApp and Phone Call icons next to the number */}
          <StaggerGlideItem index={3} direction={direction}>
            <GlowBeamCard
              beamTone="cyan"
              fastBeam
              delaySeconds={-2.2}
              interactiveTilt
              deepSurface
              className="h-full"
              roundedClass="rounded-xl"
              innerClassName="p-5 flex flex-col justify-between gap-3.5"
            >
              <span className="font-display text-base font-bold text-white">
                {COMMUNICATION_DATA.whatsappLabel}
              </span>

              <div className="flex flex-wrap items-center gap-3 my-auto">
                <a
                  href={buildWhatsAppUrl(COMMUNICATION_DATA.whatsappRaw)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${COMMUNICATION_DATA.whatsappDisplay}`}
                  className="w-9 h-9 rounded-lg bg-[#25D366]/22 border border-[#25D366]/55 text-white hover:bg-[#25D366]/36 flex items-center justify-center transition-colors shrink-0"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
                <a
                  href={buildTelUrl(COMMUNICATION_DATA.whatsappRaw)}
                  aria-label={`Call ${COMMUNICATION_DATA.whatsappDisplay}`}
                  className="w-9 h-9 rounded-lg bg-[#2CE6DC]/20 border border-[#56EFE8]/50 text-white hover:bg-[#2CE6DC]/35 flex items-center justify-center transition-colors shrink-0"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={buildWhatsAppUrl(COMMUNICATION_DATA.whatsappRaw)}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="inline-block font-display text-xl sm:text-2xl font-bold text-white hover:text-[#9FFAF4] transition-colors tabular-nums"
                >
                  {COMMUNICATION_DATA.whatsappDisplay}
                </a>
              </div>
            </GlowBeamCard>
          </StaggerGlideItem>
        </div>

        {/* Signature Shared-Element Brand Logo Entrance (flies smoothly down from top-left Navbar into bottom-center & reverses on scroll up) */}
        <div className="mt-7 sm:mt-8 mb-4 flex flex-col items-center justify-center">
          <motion.button
            type="button"
            layoutId="rowad-shared-brand-logo"
            onClick={() => onNavigate('hero')}
            aria-label={BRAND_DATA.heroTitleEn}
            transition={{ layout: LOGO_SPRING }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2CE6DC] rounded-lg will-change-transform"
          >
            <BrandMark
              layout="full"
              variant="light"
              className="w-[215px] sm:w-[270px] h-auto drop-shadow-[0_10px_24px_rgba(44,230,220,0.24)]"
              alt={BRAND_DATA.heroTitleEn}
            />
          </motion.button>
        </div>

        {/* Quiet Pure-White Navigation Links Strip */}
        <StaggerGlideItem index={4} direction={direction}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-3 border-t border-white/15 text-xs sm:text-sm font-medium text-white">
            <button
              type="button"
              onClick={() => onNavigate('company-profile')}
              className="text-white hover:text-[#9FFAF4] transition-colors cursor-pointer whitespace-nowrap"
            >
              {SECTION_TITLES.companyProfile.en}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('core-values')}
              className="text-white hover:text-[#9FFAF4] transition-colors cursor-pointer whitespace-nowrap"
            >
              {SECTION_TITLES.coreValues.en}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('specialized-services')}
              className="text-white hover:text-[#9FFAF4] transition-colors cursor-pointer whitespace-nowrap"
            >
              {SECTION_TITLES.specializedServices.en}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('process')}
              className="text-white hover:text-[#9FFAF4] transition-colors cursor-pointer whitespace-nowrap"
            >
              {SECTION_TITLES.translationRequestProcess.en}
            </button>
          </div>
        </StaggerGlideItem>
      </div>
    </ParallaxSlideFrame>
  );
}
