// Loader.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import s from "./Loader.module.scss";

const PHRASES = [
  "Hey, welcome.",
  "I'm Jef. I build things for the web.",
  "Let's get started.",
];

const lockScroll = () => {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
};

const unlockScroll = () => {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.touchAction = "";
};

const Loader = ({ lenisRef }) => {
  const loaderRef = useRef(null);
  const percentRef = useRef(null);
  const textRefs = useRef([]);
  const counter = useRef({ value: 0 });

  useEffect(() => {
    lockScroll();
    lenisRef?.current?.lenis?.stop();

    const loader = loaderRef.current;
    if (!loader) return;

    const preventTouch = (e) => e.preventDefault();
    document.addEventListener("touchmove", preventTouch, { passive: false });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      tl.to(percentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.out",
      });

      textRefs.current.forEach((el) => {
        if (!el) return;

        tl.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });

        tl.to(el, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power3.in",
          delay: 0.6,
        });
      });

      tl.to(loader, {
        yPercent: 100,
        duration: 1.5,
        ease: "power4.inOut",
        onComplete: () => {
          loader.style.display = "none";
          document.removeEventListener("touchmove", preventTouch);
          unlockScroll();
          lenisRef?.current?.lenis?.start();
        },
      });

      gsap.to(counter.current, {
        value: 99,
        duration: 20,
        ease: "none",
        onUpdate: () => {
          percentRef.current.textContent = `${Math.round(
            counter.current.value,
          )}%`;
        },
      });

      const handleLoad = () => {
        gsap.killTweensOf(counter.current);

        gsap.to(counter.current, {
          value: 100,
          duration: 12,
          ease: "power2.out",
          onUpdate: () => {
            percentRef.current.textContent = `${Math.round(
              counter.current.value,
            )}%`;
          },
          onComplete: () => {
            tl.play();
          },
        });
      };

      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad, { once: true });
      }

      return () => {
        window.removeEventListener("load", handleLoad);
        gsap.killTweensOf(counter.current);
      };
    }, loaderRef);

    return () => {
      ctx.revert();
      document.removeEventListener("touchmove", preventTouch);
      unlockScroll();
      lenisRef?.current?.lenis?.start();
    };
  }, [lenisRef]);

  return (
    <div ref={loaderRef} className={s.loader}>
      <span ref={percentRef} className={s.percent}>
        0%
      </span>

      <div className={s.textStage}>
        {PHRASES.map((text, i) => (
          <span
            key={i}
            ref={(el) => (textRefs.current[i] = el)}
            className={s.text}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loader;