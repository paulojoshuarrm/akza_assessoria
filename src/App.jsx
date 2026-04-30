import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import LoadingScreen from "./components/LoadingScreen";
import { ContactModalProvider } from "./components/ContactModal";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projetos from "./pages/Projetos";

/**
 * ScrollToHash — when the URL hash changes (e.g. /#servicos), scrolls to the
 * matching element. Required because React Router doesn't do this by default.
 */
function ScrollToHash() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const id = hash.replace("#", "");
    const trigger = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    // Small delay so the target page has time to render
    const t = setTimeout(trigger, 120);
    return () => clearTimeout(t);
  }, [hash, pathname]);
  return null;
}

function AppShell() {
  useLenis();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [loaded]);

  return (
    <>
      <a href="#main" className="skip-link">Pular para o conteúdo</a>
      <Cursor />
      <ScrollProgress />
      <ScrollToHash />
      <div className={`page-shell ${loaded ? "is-loaded" : ""}`}>
        <Nav />
        <Routes>
          <Route path="/" element={<HomeRoute ready={loaded} />} />
          <Route path="/projetos" element={<Projetos />} />
        </Routes>
        <Footer />
      </div>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
    </>
  );
}

function HomeRoute({ ready }) {
  return (
    <main id="main" className="relative z-10">
      <Home ready={ready} />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ContactModalProvider>
        <AppShell />
      </ContactModalProvider>
    </BrowserRouter>
  );
}
