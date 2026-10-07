import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import TechDomains from './components/TechDomains';
import Activities from './components/Activities';
import Talks from './components/Talks';
import Projects from './components/Projects';
import Statistics from './components/Statistics';
import JoinCTA from './components/JoinCTA';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const handlePointerLeave = () => setVisible(false);
    const handlePointerEnter = () => setVisible(true);

    const handlePointerOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]'
      );
      setHovering(Boolean(interactive));
    };

    const handlePointerOut = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]'
      );

      if (interactive && !interactive.contains(event.target as Node | null)) {
        setHovering(false);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointerenter', handlePointerEnter);
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointerenter', handlePointerEnter);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`custom-cursor ${visible ? 'is-visible' : ''} ${hovering ? 'is-hovering' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <span className="custom-cursor__core" />
    </div>
  );
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen bg-[#071A52] dark">
        <CustomCursor />
        <Navbar />
        <Hero />
        <Mission />
        <TechDomains />
        <Activities />
        <Talks />
        <Projects />
        <Statistics />
        <JoinCTA />
        <Footer />
        <CookieConsent />
      </div>
    </I18nextProvider>
  );
}
