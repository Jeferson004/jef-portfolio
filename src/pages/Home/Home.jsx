// Styles
import s from "./Home.module.scss";

// Components
import Marquee from "../../components/Marquee/Marquee.jsx";
import ScrollIndicator from "../../components/ScrollIndicator/ScrollIndicator.jsx";

// Images
import linkedinIcon from "../../assets/linkedin_icon.svg";
import githubIcon from "../../assets/github_icon.svg";
import gmailIcon from "../../assets/gmail_icon.svg";
import Avatar from "../../assets/avatar.png";
import Jvin from "../../assets/jvin_site.png";
import Banwa from "../../assets/banwa.png";
import SquidPay from "../../assets/squid.png";

import { useLayoutEffect, useRef, useState } from "react";
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
    },
    {
      img: Banwa,
      alt: "Banwa site",
      chip: "Backend Development",
      title: "BANWA: Backend & API Architecture",
      desc: "API development, hosting, and access control for a local government service platform",
    },
    {
      img: SquidPay,
      alt: "SquidPay site",
      chip: "Personal Project",
      title: "Fintech Landing Page (Concept Build)",
      desc: "Self-initiated front-end project replicating a payments platform landing page",
    },
  ];
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const speeds = [-24, -24, -24, -24, -24, -24];
      gsap.utils.toArray(`.${s.card}`).forEach((card, i) => {
        gsap.to(card, {
          y: speeds[i],
          ease: "none",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: true,
        },
      });
    }, aboutRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray(`.${s.project_scene}`);
      const cards = gsap.utils.toArray(`.${s.project_card}`);

      scenes.forEach((scene, i) => {
        // drives the scroll indicator directly, no IntersectionObserver
        ScrollTrigger.create({
          trigger: scene,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveProject(i);
          },
        });

        // pin every card except the last, so the next one scrolls over it
        if (i < scenes.length - 1) {
          ScrollTrigger.create({
            trigger: scene,
            start: "top top",
            end: "bottom top",
            pin: cards[i],
            pinSpacing: false,
          });
        }
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className={s.circle_container}>
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
      </div>

      {/* Hero Section */}
      <section className={s.hero} id="hero">
        <div className={s.container}>
          <div className={s.header_and_parag}>
            <h1>Curious enough to learn. Driven enough to build.</h1>
            <h6>
              Front-end developer fueled by coffee and a stubborn desire to make
              things actually work.
            </h6>
          </div>

          <div className={s.scroll_icon}>
            <div className={s.scroll_icon_line}></div>
          </div>

          <div className={s.socials_menu}>
            <a href="#linkedin" className={s.links}>
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a href="#github" className={s.links}>
              <img src={githubIcon} alt="GitHub" />
            </a>
            <a href="#gmail" className={s.links}>
              <img src={gmailIcon} alt="Gmail" />
            </a>
          </div>

          <div className={s.outline_text_and_profile}>
            <h1 className={s.outline_text}>LET'S BUILD</h1>
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
          </div>

          <div className={s.processes}>
            <div className={s.row}>
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

      {/* Projects Section */}
      <section className={s.projects} id="projects" ref={projectsRef}>
        <div className={s.outer_row}>
          <div className={s.indicator_wrapper}>
            <ScrollIndicator count={projects.length} active={activeProject} />
          </div>

          <div className={s.inner_row}>
            {projects.map((p, i) => (
              <div className={s.project_scene} key={p.title}>
                <a
                  href="#"
                  className={`${s.cols} ${s.project_card}`}
                  style={{ zIndex: i + 1 }}
                >
                  <img src={p.img} alt={p.alt} />
                  <div className={s.chip_and_texts}>
                    <div className={s.chips}>{p.chip}</div>
                    <h6>{p.title}</h6>
                    <p>{p.desc}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <Marquee />

      {/* About me Section */}
      <section className={s.about} id="about">
        <div className={s.header_and_parag}>
          <h1>About</h1>
          <h6>
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

      {/* Beyond the code Section */}
      <section className={s.beyond} ref={aboutRef} id="beyond">
        <div className={s.textCard} ref={titleRef}>
          <h1>Beyond the code</h1>
          <p>
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

      {/* The End Section */}
      <section className={s.the_end} id="beyond">
        <h1>THE END</h1>
      </section>
    </>
  );
};

export default Home;
