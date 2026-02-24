const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

export const api = {
  /* =========================
     AUTH APIs
  ========================= */
  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Login failed");
    }
    return res.json();
  },

  async register(name, email, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Registration failed");
    }
    return res.json();
  },

  /* =========================
     TASK APIs
  ========================= */
  async getTasks() {
    const res = await fetch(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  },

  async createTask(task) {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(task),
    });

    if (res.status !== 201 && !res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Create failed");
    }

    return res.json();
  },

  async updateTask(id, updates) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error("Update failed");
    return res.json();
  },

  async deleteTask(id) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) throw new Error("Delete failed");
    return res.json();
  },
};