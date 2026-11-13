
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  // Fonts are self-hosted (no request to Google servers, GDPR-friendly)
  import "@fontsource-variable/archivo/wdth.css";
  import "@fontsource/ibm-plex-sans/400.css";
  import "@fontsource/ibm-plex-sans/500.css";
  import "@fontsource/ibm-plex-sans/600.css";
  import "@fontsource/ibm-plex-sans/700.css";
  import "@fontsource/jetbrains-mono/400.css";
  import "@fontsource/jetbrains-mono/500.css";
  import "@fontsource/jetbrains-mono/600.css";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(<App />);
  