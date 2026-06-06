import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import TechDomains from './components/TechDomains';
import Activities from './components/Activities';
import Projects from './components/Projects';
import Statistics from './components/Statistics';
import JoinCTA from './components/JoinCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen bg-[#071A52] dark">
        <Navbar />
        <Hero />
        <Mission />
        <TechDomains />
        <Activities />
        <Projects />
        <Statistics />
        <JoinCTA />
        <Footer />
      </div>
    </I18nextProvider>
  );
}