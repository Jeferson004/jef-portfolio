import s from "./Footer.module.scss";

// Images
import linkedinIcon from "../../assets/linkedin_icon.svg";
import githubIcon from "../../assets/github_icon.svg";
import gmailIcon from "../../assets/gmail_icon.svg";
import arrowup from "../../assets/arrowup_icon.svg";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.line_and_button}>
        <div className={s.line}></div>
        <a href="#hero">
          <div className={s.text_and_button}>
            <p>Back to top</p>
            <img src={arrowup} alt="" />
          </div>
        </a>
      </div>

      <nav className={s.nav}>
        <a href="#hero" className={`${s.links} ${s.logo}`}>
          JEF.
        </a>

        <ul className={s.socialsMenu}>
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
        </ul>
      </nav>

      <small className={s.copyright}>
        <p>© JEF. 2026</p>
      </small>
    </footer>
  );
};

export default Footer;
