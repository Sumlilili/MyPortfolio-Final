import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section className="projects-page">
      <h1 className="page-title">My Projects</h1>

      <div className="project-grid">
        {projects.map(p => (
          <article key={p.id} className="project-card">
            <img src={p.img} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{p.blurb}</p>

            <div className="proj-buttons">
                {/* {provide demo } */}
              {p.demo && (
                <a
                  href={p.demo}
                  target="_blank"
                  className="btn-primary"
                >
                  Live Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
