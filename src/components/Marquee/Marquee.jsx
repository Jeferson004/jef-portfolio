// Styles sheet
import s from "./Marquee.module.scss";

// Assets

/**
 * Marquee component that displays a continuous scrolling text marquee.
 * Features repeating design-related keywords with star separators.
 */
const skills =
  "HTML\u00A0•\u00A0CSS\u00A0•\u00A0SCSS\u00A0•\u00A0JavaScript\u00A0•\u00A0ReactJS\u00A0•\u00A0GSAP\u00A0•\u00A0Framer\u00A0•\u00A0Motion\u00A0•\u00A0Git\u00A0•\u00A0GitHub\u00A0•\u00A0REST\u00A0API\u00A0•\u00A0Vite\u00A0•\u00A0WSL\u00A0•\u00A0Netlify\u00A0•\u00A0Render\u00A0•\u00A0Figma\u00A0•\u00A0";

function Marquee() {
  return (
    <div className={s.marquee}>
      <div className={s.marqueeContainer}>
        {Array.from({ length: 10 }).map((_, index) => (
          <h5 key={index} className={s.marqueeItems}>
            {skills}
          </h5>
        ))}
      </div>
    </div>
  );
}

export default Marquee;