import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { Analytics } from "@vercel/analytics/react";

// Styles
import "./App.css";

// Components
import Header from "./components/Header";
import Home from "./pages/Home/";
import Footer from "./components/Footer/";
import Noise from "./components/Noise/";
import Loader from "./components/Loaders/";
import CustomCursor from "./components/CustomCursor/";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;

    if (!lenis) return;

    function update(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, []);

  // Stop Lenis while the loader is mounted, resume once it's done
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const lenis = lenisRef.current?.lenis;

      if (!lenis) return;

      if (isLoading) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    return () => cancelAnimationFrame(id);
  }, [isLoading]);

  return (
    <>
      <CustomCursor />
      <Noise grainSize={2}>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

        <ReactLenis
          root
          ref={lenisRef}
          options={{
            anchors: true,
            duration: 2,
          }}
        >
          <Header />

          <main>
            <Home />
          </main>

          <Footer />
        </ReactLenis>
      </Noise>

      <Analytics />
    </>
  );
}

export default App;
