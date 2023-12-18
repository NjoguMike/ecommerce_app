import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function ProfileMenu() {
  return (
    <div className="account-container">
      <div className="ac-menu">
        <h4 className="generic-h4">Manage Account</h4>
        <Link to={"/account/inbox"}>Inbox</Link>
        <Link to={"/account/profile-settings"}>Profile Settings</Link>
        <Link to={"/account/orders"}>Orders</Link>
        <Link to={"/account/checkout"}>Checkout</Link>
        <Link to={"/account/favorites"}>Saved Items</Link>
        <Link>Need Help ?</Link>
        <Link>Give Feedback</Link>
      </div>
      <div className="dynamic-menu">
        <Outlet />
      </div>
    </div>
  );
}
