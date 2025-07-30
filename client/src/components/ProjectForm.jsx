import React, { useState } from "react";

export default function ProjectForm() {
  const [form, setForm] = useState({ title: "", description: "", tech: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project Info:", form);
  };

  return (
    <div className="form-card">
      <h2>Project</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <input
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="tech"
          placeholder="Technologies Used"
          value={form.tech}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary">Submit</button>
      </form>
    </div>
  );
}
