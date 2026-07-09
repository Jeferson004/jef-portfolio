import s from "./Header.module.scss";

const Header = () => {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <ul className={s.menu}>
          <li className={s.items}>
            <a href="#hero" className={s.links}>
              JEF.
            </a>
          </li>

          <ul className={s.submenu}>
            <li className={s.items}>
              <a href="#projects" className={s.links}>
                <img src="" alt="" />
                Projects
              </a>
            </li>
            <li className={s.items}>
              <a href="#about" className={s.links}>
                <img src="" alt="" />
                About
              </a>
            </li>
            <li className={s.items}>
              <a href="#beyond" className={s.links}>
                <img src="" alt="" />
                Beyond the code
              </a>
            </li>
          </ul>

          <li className={s.items}>
            <a href="#" className={s.links}>
              <div className={s.activeIcon}></div>Open to Work
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
