// frontend/src/pages/Register.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosClient";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", { email, name, password, role: "USER" });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 350, margin: "80px auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister}>
        <input required type="text" placeholder="Name" style={{ width: "100%", padding: 8, marginBottom: 10 }} value={name} onChange={(e) => setName(e.target.value)} />
        <input required type="email" placeholder="Email" style={{ width: "100%", padding: 8, marginBottom: 10 }} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input required type="password" placeholder="Password" style={{ width: "100%", padding: 8, marginBottom: 10 }} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" style={{ width: "100%", padding: 10 }} disabled={loading}>{loading ? "Creating account..." : "Register"}</button>
      </form>
      <div style={{ marginTop: 15, textAlign: "center" }}>Already have an account? <Link to="/login">Login</Link></div>
    </div>
  );
}
