// Styles
import s from './Home.module.scss';

// Components
import Marquee from '../../components/Marquee/';
import ScrollIndicator from '../../components/ScrollIndicator/';

// Images
import linkedinIcon from '../../assets/linkedin_icon.svg';
import githubIcon from '../../assets/github_icon.svg';
import Jvin from '../../assets/jvin.png';
import Banwa from '../../assets/banwa.png';
import SquidPay from '../../assets/squidpay.png';
import mouseShape from '../../assets/mouse.svg';
import mouseScroller from '../../assets/mouse_scroller.svg';

import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    img: Jvin,
    alt: 'Jvin site',
    chip: 'Client Project',
    title: 'Product Designer Portfolio',
    desc: 'Part-time freelance front-end development for a live client portfolio site',
    href: 'https://p2025-jvin.vercel.app/',
    target: '_blank',
  },
  {
    img: Banwa,
    alt: 'Banwa site',
    chip: 'Backend Development',
    title: 'BANWA: Backend & API Architecture',
    desc: 'API development, hosting, and access control for a local government service platform',
    href: 'https://banwa-evw1.onrender.com/',
    target: '_blank',
  },
  {
    img: SquidPay,
    alt: 'SquidPay site',
    chip: 'Personal Project',
    title: 'Fintech Landing Page (Concept Build)',
    desc: 'Self-initiated front-end project replicating a payments platform landing page',
    href: 'https://01p2024.netlify.app/',
    target: '_blank',
  },
];

const PROCESSES = [
  {
    title: '01 Understand',
    desc: "I start by figuring out what the project's actually trying to solve.",
  },
  {
    title: '02 Design to code',
    desc: 'Then I translate the visuals into responsive, working front-end.',
  },
  {
    title: '03 Build & test',
    desc: 'I write the code, then break it, so I can fix it properly.',
  },
  {
    title: '04 Ship',
    desc: "Once it's solid, it goes live, and I keep an eye on it early on.",
  },
];

const ABOUT_PARAGRAPH_1 =
  'The first time I saw code, I was hooked by curiosity. How did a button change color on click? How did a page transition to another with just a few lines? I had to know, so I started recreating those little interactions myself.';

const ABOUT_PARAGRAPH_2 =
  "The moment my first line of code actually worked, something clicked. That small win turned into a genuine passion, and it's been the same ever since: building, breaking things, learning, and getting a little better with every project.";

const BEYOND_TEXT = 'Photography is where I slow down and look at things differently.';

// Splits a string into word spans and stores each word element into a
// ref array at a stable index, so refs stay aligned across re-renders.
// Used for static, scroll-triggered sections (processes / about / beyond)
// where refs can be collected once and read directly by GSAP.
const renderWords = (text, refsArray, counter, className) =>
  text.split(' ').map((word, i, arr) => {
    const idx = counter.i++;
    return (
      <span key={idx} ref={(el) => (refsArray.current[idx] = el)} className={className}>
        {word}
        {i < arr.length - 1 ? '\u00A0' : ''}
      </span>
    );
  });

// Splits a string into word spans without refs. Used for the project card
// content, which swaps text on every scroll step — those words are picked
// up by a DOM query at animation time instead of persisted refs.
const wordsSpan = (text, className) =>
  text.split(' ').map((word, i, arr) => (
    <span key={i} className={className}>
      {word}
      {i < arr.length - 1 ? '\u00A0' : ''}
    </span>
  ));

const Home = () => {
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

  // word-level ref buckets for scroll-triggered sections
  const processesWordsRef = useRef([]);
  const aboutWordsRef = useRef([]);
  const beyondWordsRef = useRef([]);

  // ==================== FOR HERO SECTION ANIMATION ====================
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${s.processes}`,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        processesLineRef.current,
        { '--progress': 0 },
        { '--progress': 1, duration: 0.4, ease: 'power2.out' },
      ).from(processesWordsRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        y: 40,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  // ==================== FOR PROJECTS SECTION ANIMATION ====================
  useEffect(() => {
    projects.forEach((project) => {
      const img = new Image();
      img.src = project.img;
    });
  }, []);

  // Swaps the visible project content, with a fade-out -> swap -> fade-in.
  const changeDisplayedProject = (index) => {
    if (displayIndexRef.current === index) return;
    displayIndexRef.current = index;

    const image = cardContentRef.current.querySelector(`.${s.project_image} img`);

    if (!image) return;

    gsap.killTweensOf(image);

    gsap.to(image, {
      opacity: 0,
      duration: 0.25,
      ease: 'power1.in',
      onComplete: () => setDisplayIndex(index),
    });
  };

  // Fade the new content in every time displayIndex changes, word by word.
  useLayoutEffect(() => {
    if (!cardContentRef.current) return;

    const image = cardContentRef.current.querySelector(`.${s.project_image} img`);
    const chip = cardContentRef.current.querySelector(`.${s.chips}`);
    const words = cardContentRef.current.querySelectorAll(
      `.${s.chip_and_texts} h3 .${s.word}, .${s.chip_and_texts} p .${s.word}`,
    );

    // chip is animated as a single element, followed by the title/desc words
    const targets = [chip, ...words];

    gsap.set(targets, {
      clipPath: 'inset(0 0 100% 0)',
      y: 40,
    });

    const tl = gsap.timeline();

    tl.fromTo(image, { opacity: 0 }, { opacity: 1, duration: 0.32, ease: 'power1.out' }).to(
      targets,
      {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power2.out',
      },
      '-=0.15',
    );

    return () => tl.kill();
  }, [displayIndex]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const scenes = gsap.utils.toArray(`.${s.project_scene}`);

        scenes.forEach((scene, i) => {
          ScrollTrigger.create({
            trigger: scene,
            start: 'top center',
            end: 'bottom center',
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
    });

    return () => mm.revert();
  }, []);

  const current = projects[displayIndex];

  // ==================== FOR ABOUT SECTION ANIMATION ====================
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(aboutWordsRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        y: 40,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  // ==================== BEYOND SECTION ====================
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(beyondWordsRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        y: 40,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: beyondRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });
    }, beyondRef);

    return () => ctx.revert();
  }, []);

  // Fresh counters per render — word order is static per section, so index
  // assignment stays aligned with the ref arrays across re-renders.
  const processesCounter = { i: 0 };
  const aboutCounter = { i: 0 };
  const beyondCounter = { i: 0 };

  return (
    <>
      {/* ==================== Hero Section ==================== */}
      <section className={s.hero} id="hero">
        <div className={s.container}>
          <div className={s.header_and_parag}>
            <a href="#" className={`${s.activeStatus} ${s.activeStatus_mobile}`}>
              <span className={s.activeIcon}></span>
              Open to Work
            </a>

            <h1>Curious enough to learn. Driven enough to build.</h1>
            <h6>
              Front-end developer fueled by coffee and a stubborn desire to make things actually work.
            </h6>
          </div>

          <div className={s.scroll_down_and_active_status}>
            <div className={s.socials_menu}>
              <a
                href="https://linkedin.com/in/jeferson-muring-9242aa420"
                className={s.links}
                target="_blank"
                rel="noopener noreferrer">
                <img src={linkedinIcon} alt="LinkedIn" loading="lazy" />
              </a>
              <a
                href="https://github.com/Jeferson004"
                className={s.links}
                target="_blank"
                rel="noopener noreferrer">
                <img src={githubIcon} alt="GitHub" loading="lazy" />
              </a>
            </div>

            <div className={s.scroll_icon_and_text_1}>
              <div className={s.scroll_icon_1}>
                <img src={mouseShape} alt="" loading="lazy" />
                <img src={mouseScroller} alt="" loading="lazy" />
              </div>
              <p>SCROLL DOWN</p>
            </div>

            <a href="#" className={`${s.activeStatus} ${s.activeStatus_desktop}`}>
              <span className={s.activeIcon}></span>
              Open to Work
            </a>
          </div>

          <div className={s.processes}>
            <div className={s.row}>
              <div className={s.processes_line} ref={processesLineRef}></div>

              {PROCESSES.map((step) => (
                <div className={s.cols} key={step.title}>
                  <p>{renderWords(step.title, processesWordsRef, processesCounter, s.word)}</p>
                  <p>{renderWords(step.desc, processesWordsRef, processesCounter, s.word)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Projects Section ==================== */}
      <section className={s.projects} id="projects" ref={projectsRef}>
        <h2 className={s.hideit}>Projects</h2>
        <div className={s.outer_row}>
          <div className={s.indicator_wrapper}>
            <ScrollIndicator count={projects.length} active={activeProject} />
          </div>

          <div className={s.inner_row} style={{ height: `${projects.length * 100}vh` }}>
            <div className={s.scroll_track}>
              {projects.map((p) => (
                <div className={s.project_scene} key={p.title} />
              ))}
            </div>

            <article className={s.sticky_card}>
              <a
                href={current.href}
                className={`${s.cols} ${s.project_card}`}
                ref={cardContentRef}
                target="_blank"
                rel="noopener noreferrer">
                <div className={s.project_card_container}>
                  <div className={s.project_image}>
                    <img src={current.img} alt={current.alt} loading="lazy" />
                  </div>
                  <div className={s.chip_and_texts}>
                    <div className={s.chips}>{current.chip}</div>
                    <h3>{wordsSpan(current.title, s.word)}</h3>
                    <p>{wordsSpan(current.desc, s.word)}</p>
                  </div>
                </div>
              </a>
            </article>
          </div>
        </div>

        {/* Static, non-animated list for mobile */}
        <div className={s.mobile_projects_list}>
          {projects.map((p) => (
            <article key={p.title}>
              <a href={p.href} className={s.cols} target="_blank" rel="noopener noreferrer">
                <div className={s.project_card_container}>
                  <div className={s.project_image}>
                    <img src={p.img} alt={p.alt} loading="lazy" />
                  </div>
                  <div className={s.chip_and_texts}>
                    <div className={s.chips}>{p.chip}</div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ==================== Marquee Section ==================== */}
      <Marquee />

      {/* ==================== About me Section ==================== */}
      <section className={s.about} id="about">
        <div className={s.header_and_parag} ref={aboutRef}>
          <h1 ref={aboutTitleRef}>{renderWords('About', aboutWordsRef, aboutCounter, s.word)}</h1>

          <h6 ref={aboutTextRef}>
            {renderWords(ABOUT_PARAGRAPH_1, aboutWordsRef, aboutCounter, s.word)}
            <br />
            <br />
            {renderWords(ABOUT_PARAGRAPH_2, aboutWordsRef, aboutCounter, s.word)}
          </h6>
        </div>
      </section>

      {/* ==================== Beyond the code Section ==================== */}
      <section className={s.beyond} id="beyond">
        <div className={s.textCard} ref={beyondRef}>
          <h1 ref={beyondTitleRef}>
            {renderWords('Beyond the code', beyondWordsRef, beyondCounter, s.word)}
          </h1>
          <p ref={beyondTextRef}>{renderWords(BEYOND_TEXT, beyondWordsRef, beyondCounter, s.word)}</p>
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
