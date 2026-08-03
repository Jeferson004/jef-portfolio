// Styles
import s from "./Home.module.scss";

// Components
import Marquee from "../../components/Marquee/Marquee.jsx";
import ScrollIndicator from "../../components/ScrollIndicator/ScrollIndicator.jsx";

// Images
import linkedinIcon from "../../assets/linkedin_icon.svg";
import githubIcon from "../../assets/github_icon.svg";
import gmailIcon from "../../assets/gmail_icon.svg";
// import Avatar from "../../assets/avatar.png";
import Jvin from "../../assets/jvin.png";
import Banwa from "../../assets/banwa.png";
import SquidPay from "../../assets/squidpay.png";
// import mouse from "../../assets/mouse_icon.svg";

import mouseShape from "../../assets/mouse.svg";
import mouseScroller from "../../assets/mouse_scroller.svg";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const projects = [
    {
      img: Jvin,
      alt: "Jvin site",
      chip: "Client Project",
      title: "Product Designer Portfolio",
      desc: "Part-time freelance front-end development for a live client portfolio site",
      href: "#Jvin",
    },
    {
      img: Banwa,
      alt: "Banwa site",
      chip: "Backend Development",
      title: "BANWA: Backend & API Architecture",
      desc: "API development, hosting, and access control for a local government service platform",
      href: "#Banwa",
    },
    {
      img: SquidPay,
      alt: "SquidPay site",
      chip: "Personal Project",
      title: "Fintech Landing Page (Concept Build)",
      desc: "Self-initiated front-end project replicating a payments platform landing page",
      href: "#Squidpay",
    },
  ];

  const aboutRef = useRef(null);
  const beyondRef = useRef(null);
  const projectsRef = useRef(null);
  const cardContentRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutTextRef = useRef(null);
  const beyondTitleRef = useRef(null);
  const beyondTextRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const displayIndexRef = useRef(0);
  const processesLineRef = useRef(null);

  // ==================== HERO SECTION ====================
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils
        .toArray(`.${s.cols}`)
        .flatMap((col) => Array.from(col.children));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${s.processes}`,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        processesLineRef.current,
        { "--progress": 0 },
        { "--progress": 1, duration: 0.6, ease: "power2.out" },
      ).from(items, {
        clipPath: "inset(0 0 100% 0)",
        y: 40,
        stagger: 0.15,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  // ==================== PROJECTS SECTION ====================
  useEffect(() => {
    projects.forEach((project) => {
      const img = new Image();
      img.src = project.img;
    });
  });

  // Swaps the visible project content, with a fade-out -> swap -> fade-in.
  const changeDisplayedProject = (index) => {
    if (displayIndexRef.current === index) return;
    displayIndexRef.current = index;

    const image = cardContentRef.current.querySelector(
      `.${s.project_image} img`,
    );

    gsap.to(image, {
      opacity: 0,
      duration: 0.25,
      ease: "power1.in",
      onComplete: () => setDisplayIndex(index),
    });
  };

  // Fade the new content in every time displayIndex changes.
  useLayoutEffect(() => {
    if (!cardContentRef.current) return;

    const image = cardContentRef.current.querySelector(
      `.${s.project_image} img`,
    );
    const texts = cardContentRef.current.querySelectorAll(
      `.${s.chip_and_texts} > *`,
    );

    gsap.set(texts, {
      clipPath: "inset(0 0 100% 0)",
      y: 40,
    });

    const tl = gsap.timeline();

    tl.fromTo(
      image,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.35,
        ease: "power1.out",
      },
    ).to(
      texts,
      {
        clipPath: "inset(0 0 0% 0)",
        y: 0,
        stagger: 0.15,
        duration: 0.45,
        ease: "power2.out",
      },
      "-=0.15",
    );
  }, [displayIndex]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray(`.${s.project_scene}`);

      scenes.forEach((scene, i) => {
        ScrollTrigger.create({
          trigger: scene,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setActiveProject(i);
            changeDisplayedProject(i);
          },
          onEnterBack: () => {
            setActiveProject(i);
            changeDisplayedProject(i);
          },
        });
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  const current = projects[displayIndex];

  // ==================== ABOUT SECTION ====================
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([aboutTitleRef.current, aboutTextRef.current], {
        clipPath: "inset(0 0 100% 0)",
        y: 40,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  // ==================== BEYOND SECTION ====================
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([beyondTitleRef.current, beyondTextRef.current], {
        clipPath: "inset(0 0 100% 0)",
        y: 40,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: beyondRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
    }, beyondRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* <div className={s.circle_container}>
        <div className={s.background}>
          <div className={s.circle_1}>
            <div className={s.orbit}>
              <div className={s.dot}></div>
            </div>
          </div>

          <div className={s.circle_2}>
            <div className={s.orbit}>
              <div className={s.dot}></div>
            </div>
          </div>
        </div>
      </div> */}

      {/* ==================== Hero Section ==================== */}
      <section className={s.hero} id="hero">
        <div className={s.container}>
          <div className={s.header_and_parag}>
            <a
              href="#"
              className={`${s.activeStatus} ${s.activeStatus_mobile}`}
            >
              <span className={s.activeIcon}></span>
              Open to Work
            </a>

            <h1>Curious enough to learn. Driven enough to build.</h1>
            <h6>
              Front-end developer fueled by coffee and a stubborn desire to make
              things actually work.
            </h6>
          </div>

          <div className={s.scroll_down_and_active_status}>
            <div className={s.socials_menu}>
              <a href="#linkedin" className={s.links}>
                <img src={linkedinIcon} alt="LinkedIn" loading="lazy" />
              </a>
              <a href="https://github.com/Jeferson004" className={s.links}>
                <img src={githubIcon} alt="GitHub" loading="lazy" />
              </a>
              <a href="#gmail" className={s.links}>
                <img src={gmailIcon} alt="Gmail" loading="lazy" />
              </a>
            </div>

            {/* <div className={s.scroll_icon_and_text}>
              <div className={s.scroll_icon}>
                <img src={mouse} alt="" loading="lazy" />
              </div>
              <p>SCROLL DOWN</p>
            </div> */}

            {/* <div className={s.scroll_icon_and_text_1}>
              <div className={s.scroll_icon_1}>
                <div className={s.scroll_icon_line_1}></div>
              </div>
              <p>SCROLL DOWN</p>
            </div> */}

            <div className={s.scroll_icon_and_text_1}>
              <div className={s.scroll_icon_1}>
                <img src={mouseShape} alt="" loading="lazy" />
                <img src={mouseScroller} alt="" loading="lazy" />
              </div>
              <p>SCROLL DOWN</p>
            </div>

            <a
              href="#"
              className={`${s.activeStatus} ${s.activeStatus_desktop}`}
            >
              <span className={s.activeIcon}></span>
              Open to Work
            </a>
          </div>

          {/* <div className={s.outline_text_and_profile}>
            <svg className={s.outline_text} ref={outlineSvgRef}>
              <text ref={outlineTextRef} x="0" y="0.8em">
                LET'S BUILD
              </text>
            </svg>
            <div className={s.circle_wrapper}>
              <div className={s.circle_text}>
                <svg viewBox="0 0 200 200">
                  <defs>
                    <path
                      id="circlePath"
                      d="
                        M 100,100
                        m -80.68,0
                        a 80.68,80.68 0 1,1 161.36,0
                        a 80.68,80.68 0 1,1 -161.36,0
                      "
                    />
                  </defs>

                  <text>
                    <textPath href="#circlePath" startOffset="50%">
                      FRONTEND DEVELOPER • SHOOT ME A MESSAGE •
                    </textPath>
                  </text>
                </svg>
              </div>

              <img className={s.circle_avatar} src={Avatar} alt="" />
            </div>
          </div> */}

          <div className={s.processes}>
            <div className={s.row}>
              <div className={s.processes_line} ref={processesLineRef}></div>
              <div className={s.cols}>
                <p>01 Understand</p>
                <p>
                  I start by figuring out what the project's actually trying to
                  solve.
                </p>
              </div>
              <div className={s.cols}>
                <p>02 Design to code</p>
                <p>
                  Then I translate the visuals into responsive, working
                  front-end.
                </p>
              </div>
              <div className={s.cols}>
                <p>03 Build & test</p>
                <p>I write the code, then break it,so I can fix it properly.</p>
              </div>
              <div className={s.cols}>
                <p>04 Ship</p>
                <p>
                  Once it's solid, it goes live, and I keep an eye on it early
                  on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Projects Section ==================== */}
      <section className={s.projects} id="projects" ref={projectsRef}>
        <div className={s.outer_row}>
          <div className={s.indicator_wrapper}>
            <ScrollIndicator count={projects.length} active={activeProject} />
          </div>

          <div
            className={s.inner_row}
            style={{ height: `${projects.length * 100}vh` }}
          >
            <div className={s.scroll_track}>
              {projects.map((p) => (
                <div className={s.project_scene} key={p.title} />
              ))}
            </div>

            <div className={s.sticky_card}>
              <a
                href={current.href}
                className={`${s.cols} ${s.project_card}`}
                ref={cardContentRef}
              >
                <div className={s.project_card_container}>
                  <div className={s.project_image}>
                    <img src={current.img} alt={current.alt} loading="lazy" />
                  </div>
                  <div className={s.chip_and_texts}>
                    <div className={s.chips}>{current.chip}</div>
                    <h6>{current.title}</h6>
                    <p>{current.desc}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Marquee Section ==================== */}
      <Marquee />

      {/* ==================== About me Section ==================== */}
      <section className={s.about} id="about">
        <div className={s.header_and_parag} ref={aboutRef}>
          <h1 ref={aboutTitleRef}>About</h1>

          <h6 ref={aboutTextRef}>
            The first time I saw code, I was hooked by curiosity. How did a
            button change color on click? How did a page transition to another
            with just a few lines? I had to know, so I started recreating those
            little interactions myself.
            <br />
            <br />
            The moment my first line of code actually worked, something clicked.
            That small win turned into a genuine passion, and it's been the same
            ever since: building, breaking things, learning, and getting a
            little better with every project.
          </h6>
        </div>
      </section>

      {/* ==================== Beyond the code Section ==================== */}
      <section className={s.beyond} id="beyond">
        <div className={s.textCard} ref={beyondRef}>
          <h1 ref={beyondTitleRef}>Beyond the code</h1>
          <p ref={beyondTextRef}>
            Photography is where I slow down and look at things differently.
          </p>
        </div>

        <div className={s.grouped_cards}>
          <div className={`${s.card} ${s.card3}`} aria-hidden="true" />
          <div className={`${s.card} ${s.card6}`} aria-hidden="true" />
          <div className={`${s.card} ${s.card2}`} aria-hidden="true" />
          <div className={`${s.card} ${s.card5}`} aria-hidden="true" />
          <div className={`${s.card} ${s.card4}`} aria-hidden="true" />
          <div className={`${s.card} ${s.card1}`} aria-hidden="true" />
        </div>
      </section>
    </>
  );
};

export default Home;
