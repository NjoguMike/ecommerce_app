import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function SideBar() {
  return (
    <aside className="show side-bar">
      <h4 className="generic-h4">Categories</h4>
      <div className="side-menu">
        <Link to={"/baby-products"}>Baby Products</Link>
        <Link to={"/Clothes"}>Clothes </Link>
        <Link to={"/electronics"}>Electronics</Link>
        <Link to={"/home-products"}>Home Products</Link>
        <Link>Need Help ?</Link>
        <Link>Give Feedback</Link>
        <Outlet />
      </div>
    </aside>
  );
}
