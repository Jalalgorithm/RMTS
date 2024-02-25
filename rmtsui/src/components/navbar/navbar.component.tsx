import React, { useContext, useState } from "react";
import "./navbar.scss";
import { Link, redirect, useNavigate } from "react-router-dom";
import { Menu, LightMode, DarkMode } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";
import { ThemeContext } from "../../context/theme.context";
import { useToken } from "../tokenprovider/tokenprovider.component";
import { useAuth } from "../authprovider/authprovider.component";
import { link } from "fs";

const links = [
  { href: "/home", label: "Home" },
  { href: "/companies", label: "Companies" },
  { href: "/jobs", label: "Jobs" },
  { href: "/candidates", label: "Candidate" },
  { href: "/candidates/add", label: "AddCandidate" },
];

const Navbar: React.FC = () => {
  const redirect = useNavigate();
  const { user } = useAuth();
  const { token, clearToken } = useToken();
  const [open, setOpen] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const handleLogout = () => {
    clearToken();
  };

  const ToggleOpenMenu = () => {
    setOpen((prevState) => !prevState);
  };

  const menuStyles = open ? "menu open" : "menu";

  var filterLinks: {
    href: string;
    label: string;
  }[];

  if (user?.role === "Client") {
    filterLinks = links.filter(
      (item) =>
        item.label === "Jobs" ||
        item.label === "AddCandidate" ||
        item.label === "Home"
    );
  } else if (user?.role === "Admin") {
    filterLinks = links.filter(
      (item) =>
        item.label === "Jobs" ||
        item.label === "Candidate" ||
        item.label === "Home" ||
        item.label === "Companies"
    );
  } else {
    filterLinks = links.filter((item) => item.label === "Home");
  }
  // const filteredLinks =
  //   user?.role === "Client"
  //     ? links.filter(
  //         (item) =>
  //           item.label === "Jobs" ||
  //           item.label == "AddCandidate" ||
  //           item.label === "Home"
  //       )
  //     : links;

  return (
    <div className="navbar">
      <div className="brand">
        <span>Resume Management Tracking System</span>
      </div>
      <div className={menuStyles}>
        <ul>
          {filterLinks.map((item) => (
            <li key={item.href} onClick={ToggleOpenMenu}>
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
          {token ? (
            <li>
              <Link to="/logout" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={ToggleOpenMenu}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" onClick={ToggleOpenMenu}>
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="hamburger">
        <Menu onClick={ToggleOpenMenu} />
      </div>
      <div className="toggle">
        <ToggleButton
          value={"check"}
          selected={darkMode}
          onChange={toggleDarkMode}
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </ToggleButton>
      </div>
    </div>
  );
};

export default Navbar;
