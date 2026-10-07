import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Cookie, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ConsentCategory = 'necessary' | 'analytics' | 'marketing';
type ConsentPreferences = Record<ConsentCategory, boolean>;

type StoredConsent = {
  version: number;
  preferences: ConsentPreferences;
  savedAt: string;
};

const CONSENT_STORAGE_KEY = 'justcode-cookie-consent-v1';
const CONSENT_VERSION = 1;

const defaultPreferences: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function readStoredConsent(): StoredConsent | null {
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

function emitConsent(preferences: ConsentPreferences) {
  window.dispatchEvent(new CustomEvent('justcode-cookie-consent', { detail: preferences }));
}

function saveConsent(preferences: ConsentPreferences) {
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

export default function CookieConsent() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(defaultPreferences);

  const categories = useMemo(
    () =>
      (['necessary', 'analytics', 'marketing'] as ConsentCategory[]).map((category) => ({
        key: category,
        title: t(`cookies.categories.${category}.title`),
        description: t(`cookies.categories.${category}.description`),
      })),
    [t]
  );

  useEffect(() => {
    const storedConsent = readStoredConsent();

    if (storedConsent) {
      setPreferences(storedConsent.preferences);
      emitConsent(storedConsent.preferences);
      return;
    }

    setIsVisible(true);
  }, []);

  const closeWithConsent = (nextPreferences: ConsentPreferences) => {
    setPreferences(nextPreferences);
    saveConsent(nextPreferences);
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    closeWithConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleRejectOptional = () => {
    closeWithConsent(defaultPreferences);
  };

  const handleSaveSelection = () => {
    closeWithConsent(preferences);
  };

  const toggleCategory = (category: ConsentCategory) => {
    if (category === 'necessary') {
      return;
    }

    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      [category]: !currentPreferences[category],
    }));
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6 sm:pb-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-consent-title"
          >
            <div className="mx-auto max-w-5xl rounded-lg border border-[#00D4FF]/30 bg-[#071A52]/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                <div className="flex min-w-0 flex-1 gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-[#00D4FF]/35 bg-[#00D4FF]/10 text-[#00D4FF]">
                    <Cookie size={22} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h2 id="cookie-consent-title" className="text-lg font-semibold text-white">
                      {t('cookies.title')}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-white/75">
                      {t('cookies.description')}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                  <button
                    type="button"
                    onClick={handleRejectOptional}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                  >
                    <X size={16} aria-hidden="true" />
                    {t('cookies.reject')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSettingsOpen((isOpen) => !isOpen)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#00D4FF]/30 px-4 text-sm font-semibold text-white transition hover:bg-[#00D4FF]/10"
                    aria-expanded={isSettingsOpen}
                    aria-controls="cookie-settings"
                  >
                    <SlidersHorizontal size={16} aria-hidden="true" />
                    {t('cookies.settings')}
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={`transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#00D4FF] px-4 text-sm font-semibold text-[#071A52] transition hover:bg-white"
                  >
                    <Check size={16} aria-hidden="true" />
                    {t('cookies.accept')}
                  </button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isSettingsOpen && (
                  <motion.div
                    id="cookie-settings"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 md:grid-cols-3">
                      {categories.map((category) => {
                        const isNecessary = category.key === 'necessary';
                        const enabled = preferences[category.key];

                        return (
                          <div
                            key={category.key}
                            className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="text-sm font-semibold text-white">{category.title}</h3>
                                <p className="mt-2 text-xs leading-5 text-white/65">{category.description}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => toggleCategory(category.key)}
                                disabled={isNecessary}
                                className={`relative h-7 w-12 flex-shrink-0 rounded-full border transition ${
                                  enabled
                                    ? 'border-[#00D4FF] bg-[#00D4FF]'
                                    : 'border-white/25 bg-white/10'
                                } ${isNecessary ? 'opacity-80' : 'hover:border-white/45'}`}
                                aria-pressed={enabled}
                                aria-label={category.title}
                              >
                                <span
                                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                                    enabled ? 'translate-x-5' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={handleRejectOptional}
                        className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/20 px-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                      >
                        {t('cookies.reject')}
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveSelection}
                        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-4 text-sm font-semibold text-[#071A52] transition hover:bg-[#00D4FF]"
                      >
                        {t('cookies.save')}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isVisible && (
        <button
          type="button"
          onClick={() => {
            setIsVisible(true);
            setIsSettingsOpen(true);
          }}
          className="fixed bottom-4 left-4 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#00D4FF]/30 bg-[#071A52]/90 text-[#00D4FF] shadow-lg shadow-black/25 backdrop-blur transition hover:bg-[#00D4FF] hover:text-[#071A52]"
          aria-label={t('cookies.reopen')}
        >
          <Cookie size={20} aria-hidden="true" />
        </button>
      )}
    </>
  );
}
