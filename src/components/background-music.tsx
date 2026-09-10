"use client";

import { useEffect, useRef, useState } from "react";
import { createMusicController, type MusicStatus } from "@/lib/music-controller";
import styles from "./background-music.module.css";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const controllerRef = useRef<ReturnType<typeof createMusicController> | null>(null);
  const [status, setStatus] = useState<MusicStatus>("paused");

  useEffect(() => {
    if (!audioRef.current || !buttonRef.current) return;
    const controller = createMusicController({
      audio: audioRef.current,
      toggleElement: buttonRef.current,
      interactionTarget: document,
      onStatus: setStatus,
    });
    controllerRef.current = controller;
    return () => {
      controllerRef.current = null;
      controller.dispose();
    };
  }, []);

  const active = status === "playing" || status === "starting";
  const label = status === "blocked" ? "Play music" : status === "error" ? "Retry music" : active ? "Music on" : "Music off";

  return (
    <div className={styles.playerSpace}>
      <audio ref={audioRef} src="/peaky_blinders_music.mp3" autoPlay preload="auto" loop hidden />
      <button
        ref={buttonRef}
        type="button"
        className={styles.toggle}
        onClick={() => controllerRef.current?.toggle()}
        aria-label="Background music"
        aria-pressed={active}
        title={status === "error" ? "Music could not load. Click to retry." : active ? "Turn background music off" : "Play background music"}
        data-playing={status === "playing"}
      >
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
          <path d="M4 9h4l5-4v14l-5-4H4V9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          {active ? <path d="M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /> : <path d="m17 9 5 6m0-6-5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
        </svg>
        <span className={styles.label}>{label}</span>
      </button>
    </div>
  );
}
