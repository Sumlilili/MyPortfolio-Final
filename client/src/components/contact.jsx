import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Contact() {
  const nav = useNavigate();
  const { role, token } = useAuth();
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "", message: ""
  });
  const [contacts, setContacts] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Message sent successfully!");
        setForm({ firstName: "", lastName: "", phone: "", email: "", message: "" });
        if (role === "admin") fetchContacts(); // Refresh admin table
      } else {
        alert("Failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Network error.");
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setContacts(Array.isArray(data) ? data : []);
      } else {
        console.error("Fetch failed:", data.error);
        setContacts([]);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setContacts([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchContacts();
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      alert("Server error.");
    }
  };

  useEffect(() => {
    if (role === "admin") fetchContacts();
  }, [role]);

return (
  <section className="contact-page">
    <aside className="contact-panel">
      <h2>Get in Touch</h2>
      <p>Email: <a href="mailto:tli148@my.centennialcollege.ca">tli148@my.centennialcollege.ca</a></p>
      <p>Phone: <a href="tel:+1-123-456-7890">+1 (123) 456-7890</a></p>
      <p>Location: Toronto, Canada</p>
    </aside>

    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="two-col">
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
      </div>
      <div className="two-col">
        <input name="phone" placeholder="Contact Number" value={form.phone} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
      </div>
      <textarea name="message" placeholder="Message" rows="5" value={form.message} onChange={handleChange} />
      <input type="submit" value="Send Message" className="btn-primary" />
    </form>

    {role === "admin" && (
      <div className="admin-contacts" style={{ marginTop: "3rem" }}>
        <h3>Submitted Contacts</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Message</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id}>
                <td>{c.firstName} {c.lastName}</td>
                <td>{c.email}</td>
                <td>{c.message}</td>
                <td>
                  <button onClick={() => handleDelete(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
);
}
