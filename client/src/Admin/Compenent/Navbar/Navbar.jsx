import React from "react";
import "./Navbar.css";
import logoday from "../../../assets/images/logoday.png";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

export default function Navbar() {
  const navigate = useNavigate();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const studentNotifications = "new";

  const mobileMenuId = "primary_search_account_menu_mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate("/admin/notifications");
        }}
      >
        <IconButton
          size="large"
          aria-label={`show ${studentNotifications} new notifications`}
          color="inherit"
        >
          <Badge badgeContent={studentNotifications} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/admin/management");
        }}
      >
        <IconButton size="large" color="inherit">
          <AutoStoriesIcon />
        </IconButton>
        <p>Courses</p>
      </MenuItem>
      <MenuItem onClick={() => navigate("/admin/profile")}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary_search_account_menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img
            src={logoday}
            onClick={() => {
              navigate("/admin/dashboard");
            }}
            alt="DEV TECH EDUCATION"
            className="navbar_Logo"
          />

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => {
                navigate("/admin/management");
              }}
            >
              <AutoStoriesIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label={`show ${studentNotifications} new notifications`}
              color="inherit"
              onClick={() => {
                navigate("/admin/notifications");
              }}
            >
              <Badge badgeContent={studentNotifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={() => navigate("/admin/profile")}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
