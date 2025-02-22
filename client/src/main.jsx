import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import KabinetProvider from "./Context/KabinetContext.jsx";
import AuthProvider from "./Context/AccesContext.jsx";
import DoctorsProvider from "./Context/DoctorsContext.jsx";
import HospitalsProvider from "./Context/HospitalsContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <HospitalsProvider>
        <DoctorsProvider>
          <KabinetProvider>
            <App />
          </KabinetProvider>
        </DoctorsProvider>
      </HospitalsProvider>
    </AuthProvider>
  </BrowserRouter>
);
