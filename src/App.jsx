import "./App.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Noise from "./components/Noise/Noise.jsx";

// import Loader from "./components/Loaders/Loader.jsx";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef();

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

  return (
    <>
      {/* <Loader /> */}

      <Noise>
        <ReactLenis
          root
          ref={lenisRef}
          options={{
            anchors: true,
            duration: 3,
            smoothWheel: true,
          }}
        />

        <Header />

        <main>
          <Home />
        </main>

        <Footer />
      </Noise>
    </>
  );
}

export default App;
