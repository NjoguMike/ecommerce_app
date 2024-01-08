import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";
import Logo from "../assets/Logo.png";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Swal from "sweetalert2";

export default function NavBar({ onSearch, user , setMember}) {
  const navigate = useNavigate();
  function handleLogOut(){
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((resp) => {
      if (resp.ok){
        resp.json().then((r)=>{
          setMember("")
          Swal.fire({
            title: "Success!",
            text: `GoodBye ${r.message}`,
            icon: "success",
            confirmButtonText: "Okay",
          });
          navigate("/", { replace: true });
        })
      }
    })
  }

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
                  <NavLink to={"/products"} onClick={handleLogOut}>
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
