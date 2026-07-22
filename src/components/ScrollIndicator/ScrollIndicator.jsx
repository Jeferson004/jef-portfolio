import { useEffect, useRef, useState } from "react";
import s from "./ScrollIndicator.module.scss";

export default function ScrollIndicator({ targetSelector, count, active: activeProp }) {
  const [active, setActive] = useState(0);
  const elementsRef = useRef([]);
  const isControlled = activeProp !== undefined;

  useEffect(() => {
    if (isControlled || !targetSelector) return;

    const elements = [...document.querySelectorAll(targetSelector)];
    if (!elements.length) return;

    elementsRef.current = elements;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = elements.indexOf(entry.target);
            setActive(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [targetSelector, isControlled]);

  const currentActive = isControlled ? activeProp : active;

  return (
    <div className={s.indicator}>
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={`${s.dot} ${currentActive === index ? s.active : ""}`}
        />
      ))}
    </div>
  );
}