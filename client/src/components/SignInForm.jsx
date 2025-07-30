import{  React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function SignInForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        const { token, user } = data;

        // Call login with token, role, and user info
        login(token, user.role, {
          name: user.name,
          email: user.email,
        });

        navigate("/");
      } else {
        alert(data.error || "Invalid login");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Could not connect to the server");
    }
  };

  return (
    <div className="form-card">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary">Login</button>
      </form>

      {/* 👇 Sign Up Button */}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="btn-ghost"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
