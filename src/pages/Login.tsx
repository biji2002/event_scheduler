// frontend/src/pages/Login.tsx
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password, role });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      login(res.data.token, res.data.user);

      // ROLE BASED REDIRECT
      if (res.data.user.role === "ADMIN") {
        navigate("/add-event");
      } else {
        navigate("/events");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-sub">Login to access the event dashboard</p>

        <form onSubmit={handleLogin}>
          <div className="input-box">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label>Role</label>
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "USER" | "ADMIN")
              }
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}
