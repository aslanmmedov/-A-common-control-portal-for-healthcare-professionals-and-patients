import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import KabinetProvider from "./Context/KabinetContext.jsx";
import AuthProvider from "./Context/AccesContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <KabinetProvider>
        <App />
      </KabinetProvider>
    </AuthProvider>
  </BrowserRouter>
);
