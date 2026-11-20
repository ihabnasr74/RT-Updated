import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DECK_PAGES,
  PARALLAX_TIMING,
  computeCardStaggerDelay,
  computeContinuousScrollProgress,
  computeDeckProgress,
  computeParallaxLayerMotion,
  getNearestPageIndex,
  getNextPageIndex,
  getPageIndexById,
  resolveTouchNavigation,
  resolveWheelNavigation,
} from './deckNavigation';

test('DECK_PAGES contains 7 dark luxury slides with snappy 60fps transition timing', () => {
  assert.equal(DECK_PAGES.length, 7);
  assert.equal(DECK_PAGES[0].id, 'hero');
  assert.equal(DECK_PAGES[6].id, 'communication');
  assert.equal(PARALLAX_TIMING.cooldownMs, 450);
  assert.equal(PARALLAX_TIMING.transitionDurationSec, 0.48);
  assert.equal(PARALLAX_TIMING.exitDurationSec, 0.35);
  assert.equal(PARALLAX_TIMING.cardStaggerSec, 0.05);
  assert.equal(getPageIndexById('specialized-services'), 3);
  assert.equal(getPageIndexById('process'), 5);
  assert.equal(getPageIndexById('unknown'), 0);
});

test('computeCardStaggerDelay produces crisp 50ms stagger increments capped safely', () => {
  assert.equal(computeCardStaggerDelay(0), 0);
  assert.equal(computeCardStaggerDelay(1), 0.05);
  assert.equal(computeCardStaggerDelay(4), 0.2);
  assert.equal(computeCardStaggerDelay(20, 6), 0.3);
});

test('computeParallaxLayerMotion produces strictly ascending offsets with 50ms stagger', () => {
  const l0 = computeParallaxLayerMotion(0, 1, 40);
  const l1 = computeParallaxLayerMotion(1, 1, 40);
  const l2 = computeParallaxLayerMotion(2, 1, 40);
  const l3 = computeParallaxLayerMotion(3, 1, 40);

  assert.ok(l0.enterY < l1.enterY);
  assert.ok(l1.enterY < l2.enterY);
  assert.ok(l2.enterY < l3.enterY);
  assert.equal(l2.enterY, 40);
  assert.equal(l2.delaySec, 0.1);

  const reverse = computeParallaxLayerMotion(2, -1, 40);
  assert.equal(reverse.enterY, -40);
  assert.ok(reverse.exitY > 0);
});

test('getNextPageIndex clamps properly at start and end boundaries', () => {
  assert.equal(getNextPageIndex(0, -1, 7), 0);
  assert.equal(getNextPageIndex(0, 1, 7), 1);
  assert.equal(getNextPageIndex(6, 1, 7), 6);
  assert.equal(getNextPageIndex(6, -1, 7), 5);
});

test('resolveWheelNavigation flips immediately on first tick and respects internal scroll', () => {
  const down = resolveWheelNavigation({
    deltaY: 16,
    scrollTop: 0,
    scrollHeight: 900,
    clientHeight: 900,
    currentIndex: 0,
  });
  assert.deepEqual(down, { nextIndex: 1, direction: 1 });

  const internal = resolveWheelNavigation({
    deltaY: 60,
    scrollTop: 0,
    scrollHeight: 1400,
    clientHeight: 900,
    currentIndex: 2,
  });
  assert.equal(internal, null);

  const bottomReached = resolveWheelNavigation({
    deltaY: 60,
    scrollTop: 500,
    scrollHeight: 1400,
    clientHeight: 900,
    currentIndex: 2,
  });
  assert.deepEqual(bottomReached, { nextIndex: 3, direction: 1 });

  const tinyJitter = resolveWheelNavigation({
    deltaY: 3,
    scrollTop: 0,
    scrollHeight: 900,
    clientHeight: 900,
    currentIndex: 1,
  });
  assert.equal(tinyJitter, null);
});

test('resolveTouchNavigation maps vertical swipes to page direction', () => {
  const swipeUp = resolveTouchNavigation({
    startY: 420,
    endY: 300,
    scrollTop: 0,
    scrollHeight: 844,
    clientHeight: 844,
    currentIndex: 1,
  });
  assert.deepEqual(swipeUp, { nextIndex: 2, direction: 1 });

  const swipeDown = resolveTouchNavigation({
    startY: 220,
    endY: 360,
    scrollTop: 0,
    scrollHeight: 844,
    clientHeight: 844,
    currentIndex: 2,
  });
  assert.deepEqual(swipeDown, { nextIndex: 1, direction: -1 });
});

test('computeDeckProgress and continuous scroll helpers stay consistent', () => {
  assert.equal(Number(computeDeckProgress(0, 7).toFixed(3)), 0.143);
  assert.equal(computeDeckProgress(6, 7), 1);
  const offsets = [0, 900, 1800, 2700, 3600, 4500, 5400];
  assert.equal(getNearestPageIndex(0, offsets), 0);
  assert.equal(getNearestPageIndex(1780, offsets), 2);
  assert.equal(Number(computeContinuousScrollProgress(0, 5400, 7).toFixed(3)), 0.143);
  assert.equal(computeContinuousScrollProgress(5400, 5400, 7), 1);
});
