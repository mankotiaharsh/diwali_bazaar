import clickUrl from "../assets/sounds/click.mp3";

let click: HTMLAudioElement | null = null;

/** Short click for taps on the shop shelf and pickers. Silently does nothing if the browser blocks audio. */
export function playClick() {
  try {
    click ??= Object.assign(new Audio(clickUrl), { volume: 0.6, preload: "auto" });
    click.currentTime = 0; // restart, so quick repeated taps each click
    void click.play().catch(() => {});
  } catch {
    /* audio unavailable */
  }
}
