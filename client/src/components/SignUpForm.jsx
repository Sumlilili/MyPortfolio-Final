import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! Please sign in.");
        navigate("/signin");
      } else {
        alert("Failed to sign up: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Network error. Please try again later.");
    }
  };

  return (
    <div className="form-card">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary">Register</button>
      </form>
    </div>
  );
}
