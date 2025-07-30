import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>🚫 Access Denied</h2>
      <p>You do not have permission to view this page.</p>
      <Link to="/" className="btn-primary">Go Home</Link>
    </div>
  );
}
