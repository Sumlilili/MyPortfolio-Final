import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home">

      {/* 1 ▸ HERO   */}
      <header className="hero">
        <h1>Hello, I’m <span className="name-gradient">Tak Sum Li</span></h1>
        <p className="tagline">
          Software Engineer Develpoer crafting fast, accessible, <br />
          and thoughtful web experiences.
        </p>
        <Link to="/about" className="btn-primary">More about me</Link>
      </header>



      {/* 3 ▸ FEATURED PROJECTS   */}
      <section className="featured-projects">
        <h2>Highlighted Projects</h2>

        <div className="project-grid">
          <article className="project-card">
            <img src="/project1.png" alt="Weather App" />
            <h3>Traffic light</h3>
            <p>Javascript project</p>
          </article>

          <article className="project-card">
            <img src="/project2.png" alt="Inventory System" />
            <h3>Pixar Movie Gallery</h3>
            <p>Javascript with Json</p>
          </article>

          <article className="project-card">
            <img src="/project3.png" alt="Campus Exchange" />
            <h3>Poker Game</h3>
            <p>Using API in Javascript</p>
          </article>
        </div>

        <Link to="/projects" className="btn-ghost">Browse all projects »</Link>
      </section>

      {/* 4 ▸ SERVICES   */}
      <section className="services-strip">
        <div>
          <i className="fa-solid fa-laptop-code"></i>
          <span>Web&nbsp;Dev</span>
        </div>
        <div>
          <i className="fa-solid fa-mobile-screen"></i>
          <span>System&nbsp;Apps</span>
        </div>
        <div>
          <i className="fa-solid fa-database"></i>
          <span>DB&nbsp;Design</span>
        </div>
        <div>
          <i className="fa-solid fa-rocket"></i>
          <span>Deploy &amp; CI</span>
        </div>
      </section>

      {/* 5 ▸ CTA  */}
      <section className="cta">
        <h2>Have an idea in mind?</h2>
        <Link to="/contact" className="btn-primary">Let’s work together</Link>
      </section>
    </section>
  );
}
