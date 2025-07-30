const services = [
      {
    id: 1,
    title: "Web Development",
    img: "/web.png",
    blurb: "Responsive React + Node solutions."
  },
  {
    id: 2,
    title: "System Design",
    img: "/system.png",
    blurb: "Planning the big picture."
  },
  {
    id: 3,
    title: "Database Design",
    img: "/database.png",
    blurb: "Clean SQL & MongoDB schemas."
  },
  {
    id: 4,
    title: "API Integration",
    img: "/api.svg",
    blurb: "REST / GraphQL endpoints & docs."
  }
];

export default function Services() {
  return (
    <section className="services-page">
      <h1 className="page-title">What I Can Do for You</h1>

      <div className="service-grid">
        {/* {using map to display offered services} */}
        {services.map(s => (
          <article key={s.id} className="service-card">
            <img src={s.img} alt={s.title} />
            <h3>{s.title}</h3>
            <p>{s.blurb}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
