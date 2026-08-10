import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import s from "./CustomCursor.module.scss";

const MOBILE_BREAKPOINT = "(max-width: 991px)";

const getIsTouchDevice = () => {
  if (typeof window === "undefined") return true; // SSR-safe default
  return window.matchMedia(MOBILE_BREAKPOINT).matches;
};

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(getIsTouchDevice);

  useLayoutEffect(() => {
    const mql = window.matchMedia(MOBILE_BREAKPOINT);

    const handleChange = (e) => setIsTouchDevice(e.matches);
    mql.addEventListener("change", handleChange);

    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useLayoutEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;

    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.15,
      ease: "power2.out",
    });

    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.15,
      ease: "power2.out",
    });

    let hasMoved = false;
    let lastX = 0;
    let lastY = 0;

    const updateHover = (x, y) => {
      const target = document.elementFromPoint(x, y)?.closest("a, button");
      cursor.classList.toggle(s.hover, !!target);
    };

    const moveCursor = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;

      if (!hasMoved) {
        gsap.set(cursor, { x: lastX, y: lastY });
        hasMoved = true;
      } else {
        xTo(lastX);
        yTo(lastY);
      }

      cursor.classList.add(s.visible);
      updateHover(lastX, lastY);
    };

    const handleScroll = () => {
      if (hasMoved) updateHover(lastX, lastY);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return <div ref={cursorRef} className={s.cursor} />;
};

export default CustomCursor;