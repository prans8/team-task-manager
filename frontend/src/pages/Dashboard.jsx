import { useEffect, useState } from "react";
import API from "../api";   // ✅ use your API file

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  if (!localStorage.getItem("token")) {
    window.location.href = "/";
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/api/projects", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setProjects(res.data);

      if (res.data.length > 0) {
        fetchTasks(res.data[0]._id);
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching projects");
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      const res = await API.get(`/api/tasks/${projectId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching tasks");
    }
  };

  return (
    <div style={{ padding: "20px", background: "#f3f4f6", minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Dashboard</h2>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      <h3>Projects</h3>
      {projects.map((p) => (
        <div
          key={p._id}
          onClick={() => fetchTasks(p._id)}
          style={{
            background: "white",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          📁 {p.name}
        </div>
      ))}

      <h3>Tasks</h3>
      {tasks.map((t) => (
        <div
          key={t._id}
          style={{
            background: "white",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          {t.title} — {t.status}
        </div>
      ))}
    </div>
  );
}