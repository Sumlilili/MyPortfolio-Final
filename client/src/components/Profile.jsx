import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export default function Profile() {
  const { user, role, token, login } = useAuth();
  const [isAdmin, setIsAdmin] = useState(role === "admin");

  useEffect(() => {
    setIsAdmin(role === "admin");
  }, [role]);

  const toggleRole = async () => {
    if (!user || !user.email) return;

    const newRole = isAdmin ? "user" : "admin";

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/byemail/${user.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      const updated = await res.json();

      if (res.ok) {
        setIsAdmin(!isAdmin);

        // 🔁 Update the context with new role
        login(token, newRole, {
          name: user.name,
          email: user.email,
        });
      } else {
        alert(updated.error || "Failed to update role");
      }
    } catch (err) {
      console.error("Role update failed:", err);
      alert("Could not connect to the server");
    }
  };

  return (
    <div className="form-card" style={{ textAlign: "center" }}>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Current Role:</strong> {isAdmin ? "admin" : "user"}</p>

      <div style={{ marginTop: "1.5rem" }}>
        <label style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem" }}>
          <span style={{ fontWeight: "bold" }}>Admin Access</span>
          <label className="switch">
            <input type="checkbox" checked={isAdmin} onChange={toggleRole} />
            <span className="slider round"></span>
          </label>
        </label>
      </div>
    </div>
  );
}
