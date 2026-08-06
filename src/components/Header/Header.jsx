import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

// style
import s from "./Header.module.scss";

// images
import OpenMenu from "../../assets/open_menu.svg";
import CloseMenu from "../../assets/close_menu.svg";
import Logo from "../../assets/favicon.svg";

const getDeviceType = () => {
  if (typeof navigator === "undefined") {
    return { isAndroid: false, isIOS: false, isMobile: false };
  }
  const ua = navigator.userAgent;
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad/i.test(ua);
  const isMobile = /Android|webOS|iPhone|iPad|BlackBerry|Opera Mini/i.test(ua);
  return { isAndroid, isIOS, isMobile };
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    if (menuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [menuOpen, lenis]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (Math.abs(currentScroll - lastScroll.current) < 5) return;
      if (currentScroll > lastScroll.current && currentScroll > 100) {
        setHidden(true);
      } else {
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
      if (window.innerWidth >= 992 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 992) {
      setMenuOpen(false);
    }
  };

  const email = "jefersonmuring680@gmail.com";
  const subject = "Inquiry: Let's Discuss Collaboration";
  const body = "";
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const [device] = useState(getDeviceType);
  const { isAndroid, isIOS, isMobile } = device;
  let mobileGmailHref = gmailHref;

  if (isAndroid) {
    mobileGmailHref = `intent://send?to=${email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}#Intent;scheme=mailto;package=com.google.android.gm;end;`;
  } else if (isIOS || isMobile) {
    mobileGmailHref = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const finalGmailHref = isMobile ? mobileGmailHref : gmailHref;

  return (
    <header
      className={`
    ${s.header}
    ${hidden ? s.hidden : ""}
    ${menuOpen ? s.menu_open : ""}
  `}
    >
      <nav className={s.nav}>
        <a href="#hero" className={s.logo}>
          <img src={Logo} alt="" />
        </a>

        <div className={s.menu_icon} onClick={toggleMenu}>
          <img
            src={menuOpen ? CloseMenu : OpenMenu}
            alt={menuOpen ? "Close menu" : "Open menu"}
          />
        </div>

        <div
          className={`${s.menu_container} ${menuOpen ? s.open : ""} lenis-stop`}
        >
          <ul className={s.menu}>
            <li>
              <a href="#projects" onClick={handleLinkClick}>
                PROJECTS
              </a>
            </li>
            <li>
              <a href="#about" onClick={handleLinkClick}>
                ABOUT
              </a>
            </li>
          </ul>

          <ul className={s.menu}>
            <li>
              <a href="#beyond" onClick={handleLinkClick}>
                BEYOND THE CODE
              </a>
            </li>
            <li>
              <a
                href={finalGmailHref}
                target={isMobile ? undefined : "_blank"}
                rel={isMobile ? undefined : "noopener noreferrer"}
                onClick={handleLinkClick}
              >
                REACH OUT
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
