import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  };

 return (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f3f4f6"
  }}>
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      width: "300px"
    }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <input
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        style={{
          width: "100%",
          padding: "10px",
          background: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
        onClick={login}
      >
        Login
      </button>
    </div>
  </div>
);
}