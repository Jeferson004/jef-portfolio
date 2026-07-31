import s from "./Footer.module.scss";

// Images
// import linkedinIcon from "../../assets/linkedin_icon.svg";
// import githubIcon from "../../assets/github_icon.svg";
// import gmailIcon from "../../assets/gmail_icon.svg";
import arrowup from "../../assets/arrowup_icon_1.svg";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const outlineSvgRef = useRef(null);
  const outlineTextRef = useRef(null);

  // runs once, draws the stroke outline then fills it black
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
  }, []);

  return (
    <footer className={s.footer}>
      <nav className={s.nav}>
        {/* <a href="#hero" className={`${s.links} ${s.logo}`}>
          JEF.
          </a> */}

        {/* <h1>LET'S BUILD</h1> */}

        <div className={s.outline_text_and_profile}>
          <svg className={s.outline_text} ref={outlineSvgRef}>
            <text ref={outlineTextRef} x="0" y="0.8em">
              LET'S BUILD
            </text>
          </svg>
        </div>

        <div className={s.line_and_button}>
          <div className={s.line}></div>
          <a href="#hero">
            <div className={s.text_and_button}>
              {/* <p>Back to top</p> */}
              <img src={arrowup} alt="" />
            </div>
          </a>
        </div>

        {/* <ul className={s.socialsMenu}>
          <li className={s.items}>
            <a href="#linkedin" className={s.links}>
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </li>
          <li className={s.items}>
            <a href="#github" className={s.links}>
              <img src={githubIcon} alt="GitHub" />
            </a>
          </li>
          <li className={s.items}>
            <a href="#gmail" className={s.links}>
              <img src={gmailIcon} alt="Gmail" />
            </a>
          </li>
        </ul> */}
      </nav>

      <small className={s.copyright}>
        <p>© JEF. 2026</p>
      </small>
    </footer>
  );
};

export default Footer;