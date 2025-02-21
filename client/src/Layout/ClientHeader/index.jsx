import React, { useContext } from "react";
import { FiPhone } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import "./index.scss";
import { NavLink } from "react-router-dom";
import ResponsiveDrawer from "../../Components/Menu";
// import { GoPerson } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import { KabinetContext } from "../../Context/KabinetContext";
import { AuthContext } from "../../Context/AccesContext";
import { IoMdExit } from "react-icons/io";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoMdArrowDropdown } from "react-icons/io";
const ClientHeader = () => {
  const { handleOpen, handleClose, open, setOpen } = useContext(KabinetContext);
  const { token, decodedToken,vezife, handleLogin, handleLogout } =
    useContext(AuthContext);
    console.log(vezife);
    
  const [anchorEl, setAnchorEl] = React.useState(null);
  const ope = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleclose = () => {
    setAnchorEl(null);
  };
  const style = {
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.3rem",
    marginTop: "3px",
    "&:hover": {
      "& p, & h5": { color: "#909499" }, // Change text color on hover
    },
    "& p": {
      marginTop: "4px",
      fontSize: "1.6rem",
      fontWeight: 500,
      color: "#0085C9",
      transition: "all 0.6s",
    },
    "& h5": {
      marginBottom: "5px",
      fontSize: "1rem",
      color: "#0085C9",
      transition: "all 0.6s",
    },
  }
  return (
    <>
      <header id="clientHeader">
        <nav>
          <div className="container">
            <div className="navTop">
              <div className="phoneAndEmail">
                <p>
                  <FiPhone /> +994 345 6789
                </p>
                |
                <p>
                  <FaRegEnvelope />
                  e-poliklinika@gov.az
                </p>
              </div>
              <div className="links">
                <ul>
                  <li>
                    <a href="#">
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <RiInstagramFill />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaXTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaLinkedinIn />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaYoutube />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="line"></div>
          <div className="container">
            <div className="navDown">
              <div className="logo">
                <img src="../public/images/Home/SehiyyeLogo.jpg" alt="" />
                <h1>E-Poliklinika</h1>
              </div>
              <div className="pageLinks">
                <ul>
                  <li>
                    <NavLink to="/">Haqqımızda</NavLink>
                    <p></p>
                  </li>
                  <li>
                    <NavLink to="/">Əlaqə</NavLink>
                    <p></p>
                  </li>
                </ul>
                {!token ? (
                  <button onClick={handleOpen} className="login">
                    Kabinet
                    <p>
                      <IoPersonOutline />
                    </p>
                  </button>
                ) : (
                  <div className="proFile">
                    <Button
                      id="basic-button"
                      aria-controls={ope ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={ope ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <p style={{fontSize:"1.1rem",fontWeight:"500"}}>Kabinet</p> <p style={{fontSize:"1.2rem",marginTop:"5px"}}><IoMdArrowDropdown /></p>
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={ope}
                      onClose={handleclose}
                      disableScrollLock
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>{vezife === "patient" || vezife === undefined ?<NavLink to = "/patient_kabinet" style={{color:"#0085C9"}}>Kabinet</NavLink>:<NavLink to = "/doctor_kabinet" style={{color:"#0085C9"}}>Kabinet</NavLink>}</MenuItem>
                      <MenuItem sx = {style} onClick={handleClose}><button style = {{border:"none",display:"flex",alignItems:"center",backgroundColor:"transparent"}}onClick={handleLogout} className='logout'><p><IoMdExit /></p><h5>Çıxış</h5></button></MenuItem>
                    </Menu>
                  </div>
                )}
              </div>
              <div className="menuBar">
                <ResponsiveDrawer />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default ClientHeader;
