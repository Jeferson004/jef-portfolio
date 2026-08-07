import s from "./Footer.module.scss";

import arrowup from "../../assets/arrowup_icon_1.svg";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const outlineSvgRef = useRef(null);
  const outlineTextRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // ========== Text outline compatability for mobile ========== 
  useLayoutEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // ========== Text outline animation ========== 
  useLayoutEffect(() => {
    const svg = outlineSvgRef.current;
    const text = outlineTextRef.current;
    if (!svg || !text) return;

    let hasAnimated = false;

    const updateViewBox = () => {
      const bbox = text.getBBox();
      const pad = 4;
      svg.setAttribute(
        "viewBox",
        `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + pad * 2} ${bbox.height + pad * 2}`,
      );

      const length = text.getComputedTextLength() * 1.6;
      gsap.set(text, {
        strokeDasharray: length,
        strokeDashoffset: hasAnimated ? 0 : length,
        fillOpacity: hasAnimated ? 1 : 0,
      });
    };

    updateViewBox();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: svg,
        start: "top 100%",
        end: "bottom 108%",
        once: true,
        onEnter: () => {
          hasAnimated = true;
          const tl = gsap.timeline();
          tl.to(text, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
          }).to(text, {
            fillOpacity: 1,
            duration: 1,
            ease: "power2.inOut",
          });
        },
      });
    });

    const resizeObserver = new ResizeObserver(() => updateViewBox());
    resizeObserver.observe(svg.parentElement);

    return () => {
      ctx.revert();
      resizeObserver.disconnect();
    };
  }, [isMobile]);

  return (
    <footer className={s.footer}>
      <nav className={s.nav}>
        <div className={s.outline_text_and_profile}>
          <svg className={s.outline_text} ref={outlineSvgRef}>
            <text ref={outlineTextRef} textAnchor="start" x="0" y="0.8em">
              {isMobile ? (
                <>
                  <tspan x="0" dy="0">
                    LET'S
                  </tspan>
                  <tspan x="0" dy="1em">
                    BUILD
                  </tspan>
                </>
              ) : (
                "LET'S BUILD"
              )}
            </text>
          </svg>
        </div>

        <div className={s.line_and_button}>
          <div className={s.line}></div>
          <a href="#hero">
            <div className={s.text_and_button}>
              <img src={arrowup} alt="" />
            </div>
          </a>
        </div>
      </nav>

      <small className={s.copyright}>
        <p>© JEF. 2026</p>
      </small>
    </footer>
  );
};

export default Footer;
