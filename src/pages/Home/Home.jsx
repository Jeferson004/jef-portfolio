import s from "./Home.module.scss";

// components

// Images
import linkedinIcon from "../../assets/linkedin_icon.svg";
import githubIcon from "../../assets/github_icon.svg";
import gmailIcon from "../../assets/gmail_icon.svg";
import Avatar from "../../assets/avatar.png";
import Jvin from "../../assets/jvin_site.png";
import Banwa from "../../assets/banwa.png";
import SquidPay from "../../assets/squid.png";


const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className={s.hero} id="hero">
        <div className={s.header_and_parag}>
          <h1 className={s.h_2xl}>
            Curious enough to learn. Driven enough to build.
          </h1>
          <h6 className={s.h_xs}>
            Front-end developer fueled by coffee and a stubborn desire to make
            things actually work.
          </h6>
        </div>

        <div className={s.scroll_icon}>
          <div className={s.scroll_icon_line}></div>
        </div>

        <div className={s.socialsMenu}>
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
                Then I translate the visuals into responsive, working front-end.
              </p>
            </div>
            <div className={s.cols}>
              <p>03 Build & test</p>
              <p>I write the code, then break it,so I can fix it properly.</p>
            </div>
            <div className={s.cols}>
              <p>04 Ship</p>
              <p>
                Once it's solid, it goes live, and I keep an eye on it early on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={s.projects} id="projects">
        <div className={s.outer_row}>
          <div className={s.indicator}></div>

          <div className={s.inner_row}>
            <a href="#" className={s.cols}>
              <img src={Jvin} alt="Jvin site" />
              <div className={s.chips}>Client Project</div>
              <h6>Product Designer Portfolio</h6>
              <p>
                Part-time freelance front-end development for a live client
                portfolio site
              </p>
            </a>
            <a href="#" className={s.cols}>
              <img src={Banwa} alt="Banwa site" />
              <div className={s.chips}>Backend Development</div>
              <h6>BANWA: Backend & API Architecture</h6>
              <p>
                API development, hosting, and access control for a local
                government service platform
              </p>
            </a>
            <a href="#" className={s.cols}>
              <img src={SquidPay} alt="SquidPay site" />
              <div className={s.chips}>Personal Project</div>
              <h6>Fintech Landing Page (Concept Build)</h6>
              <p>
                Self-initiated front-end project replicating a payments platform
                landing page
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className={s.marquee}>
        <h1>Marquee</h1>
      </section>

      {/* About me Section */}
      <section className={s.about} id="about">
        <h1>About me</h1>
      </section>

      {/* Beyond the code Section */}
      <section className={s.beyond} id="beyond">
        <h1>Beyond the code</h1>
      </section>
    </>
  );
};

export default Home;
