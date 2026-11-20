import {
  COMMUNICATION_DATA,
  CORE_VALUES_DATA,
  OTHER_SERVICES_DATA,
  PROCESS_STEPS_DATA,
  TRANSLATION_SERVICES_DATA,
  type BilingualText,
} from '../data/companyData';

export function buildWhatsAppUrl(rawPhone: string = COMMUNICATION_DATA.whatsappRaw): string {
  const digits = rawPhone.replace(/\D/g, '');
  return `https://wa.me/${digits}`;
}

export function buildTelUrl(rawPhone: string = COMMUNICATION_DATA.whatsappRaw): string {
  const digits = rawPhone.replace(/\D/g, '');
  return `tel:+${digits}`;
}

export function buildMailtoUrl(email: string): string {
  const trimmed = email.trim();
  return `mailto:${trimmed}`;
}

export function computeStepProgress(step: number, totalSteps: number = PROCESS_STEPS_DATA.length): number {
  if (totalSteps <= 1) return 100;
  const clamped = Math.max(1, Math.min(step, totalSteps));
  return Math.round(((clamped - 1) / (totalSteps - 1)) * 100);
}

export function hasCompleteBilingualText(items: readonly BilingualText[]): boolean {
  return items.every((item) => item.en.trim().length > 0 && item.ar.trim().length > 0);
}

export function getReferenceContentCounts() {
  return {
    coreValues: CORE_VALUES_DATA.length,
    translationServices: TRANSLATION_SERVICES_DATA.length,
    otherServices: OTHER_SERVICES_DATA.length,
    processSteps: PROCESS_STEPS_DATA.length,
    emails: COMMUNICATION_DATA.emails.length,
  };
}
