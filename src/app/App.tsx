import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config'; // <--- Assure-toi que le chemin est bon
import NavbarDark from './components/NavbarDark';
import HeroDark from './components/HeroDark';
import WhatWeDo from './components/WhatWeDo';
import Projects from './components/Projects';
import Events from './components/Events';
import Community from './components/Community';
import JoinCTA from './components/JoinCTA';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicy from './components/PrivacyPolicy';
import Impressum from './components/Impressum';
import CustomCursor from './components/CustomCursor';
import SiteBackground from './components/SiteBackground';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isPrivacyPage = route === '#/privacy';
  const isImpressumPage = route === '#/impressum';

  return (
    <I18nextProvider i18n={i18n}>
      <div className="jc-noise relative isolate min-h-screen text-slate-200">
        <SiteBackground />
        <CustomCursor />

        {isPrivacyPage ? (
          <PrivacyPolicy />
        ) : isImpressumPage ? (
          <Impressum />
        ) : (
          <>
            <NavbarDark />
            <main>
              <HeroDark />
              <WhatWeDo />
              <div className="jc-divider" aria-hidden="true" />
              <Projects />
              <div className="jc-divider" aria-hidden="true" />
              <Events />
              <div className="jc-divider" aria-hidden="true" />
              <Community />
              <div className="jc-divider" aria-hidden="true" />
              <JoinCTA />
            </main>
            <Footer />
          </>
        )}

        <CookieConsent />
        <Toaster position="bottom-right" />
      </div>
    </I18nextProvider>
  );
}