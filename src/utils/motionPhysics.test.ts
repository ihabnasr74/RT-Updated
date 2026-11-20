import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LOGO_SPRING,
  SILKY_EASE,
  clampDeltaSec,
  computeTiltAngles,
  dampValue,
  smoothDampFactor,
} from './motionPhysics';

test('clampDeltaSec bounds frame spikes and rejects non-positive deltas', () => {
  assert.equal(clampDeltaSec(0), 0);
  assert.equal(clampDeltaSec(-12), 0);
  assert.equal(clampDeltaSec(Number.NaN), 0);
  assert.equal(clampDeltaSec(16), 0.016);
  assert.equal(clampDeltaSec(250), 0.05);
  assert.equal(clampDeltaSec(250, 0.033), 0.033);
});

test('dampValue is frame-rate independent across 60Hz vs 120Hz steps', () => {
  const lambda = 6;
  // Two 120Hz frames (8.333ms each) should match one 60Hz frame (16.666ms)
  const oneStep60Hz = dampValue(0, 100, lambda, 1 / 60);
  const halfStep120Hz = dampValue(0, 100, lambda, 1 / 120);
  const twoSteps120Hz = dampValue(halfStep120Hz, 100, lambda, 1 / 120);

  assert.ok(Math.abs(oneStep60Hz - twoSteps120Hz) < 1e-9);
  assert.equal(smoothDampFactor(0, 0.016), 0);
  assert.equal(smoothDampFactor(6, 0), 0);
});

test('computeTiltAngles clamps smoothly within symmetric degree bounds', () => {
  assert.deepEqual(computeTiltAngles(0, 0, 3.6), { rx: 0, ry: 0 });
  assert.deepEqual(computeTiltAngles(0.5, -0.5, 3.6), { rx: 3.6, ry: 3.6 });
  assert.deepEqual(computeTiltAngles(2, 2, 3.6), { rx: -3.6, ry: 3.6 });
  assert.equal(SILKY_EASE.length, 4);
  assert.equal(LOGO_SPRING.type, 'spring');
});
