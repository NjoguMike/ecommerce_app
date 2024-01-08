import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";
import Logo from "../assets/Logo.png";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function NavBar({ onSearch, user }) {

  return (
    <>
      <nav>
        <div className="nav-items">
          <NavLink to={"/products"}>
            <div className="logo-container">
              <img className="logo" alt="logo" src={Logo} />
            </div>
          </NavLink>
            {user.email ? (
              <div className="nav-links">
                  <NavLink to={"/products"}>
                    Log Out <LogoutIcon /> 
                  </NavLink>
                  <NavLink to={"/account/profile-settings"}>
                  <AccountCircleIcon /> {user.email}
                </NavLink>
              </div>
            ) : (
              <div className="nav-links">
                <NavLink to={"/login"}>
                  <LoginIcon /> Sign In
                </NavLink>
                <NavLink to={"/account/profile-settings"}>
                <AccountCircleIcon /> {"Profile"}
                </NavLink>
              </div>
            )}
          </div>
        <Searchbar products={onSearch} />
      </nav>
      <Outlet />
    </>
  );
}
