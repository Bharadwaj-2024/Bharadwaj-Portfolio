export type MusicStatus = "starting" | "playing" | "paused" | "blocked" | "error";

type MusicOptions = {
  audio: HTMLAudioElement;
  interactionTarget: EventTarget;
  toggleElement: EventTarget;
  onStatus: (status: MusicStatus) => void;
};

export function createMusicController({ audio, interactionTarget, toggleElement, onStatus }: MusicOptions) {
  let enabled = true;
  let disposed = false;
  let attempt = 0;
  let status: MusicStatus = "paused";
  const interactionOptions = { capture: true };

  function publish(nextStatus: MusicStatus) {
    if (disposed) return;
    status = nextStatus;
    onStatus(nextStatus);
  }

  function stopInteractionRetry() {
    interactionTarget.removeEventListener("click", onInteraction, interactionOptions);
    interactionTarget.removeEventListener("keydown", onInteraction, interactionOptions);
  }

  function play() {
    if (disposed || !enabled) return;
    const currentAttempt = ++attempt;
    publish("starting");

    void audio.play().then(() => {
      if (disposed) return;
      if (!enabled) {
        audio.pause();
        return;
      }
      if (currentAttempt !== attempt) return;
      stopInteractionRetry();
      publish(audio.paused ? "paused" : "playing");
    }).catch((error: unknown) => {
      if (disposed || !enabled || currentAttempt !== attempt) return;
      const name = error instanceof Error ? error.name : "";
      if (name === "NotAllowedError") {
        publish("blocked");
      } else if (name === "AbortError") {
        publish("paused");
      } else {
        stopInteractionRetry();
        publish("error");
      }
    });
  }

  function onInteraction(event: Event) {
    // Let the sound button handle its own click, including keyboard activation.
    if (event.composedPath().includes(toggleElement)) return;
    if (event.type === "keydown" && !["Enter", " "].includes((event as KeyboardEvent).key)) return;
    play();
  }

  function onPlaying() {
    if (!enabled) { audio.pause(); return; }
    stopInteractionRetry();
    publish("playing");
  }

  function onPause() { publish("paused"); }
  function onError() { stopInteractionRetry(); publish("error"); }

  audio.volume = 0.25;
  audio.loop = true;
  audio.addEventListener("playing", onPlaying);
  audio.addEventListener("pause", onPause);
  audio.addEventListener("error", onError);

  // Each fresh page load starts with sound enabled, at the configured volume.
  // Browsers that block audible autoplay still need a real interaction.
  audio.autoplay = true;
  interactionTarget.addEventListener("click", onInteraction, interactionOptions);
  interactionTarget.addEventListener("keydown", onInteraction, interactionOptions);
  play();

  return {
    toggle() {
      if (disposed) return;
      if (status === "playing" || status === "starting") {
        enabled = false;
        audio.autoplay = false;
        ++attempt;
        stopInteractionRetry();
        audio.pause();
        publish("paused");
      } else {
        enabled = true;
        audio.autoplay = true;
        if (status === "error") audio.load();
        play();
      }
    },
    dispose() {
      disposed = true;
      ++attempt;
      stopInteractionRetry();
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.autoplay = false;
      audio.pause();
    },
  };
}
