import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/variables.css";
import "./styles/layout.css";
import "./styles/modal.css";
import "./styles/sidebar.css";
import "./styles/topbar.css";
import "./styles/task-card.css";
import "./styles/buttons.css";
import "./styles/todos.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);