export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';
export type ConsentPreferences = Record<ConsentCategory, boolean>;

export type StoredConsent = {
  version: number;
  preferences: ConsentPreferences;
  savedAt: string;
};

export const CONSENT_STORAGE_KEY = 'justcode-cookie-consent-v1';
export const CONSENT_VERSION = 1;

export const defaultPreferences: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function readStoredConsent(): StoredConsent | null {
  try {
    const rawConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!rawConsent) {
      return null;
    }

    const parsedConsent = JSON.parse(rawConsent) as StoredConsent;
    return parsedConsent.version === CONSENT_VERSION ? parsedConsent : null;
  } catch {
    return null;
  }
}

export function emitConsent(preferences: ConsentPreferences) {
  window.dispatchEvent(new CustomEvent('justcode-cookie-consent', { detail: preferences }));
}

export function saveConsent(preferences: ConsentPreferences) {
  const consent: StoredConsent = {
    version: CONSENT_VERSION,
    preferences: {
      ...preferences,
      necessary: true,
    },
    savedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  emitConsent(consent.preferences);
}
