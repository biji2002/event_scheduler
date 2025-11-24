// frontend/src/pages/Login.tsx
import { useState } from "react";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "USER">("USER");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password, role });
      login(res.data.token, res.data.user);
      if (res.data.user.role === "ADMIN") navigate("/add-event");
      else navigate("/events");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ width: 300, margin: "auto", marginTop: 50 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <select value={role} onChange={(e) => setRole(e.target.value as any)}>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select><br /><br />
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: 20 }}>New user? <a href="/register">Register here</a></p>
    </div>
  );
}
