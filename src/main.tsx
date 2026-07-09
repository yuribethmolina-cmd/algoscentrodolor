import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { installImageLoadWatcher } from "./lib/imageWatcher";
import { installWAClickTracker } from "./lib/analytics";

installImageLoadWatcher();
installWAClickTracker();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
