import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config'; // <--- Assure-toi que le chemin est bon
import NavbarDark from './components/NavbarDark';
import HeroDark from './components/HeroDark';
import WhatWeDo from './components/WhatWeDo';
import Events from './components/Events';
import Community from './components/Community';
import JoinCTA from './components/JoinCTA';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicy from './components/PrivacyPolicy';
import Impressum from './components/Impressum';
import Workshops from './components/Workshops';
import ProjectsPage from './components/ProjectsPage';
import EventsPage from './components/EventsPage';
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
  const isWorkshopsPage = route === '#/workshops';
  const isProjectsPage = route === '#/projects';
  const isEventsPage = route === '#/events';

  // Coming back from a sub-page (e.g. #/workshops → #team): scroll to the section once it is rendered
  useEffect(() => {
    if (!route || route.startsWith('#/')) return;
    const id = route.slice(1);
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, [route]);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="jc-noise relative isolate min-h-screen text-slate-200">
        <SiteBackground />
        <CustomCursor />

        {isPrivacyPage ? (
          <PrivacyPolicy />
        ) : isImpressumPage ? (
          <Impressum />
        ) : isWorkshopsPage ? (
          <Workshops />
        ) : isProjectsPage ? (
          <ProjectsPage />
        ) : isEventsPage ? (
          <EventsPage />
        ) : (
          <>
            <NavbarDark />
            <main>
              <HeroDark />
              <WhatWeDo />
              <div className="jc-divider" aria-hidden="true" />
              <Events ids={['talkshow']} />
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