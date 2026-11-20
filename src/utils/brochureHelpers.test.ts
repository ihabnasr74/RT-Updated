import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CORE_VALUES_DATA,
  OTHER_SERVICES_DATA,
  PROCESS_STEPS_DATA,
  TRANSLATION_SERVICES_DATA,
} from '../data/companyData';
import {
  buildMailtoUrl,
  buildTelUrl,
  buildWhatsAppUrl,
  computeStepProgress,
  getReferenceContentCounts,
  hasCompleteBilingualText,
} from './brochureHelpers';

test('reference content counts match the attached brochure exactly', () => {
  const counts = getReferenceContentCounts();
  assert.deepEqual(counts, {
    coreValues: 4,
    translationServices: 4,
    otherServices: 10,
    processSteps: 6,
    emails: 2,
  });
});

test('all bilingual brochure arrays contain non-empty English and Arabic entries', () => {
  assert.equal(hasCompleteBilingualText(CORE_VALUES_DATA), true);
  assert.equal(hasCompleteBilingualText(TRANSLATION_SERVICES_DATA), true);
  assert.equal(hasCompleteBilingualText(OTHER_SERVICES_DATA), true);
  assert.equal(hasCompleteBilingualText(PROCESS_STEPS_DATA), true);
});

test('contact URLs format official brochure WhatsApp, Phone, and Emails cleanly', () => {
  assert.equal(buildWhatsAppUrl(), 'https://wa.me/971505095759');
  assert.equal(buildTelUrl(), 'tel:+971505095759');
  assert.equal(buildMailtoUrl('Sami.legal@outlook.com'), 'mailto:Sami.legal@outlook.com');
  assert.equal(buildMailtoUrl('SamiTranslation@outlook.com'), 'mailto:SamiTranslation@outlook.com');
});

test('computeStepProgress maps steps 1..6 to 0..100 percent', () => {
  assert.equal(computeStepProgress(1, 6), 0);
  assert.equal(computeStepProgress(4, 6), 60);
  assert.equal(computeStepProgress(6, 6), 100);
  assert.equal(computeStepProgress(99, 6), 100);
});
