const STORAGE_KEY = 'funkyDancerModernMuted';

export function loadMutedPref(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function saveMutedPref(muted: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(muted));
  } catch {
    // localStorage unavailable (private browsing, etc.) - preference just won't persist
  }
}
