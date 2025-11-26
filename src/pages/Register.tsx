import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password, role });
      alert("Registered successfully — please log in.");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a89cc, #b8e994)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          padding: "30px 35px",
          borderRadius: 12,
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          animation: "fadeIn 0.6s ease",
        }}
      >
        <h2 style={{ marginBottom: 20, textAlign: "center" }}>Create Account</h2>

        <form onSubmit={handleRegister}>
          <label style={{ fontWeight: 600 }}>Full Name</label>
          <input
            required
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <label style={{ fontWeight: 600 }}>Email</label>
          <input
            required
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <label style={{ fontWeight: 600 }}>Password</label>
          <input
            required
            type="password"
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <label style={{ fontWeight: 600, marginBottom: 6, display: "block" }}>
            Register As
          </label>

          <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
            <label style={radioLabel}>
              <input
                type="radio"
                value="USER"
                checked={role === "USER"}
                onChange={() => setRole("USER")}
              />
              User
            </label>

            <label style={radioLabel}>
              <input
                type="radio"
                value="ADMIN"
                checked={role === "ADMIN"}
                onChange={() => setRole("ADMIN")}
              />
              Admin
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 0",
              background: loading ? "#888" : "#2d98da",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              cursor: "pointer",
              transition: "0.25s",
            }}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: "center" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#0984e3",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

// Reusable styles
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: 15,
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 15,
  outline: "none",
  transition: "0.25s",
};

const radioLabel: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer",
  fontWeight: 500,
};
