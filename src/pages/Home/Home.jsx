import s from "./Home.module.scss";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className={s.hero} id="hero">
        <h1>Hero</h1>
      </section>

      {/* Projects Section */}
      <section className={s.projects} id="projects">
        <h1>Projects</h1>
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
