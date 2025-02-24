import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AccesContext";
import { IoMdExit } from "react-icons/io";
import "./index.scss"
const AdminHeader = () => {
  const location = useLocation();
  const { token, vezife, handleLogin, handleLogout } = useContext(AuthContext);
  return (
    <>
      {location.pathname !== "/admin" ? (
        <header id = "admin">
          <nav>
            <div className="container">
              <div className="head">
              <div className="logo"><h2>AdminPanel</h2></div>
              <div className="btn">
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <p>
                    <IoMdExit />
                  </p>
                  Çıxış
                </button>
              </div>
              </div>
            </div>
          </nav>
        </header>
      ) : null}
    </>
  );
};

export default AdminHeader;
