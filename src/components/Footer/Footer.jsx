import s from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <section></section>

      <nav className={s.nav}>
        <a href="#hero" className={s.links}>
          JEF.
        </a>

        <ul className={s.socialsMenu}>
          <li className={s.items}>
            <a href="#linkedin" className={s.links}>
              {/* <img src="" alt="" /> */}
              text
            </a>
          </li>
          <li className={s.items}>
            <a href="#github" className={s.links}>
              {/* <img src="" alt="" /> */}
              text
            </a>
          </li>
          <li className={s.items}>
            <a href="#gmail" className={s.links}>
              {/* <img src="" alt="" /> */}
              text
            </a>
          </li>
        </ul>
      </nav>

      <small className={s.copyright}>
        <p>© 2026 JEFF. All rights reserved.</p>
      </small>
    </footer>
  );
};

export default Footer;
