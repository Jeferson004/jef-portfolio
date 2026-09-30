// Styles sheet
import s from "./Marquee.module.scss";

// Assets

/**
 * Marquee component that displays a continuous scrolling text marquee.
 * Features repeating design-related keywords with star separators.
 */
const skills =
  "HTML5\u00A0•\u00A0CSS3\u00A0•\u00A0SCSS\u00A0•\u00A0JavaScript\u00A0•\u00A0React\u00A0•\u00A0GSAP\u00A0•\u00A0Framer\u00A0Motion\u00A0•\u00A0Netlify\u00A0•\u00A0Vercel\u00A0•\u00A0Render\u00A0•\u00A0Git\u00A0•\u00A0Figma\u00A0•\u00A0";

function Marquee() {
  return (
    <section className={s.marquee}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.row}>
            {Array.from({ length: 10 }).map((_, index) => (
              <h5 key={index} className={s.marquee_items}>
                {skills}
              </h5>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Marquee;
