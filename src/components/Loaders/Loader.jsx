// Loader.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import s from "./Loader.module.scss";

const PHRASES = [
  "Hey, welcome.",
  "I'm Jef. I build things for the web.",
  "Let's get started.",
];

const Loader = () => {
  const loaderRef = useRef(null);
  const percentRef = useRef(null);
  const textRefs = useRef([]);
  const counter = useRef({ value: 0 });

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const ctx = gsap.context(() => {
      // STEP 1: Build the post-load timeline, but keep it paused.
      // Nothing in this timeline plays until tl.play() is called inside handleLoad().
      const tl = gsap.timeline({ paused: true });

      // STEP 2a (queued, runs later): fade out the "%" counter
      tl.to(percentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.out",
      });

      // STEP 2b (queued, runs later): each phrase fades in, holds, then fades out
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

      // STEP 2c (queued, runs last): whole loader slides down and off-screen
      tl.to(loader, {
        yPercent: 100,
        duration: 1.5,
        ease: "power4.inOut",
        onComplete: () => {
          loader.style.display = "none";
        },
      });

      // STEP 3: Starts immediately on mount — counts from 0 toward 0.
      // BUG: value should be 99, not 0 — as written this tween does nothing
      // because counter.current.value already starts at 0.
      gsap.to(counter.current, {
        value: 0,
        duration: 20,
        ease: "none",
        onUpdate: () => {
          percentRef.current.textContent = `${Math.round(
            counter.current.value,
          )}%`;
        },
      });

      // STEP 5: Fires once, whenever the browser's "load" event happens
      // (or immediately, in STEP 4, if load already fired before mount).
      const handleLoad = () => {
        // STEP 5a: cancel the STEP 3 tween so it stops fighting this one
        gsap.killTweensOf(counter.current);

        // STEP 5b: finish the count up to 100%
        gsap.to(counter.current, {
          value: 100,
          duration: 12,
          ease: "power2.out",
          onUpdate: () => {
            percentRef.current.textContent = `${Math.round(
              counter.current.value,
            )}%`;
          },
          // STEP 5c: once counter hits 100%, play the paused timeline
          // built in STEP 2 (percent fade -> phrases -> loader exit)
          onComplete: () => {
            tl.play();
          },
        });
      };

      // STEP 4: Decide when handleLoad() runs —
      // immediately if the page already finished loading before this
      // component mounted, otherwise wait for the real "load" event.
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad, { once: true });
      }

      // STEP 6: Cleanup if the component unmounts before load/animation finishes
      return () => {
        window.removeEventListener("load", handleLoad);
        gsap.killTweensOf(counter.current);
      };
    }, loaderRef);

    // STEP 7: Cleanup all GSAP tweens/timelines created in this context
    return () => ctx.revert();
  }, []);

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