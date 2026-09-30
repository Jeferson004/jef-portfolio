import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import s from "./Loader.module.scss";
import useScrollLock from "../../hooks/useScrollLock.js";

const PHRASES = [
  "Hey, welcome.",
  "I'm Jef. I build things for the web.",
  "Let's get started.",
];

const LOADER_KEY = "loader_shown";

// safe wrappers so storage errors never crash the component
const safeGet = (key) => {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (key, value) => {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // storage unavailable (private mode, disabled, sandboxed iframe) — ignore
  }
};

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const percentRef = useRef(null);
  const wordRefs = useRef([]); // wordRefs.current[phraseIndex] = [wordEl, wordEl, ...]
  const counter = useRef({ value: 0 });
  const loadingTween = useRef(null);
  const finishTween = useRef(null);
  const hasCompleted = useRef(false); // guard against calling onComplete twice

  const [shouldShow] = useState(() => {
    if (typeof window === "undefined") return true;
    return !safeGet(LOADER_KEY);
  });
  const [isLoading, setIsLoading] = useState(shouldShow);

  useScrollLock(isLoading);

  useEffect(() => {
    if (!shouldShow) {
      if (!hasCompleted.current) {
        hasCompleted.current = true;
        onComplete?.();
      }
      return;
    }

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

      wordRefs.current.forEach((words) => {
        if (!words || !words.length) return;

        // words rise up from bottom, fading in, staggered
        tl.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.05,
        });

        // words fade out while drifting up, staggered
        tl.to(
          words,
          {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power3.in",
            stagger: 0.03,
          },
          "+=0.6"
        );
      });

      tl.to(loader, {
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power4.inOut",
        onComplete: () => {
          document.removeEventListener("touchmove", preventTouch);

          gsap.set(loader, { pointerEvents: "none" });

          safeSet(LOADER_KEY, "true");
          setIsLoading(false);

          if (!hasCompleted.current) {
            hasCompleted.current = true;
            requestAnimationFrame(() => {
              onComplete?.();
            });
          }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShow]); // onComplete intentionally excluded — see note below

  if (!isLoading) return null;

  return (
    <div ref={loaderRef} className={s.loader}>
      <span ref={percentRef} className={s.percent}>
        0%
      </span>

      <div className={s.text_stage}>
        {PHRASES.map((text, i) => {
          const words = text.split(" ");

          return (
            <span key={i} className={s.text}>
              {words.map((word, j) => (
                <span
                  key={j}
                  ref={(el) => {
                    if (!wordRefs.current[i]) wordRefs.current[i] = [];
                    wordRefs.current[i][j] = el;
                  }}
                  className={s.word}
                >
                  {word}
                  {j < words.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Loader;