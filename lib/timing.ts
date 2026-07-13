// Intro choreography: the loading screen plays once per browser session;
// entrance animations wait for it only on that first view.

export const LOADER_SECONDS = 0.9;

const KEY = "vr-intro-seen";

export function loaderAlreadySeen(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function markLoaderSeen(): void {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    // private mode / storage disabled — loader will just replay next visit
  }
}

/** Delay for intro entrance animations, given a stagger offset in seconds. */
export function introDelay(offset: number): number {
  return (loaderAlreadySeen() ? 0.1 : LOADER_SECONDS + 0.3) + offset;
}
