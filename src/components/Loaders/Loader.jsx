import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import s from "./Loader.module.scss";
import useScrollLock from "../../hooks/useScrollLock.js";

const PHRASES = [
  "Hey, welcome.",
  "I'm Jef. I build things for the web.",
  "Let's get started.",
];

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const percentRef = useRef(null);
  const textRefs = useRef([]);
  const counter = useRef({ value: 0 });
  const loadingTween = useRef(null);
  const finishTween = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useScrollLock(isLoading);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const preventTouch = (e) => e.preventDefault();
    document.addEventListener("touchmove", preventTouch, {
      passive: false,
    });

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
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power4.inOut",
        onComplete: () => {
          document.removeEventListener("touchmove", preventTouch);

          // prevent the invisible loader from blocking clicks
          // during the gap before React unmounts it
          gsap.set(loader, { pointerEvents: "none" });

          setIsLoading(false);

          requestAnimationFrame(() => {
            onComplete?.();
          });
        },
      });

      loadingTween.current = gsap.to(counter.current, {
        value: 99,
        duration: 8,
        ease: "none",
        onUpdate: () => {
          const percent = percentRef.current;
          if (!percent) return;

          percent.textContent = `${Math.round(counter.current.value)}%`;
        },
      });

      const handleLoad = () => {
        loadingTween.current?.kill();

        finishTween.current = gsap.to(counter.current, {
          value: 100,
          duration: 4,
          ease: "power2.out",
          onUpdate: () => {
            const percent = percentRef.current;
            if (!percent) return;

            percent.textContent = `${Math.round(counter.current.value)}%`;
          },
          onComplete: () => {
            tl.play();
          },
        });
      };

      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad, {
          once: true,
        });
      }

      return () => {
        window.removeEventListener("load", handleLoad);

        loadingTween.current?.kill();
        finishTween.current?.kill();

        tl.kill();

        gsap.killTweensOf(counter.current);
      };
    }, loaderRef);

    return () => {
      ctx.revert();

      document.removeEventListener("touchmove", preventTouch);
    };
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div ref={loaderRef} className={s.loader}>
      <span ref={percentRef} className={s.percent}>
        0%
      </span>

      <div className={s.text_stage}>
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