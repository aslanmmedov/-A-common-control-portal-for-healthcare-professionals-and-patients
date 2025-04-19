import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import { IoMenu, IoPersonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "./menu.scss";
import { IoMdArrowDropdown, IoMdExit } from "react-icons/io";
import { Button, Menu, MenuItem } from "@mui/material";
import { AuthContext } from "../Context/AccesContext";
import { KabinetContext } from "../Context/KabinetContext";
const drawerWidth = 270;

function ResponsiveDrawer(props) {
  const { token, decodedToken, vezife, handleLogin, handleLogout } =
    React.useContext(AuthContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const ope = Boolean(anchorEl);
  const { handleOpen, handleClose, open, setOpen } = React.useContext(KabinetContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleclose = () => {
    setAnchorEl(null);
  };
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
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
  };
  const drawer = (
    <div>
      <div className="logo">
        <img src="../public/images/Home/SehiyyeLogo.jpg" alt="" />
        <h1>E-Poliklinika</h1>
      </div>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <NavLink to="/">Ev</NavLink>
          </ListItemButton>
          <br />
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <NavLink to="/">Haqqımızda</NavLink>
          </ListItemButton>
          <br />
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <NavLink to="/">Əlaqə</NavLink>
          </ListItemButton>
          <br />
        </ListItem>
      </List>
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
            <p style={{ fontSize: "1.1rem", fontWeight: "500" }}>Kabinet</p>{" "}
            <p style={{ fontSize: "1.2rem", marginTop: "5px" }}>
              <IoMdArrowDropdown />
            </p>
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
            {location.pathname !== "/" ? (
              <MenuItem onClick={handleclose}>
                <NavLink to="/" style={{ color: "#0085C9" }}>
                  Home
                </NavLink>
              </MenuItem>
            ) : (
              <MenuItem onClick={handleClose}>
                {vezife === "patient" || vezife === undefined ? (
                  <NavLink to="/patient_kabinet" style={{ color: "#0085C9" }}>
                    Kabinet
                  </NavLink>
                ) : (
                  <NavLink to="/doctor_kabinet" style={{ color: "#0085C9" }}>
                    Kabinet
                  </NavLink>
                )}
              </MenuItem>
            )}
            <MenuItem sx={style} onClick={handleclose}>
              <button
                style={{
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
                onClick={handleLogout}
                className="logout"
              >
                <p>
                  <IoMdExit />
                </p>
                <h5>Çıxış</h5>
              </button>
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" } }}
        >
          <IoMenu />
        </IconButton>
      </Toolbar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
