import { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileDown,
  Landmark,
  MailCheck,
  Send,
  Workflow,
} from 'lucide-react';
import { PROCESS_STEPS_DATA, SECTION_TITLES } from '../data/companyData';
import { computeStepProgress } from '../utils/brochureHelpers';
import { SILKY_EASE } from '../utils/motionPhysics';
import { GlowBeamCard } from './GlowBeamCard';
import { ParallaxSlideFrame, StaggerGlideItem } from './ParallaxSlideFrame';
import { SectionInfographicHeader } from './SectionInfographicHeader';

const STEP_ICONS = [
  Send,
  MailCheck,
  ClipboardList,
  Landmark,
  CheckCircle2,
  FileDown,
] as const;

interface ProcessTimelineSectionProps {
  direction: 1 | -1;
}

export function ProcessTimelineSection({ direction }: ProcessTimelineSectionProps) {
  const [activeStep, setActiveStep] = useState<number>(1);

  const selected =
    PROCESS_STEPS_DATA.find((item) => item.step === activeStep) ??
    PROCESS_STEPS_DATA[0];
  const SelectedIcon = STEP_ICONS[selected.step - 1] ?? Send;
  const progressPercent = computeStepProgress(activeStep, PROCESS_STEPS_DATA.length);

  return (
    <ParallaxSlideFrame
      id="process"
      direction={direction}
      watermark="TRANSLATION PROCESS"
      className="bg-transparent text-white pt-24 pb-20 lg:pb-10 lg:pr-14"
    >
      <div className="max-w-[1220px] w-full mx-auto px-6">
        <StaggerGlideItem index={0} direction={direction}>
          <SectionInfographicHeader
            titleEn={SECTION_TITLES.translationRequestProcess.en}
            titleAr={SECTION_TITLES.translationRequestProcess.ar}
            icon={Workflow}
          />
        </StaggerGlideItem>

        {/* Desktop Interactive Luminous Circuit Timeline inside Frosted Glow Card */}
        <StaggerGlideItem index={1} direction={direction} className="hidden lg:block mb-6">
          <GlowBeamCard
            beamTone="cyan"
            innerClassName="relative px-5 pt-6 pb-5"
          >
            <div
              aria-hidden="true"
              className="absolute top-[3.35rem] left-[9%] right-[9%] h-[2px] bg-white/12"
            />
            <motion.div
              aria-hidden="true"
              animate={{ scaleX: Math.max(0.04, progressPercent / 100) }}
              transition={{ duration: 0.6, ease: SILKY_EASE }}
              style={{ transformOrigin: 'left' }}
              className="absolute top-[3.35rem] left-[9%] right-[9%] h-[2.5px] bg-gradient-to-r from-[#00F0FF] via-[#68C5C2] to-[#F3D37A] shadow-[0_0_16px_rgba(0,240,255,0.8)] will-change-transform"
            />

            <div className="grid grid-cols-6 gap-4 relative z-10">
              {PROCESS_STEPS_DATA.map((item, idx) => {
                const Icon = STEP_ICONS[idx] ?? Send;
                const isSelected = item.step === activeStep;
                const isCompleted = item.step <= activeStep;

                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setActiveStep(item.step)}
                    aria-current={isSelected ? 'step' : undefined}
                    aria-label={`${item.step}`}
                    className="group text-start flex flex-col items-start p-2 rounded-xl cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00F0FF]"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] mb-3.5 ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#2CE6DC] to-[#68C5C2] text-[#0D1B2A] border-[#9FFAF4] scale-105 shadow-[0_0_24px_rgba(44,230,220,0.55)]'
                          : isCompleted
                          ? 'bg-[#173E54]/80 text-[#9FFAF4] border-[#4EEAE2]/55'
                          : 'bg-[#123042]/70 text-white/75 border-white/18 group-hover:border-[#4EEAE2]/60 group-hover:text-[#9FFAF4]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-xs font-bold tabular-nums mb-1.5 px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-[#00F0FF]/18 text-[#8FF6FF]'
                          : 'text-[#F3D37A]/80'
                      }`}
                    >
                      0{item.step}
                    </span>
                    <p className="text-xs text-white/78 group-hover:text-white leading-relaxed line-clamp-3 transition-colors font-medium">
                      {item.en}
                    </p>
                  </button>
                );
              })}
            </div>
          </GlowBeamCard>
        </StaggerGlideItem>

        {/* Desktop Bilingual Step Spotlight Console */}
        <StaggerGlideItem index={2} direction={direction} className="hidden lg:block">
          <GlowBeamCard
            beamTone="gold"
            delaySeconds={-2.8}
            deepSurface
            innerClassName="p-7 sm:p-8"
          >
            <motion.div
              key={selected.step}
              initial={{ opacity: 0.35, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: SILKY_EASE }}
              data-testid="process-step-detail"
              className="will-change-[transform,opacity]"
            >
              <div className="flex items-center justify-between gap-6 pb-5 mb-6 border-b border-white/12">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl bg-[#00F0FF]/18 border border-[#00F0FF]/45 text-[#8FF6FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.28)]">
                    <SelectedIcon className="w-5 h-5" />
                  </span>
                  <span className="text-sm font-bold text-[#F5DA88] tabular-nums">
                    {selected.step} / {PROCESS_STEPS_DATA.length} · {progressPercent}%
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    aria-label="Previous step"
                    onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                    disabled={activeStep === 1}
                    className="w-10 h-10 rounded-lg border border-white/18 bg-white/[0.04] flex items-center justify-center text-white disabled:opacity-30 hover:bg-[#00F0FF]/18 hover:border-[#00F0FF]/55 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next step"
                    onClick={() =>
                      setActiveStep((prev) => Math.min(PROCESS_STEPS_DATA.length, prev + 1))
                    }
                    disabled={activeStep === PROCESS_STEPS_DATA.length}
                    className="w-10 h-10 rounded-lg bg-[#00F0FF]/20 border border-[#00F0FF]/55 text-[#8FF6FF] flex items-center justify-center disabled:opacity-30 hover:bg-[#00F0FF]/32 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 items-center">
                <p className="col-span-6 font-display text-lg xl:text-xl font-semibold text-white leading-relaxed">
                  {selected.en}
                </p>
                <p
                  dir="rtl"
                  lang="ar"
                  className="col-span-6 font-arabic text-lg xl:text-xl font-semibold text-[#F5DA88] leading-relaxed"
                >
                  {selected.ar}
                </p>
              </div>
            </motion.div>
          </GlowBeamCard>
        </StaggerGlideItem>

        {/* Mobile & Tablet Vertical Frosted Glow Timeline */}
        <div className="lg:hidden relative space-y-4 border-s border-[#00F0FF]/30 ps-5 ms-2 pb-12">
          {PROCESS_STEPS_DATA.map((item, idx) => {
            const Icon = STEP_ICONS[idx] ?? Send;
            return (
              <StaggerGlideItem key={item.step} index={idx + 1} direction={direction}>
                <GlowBeamCard
                  beamTone={idx % 2 === 0 ? 'cyan' : 'gold'}
                  delaySeconds={-idx * 1.1}
                  roundedClass="rounded-xl"
                  innerClassName="p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#00F0FF]/18 border border-[#00F0FF]/45 text-[#8FF6FF] text-sm font-bold flex items-center justify-center tabular-nums">
                      {item.step}
                    </span>
                    <Icon className="w-4 h-4 text-[#F3D37A]" />
                  </div>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {item.en}
                  </p>
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-sm font-semibold text-[#F5DA88] leading-relaxed pt-2.5 border-t border-white/10"
                  >
                    {item.ar}
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
