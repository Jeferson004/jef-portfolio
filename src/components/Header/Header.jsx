import { useEffect, useRef, useState } from "react";
import s from "./Header.module.scss";

// images
import Humburger from "../../assets/humburger.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 992) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setIsTop(currentScroll === 0);

      // Ignore tiny scroll jitters
      if (Math.abs(currentScroll - lastScroll.current) < 5) return;

      if (currentScroll > lastScroll.current && currentScroll > 100) {
        // scrolling down
        setHidden(true);
      } else {
        // scrolling up
        setHidden(false);
      }

      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setMenuOpen(false);
        document.body.style.overflow = "";
      } else {
        document.body.style.overflow = menuOpen ? "hidden" : "";
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`
        ${s.header}
        ${isTop ? s.top : ""}
        ${hidden ? s.hidden : ""}
      `}
    >
      <nav className={s.nav}>
        <a href="#hero" className={s.logo}>
          JEF.
        </a>

        <div className={s.menu_icon} onClick={toggleMenu}>
          <img src={Humburger} alt="Menu" />
        </div>

        <div className={`${s.menu_container} ${menuOpen ? s.open : ""}`}>
          <ul className={s.menu}>
            <li>
              <a href="#projects" onClick={handleLinkClick}>
                Projects
              </a>
            </li>

            <li>
              <a href="#about" onClick={handleLinkClick}>
                About
              </a>
            </li>

            <li>
              <a href="#beyond" onClick={handleLinkClick}>
                Beyond the code
              </a>
            </li>
          </ul>

          <ul>
            <li>
              <a href="#" className={s.activeStatus}>
                <span className={s.activeIcon}></span>
                Open to Work
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;