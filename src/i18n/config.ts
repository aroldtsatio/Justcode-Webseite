import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de.json';
import en from './locales/en.json';

const languageStorageKey = 'justcode-language';

function savedLanguage() {
  try {
    const language = localStorage.getItem(languageStorageKey);
    return language === 'en' ? 'en' : 'de';
  } catch {
    return 'de';
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: de },
      en: { translation: en },
    },
    lng: savedLanguage(),
    supportedLngs: ['de', 'en'],
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false,
    },
  });

function syncLanguage(language: string) {
  const selectedLanguage = language === 'en' ? 'en' : 'de';
  if (typeof document !== 'undefined') {
    document.documentElement.lang = selectedLanguage;
  }
  try {
    localStorage.setItem(languageStorageKey, selectedLanguage);
  } catch {
    // Language switching still works when browser storage is unavailable.
  }
}

i18n.on('languageChanged', syncLanguage);
syncLanguage(i18n.language);

export default i18n;
