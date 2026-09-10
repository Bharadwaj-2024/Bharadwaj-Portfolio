import assert from "node:assert/strict";
import test from "node:test";
import { createMusicController } from "../src/lib/music-controller.ts";

class TestAudio extends EventTarget {
  paused = true;
  volume = 1;
  loop = false;
  autoplay = false;
  playCalls = 0;
  pauseCalls = 0;
  loadCalls = 0;
  nextPlay = null;

  play() {
    this.playCalls++;
    if (this.nextPlay) return this.nextPlay();
    this.paused = false;
    this.dispatchEvent(new Event("playing"));
    return Promise.resolve();
  }
  pause() { this.pauseCalls++; this.paused = true; this.dispatchEvent(new Event("pause")); }
  load() { this.loadCalls++; }
}

function setup({ audio = new TestAudio() } = {}) {
  const interactionTarget = new EventTarget();
  const toggleElement = new EventTarget();
  const statuses = [];
  const controller = createMusicController({ audio, interactionTarget, toggleElement, onStatus: status => statuses.push(status) });
  return { audio, controller, interactionTarget, toggleElement, statuses };
}

const settle = () => new Promise(resolve => setImmediate(resolve));

test("starts looping music at background volume and pauses/resumes from the control", async () => {
  const { audio, controller, statuses } = setup();
  await settle();
  assert.equal(audio.playCalls, 1);
  assert.equal(audio.loop, true);
  assert.equal(audio.autoplay, true);
  assert.equal(audio.volume, 0.25);
  assert.equal(statuses.at(-1), "playing");
  controller.toggle();
  assert.equal(audio.paused, true);
  assert.equal(audio.autoplay, false);
  controller.toggle();
  await settle();
  assert.equal(audio.playCalls, 2);
  assert.equal(audio.autoplay, true);
  controller.dispose();
});

test("a fresh page load attempts autoplay even if the previous visit stopped music", async () => {
  const first = setup();
  await settle();
  first.controller.toggle();
  assert.equal(first.audio.paused, true);
  first.interactionTarget.dispatchEvent(new Event("click"));
  assert.equal(first.audio.playCalls, 1);
  first.controller.dispose();
  const second = setup({ audio: first.audio });
  await settle();
  assert.equal(second.audio.playCalls, 2);
  assert.equal(second.audio.autoplay, true);
  assert.equal(second.statuses.at(-1), "playing");
  second.controller.dispose();
});

test("blocked autoplay retries on interaction and removes its fallback after success", async () => {
  const audio = new TestAudio();
  audio.nextPlay = () => Promise.reject(new DOMException("User interaction required", "NotAllowedError"));
  const { controller, interactionTarget, statuses } = setup({ audio });
  await settle();
  assert.equal(statuses.at(-1), "blocked");
  audio.nextPlay = null;
  interactionTarget.dispatchEvent(new Event("click"));
  await settle();
  assert.equal(statuses.at(-1), "playing");
  assert.equal(audio.playCalls, 2);
  interactionTarget.dispatchEvent(new Event("click"));
  assert.equal(audio.playCalls, 2);
  controller.dispose();
});

test("clicking the sound button does not also trigger the global fallback", async () => {
  const audio = new TestAudio();
  audio.nextPlay = () => Promise.reject(new DOMException("Blocked", "NotAllowedError"));
  const { controller, interactionTarget, toggleElement } = setup({ audio });
  await settle();
  const click = new Event("click");
  click.composedPath = () => [toggleElement, interactionTarget];
  interactionTarget.dispatchEvent(click);
  assert.equal(audio.playCalls, 1);
  controller.dispose();
});

test("turning music off during a pending start prevents a later retry", async () => {
  const audio = new TestAudio();
  let finish;
  audio.nextPlay = () => new Promise(resolve => { finish = resolve; });
  const { controller, interactionTarget, statuses } = setup({ audio });
  controller.toggle();
  finish();
  await settle();
  interactionTarget.dispatchEvent(new Event("click"));
  assert.equal(audio.playCalls, 1);
  assert.equal(audio.paused, true);
  assert.equal(statuses.at(-1), "paused");
  controller.dispose();
});

test("an old play promise cannot pause the player after a React remount", async () => {
  const audio = new TestAudio();
  let finish;
  audio.nextPlay = () => new Promise(resolve => { finish = resolve; });
  const first = setup({ audio });
  first.controller.dispose();
  audio.nextPlay = null;
  const second = setup({ audio });
  await settle();
  finish();
  await settle();
  assert.equal(audio.paused, false);
  assert.equal(second.statuses.at(-1), "playing");
  second.controller.dispose();
});

test("media failures stop automatic retries and offer an explicit retry", async () => {
  const audio = new TestAudio();
  audio.nextPlay = () => Promise.reject(new DOMException("Cannot load", "NotSupportedError"));
  const { controller, statuses, interactionTarget } = setup({ audio });
  await settle();
  assert.equal(statuses.at(-1), "error");
  interactionTarget.dispatchEvent(new Event("click"));
  assert.equal(audio.playCalls, 1);
  audio.nextPlay = null;
  controller.toggle();
  await settle();
  assert.equal(audio.loadCalls, 1);
  assert.equal(statuses.at(-1), "playing");
  controller.dispose();
});
