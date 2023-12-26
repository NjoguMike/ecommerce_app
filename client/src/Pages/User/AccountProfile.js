import React from "react";
import { ReactComponent as Cart } from "../../assets/Cart.svg";
import Logo from "../../assets/Logo.png";
import ProfileMenu from "../../components/ProfileMenu";
import { NavLink } from "react-router-dom";

export default function AccountProfile({ userData, itemCount }) {
  return (
    <div className="account-profile">
      <div className="profile-header">
        <NavLink to={"/products"}>
          <div className="logo-container">
            <img className="logo" alt="logo" src={Logo} />
          </div>
        </NavLink>
        <div className="profile-box">
          <div className="user-details">
            <span>{userData.name}</span>
            <span>{userData.email}</span>
          </div>
          <div className="checkout">
            {itemCount.length > 0 && itemCount.length}
            <Cart />
          </div>
        </div>
      </div>
      <ProfileMenu />
    </div>
  );
}
