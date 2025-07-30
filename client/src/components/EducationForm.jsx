import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export default function EducationPage() {
  const { role, token } = useAuth();
  const [educations, setEducations] = useState([]);
  const [form, setForm] = useState({ institution: "", degree: "", year: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/education")
      .then(res => res.json())
      .then(data => setEducations(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:3000/api/education/${editingId}`
      : "http://localhost:3000/api/education";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const updated = await res.json();
      if (res.ok) {
        alert("Saved successfully");
        if (editingId) {
          setEducations(prev => prev.map(e => (e._id === editingId ? updated : e)));
        } else {
          setEducations(prev => [...prev, updated]);
        }
        setForm({ institution: "", degree: "", year: "" });
        setEditingId(null);
      } else {
        alert(updated.error || "Error saving");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entry?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/education/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setEducations(prev => prev.filter(e => e._id !== id));
      } else {
        const errData = await res.json();
        alert(errData.error || "Delete failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  const startEdit = (edu) => {
    setForm({ institution: edu.institution, degree: edu.degree, year: edu.year });
    setEditingId(edu._id);
  };

  return (
    <div className="form-card">
      <h2>Education / Qualification</h2>

      {/* Education List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {educations.map((edu) => (
          <li key={edu._id} style={{ marginBottom: "1rem" }}>
            <strong>{edu.degree}</strong> at <em>{edu.institution}</em> ({edu.year})
            {role === "admin" && (
              <div style={{ marginTop: "0.5rem" }}>
                <button className="btn-ghost" onClick={() => startEdit(edu)}>Edit</button>
                <button className="btn-ghost" onClick={() => handleDelete(edu._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Admin Form */}
      {role === "admin" && (
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            name="institution"
            placeholder="Institution"
            value={form.institution}
            onChange={handleChange}
            required
          />
          <input
            name="degree"
            placeholder="Degree"
            value={form.degree}
            onChange={handleChange}
            required
          />
          <input
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-primary">
            {editingId ? "Update" : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
