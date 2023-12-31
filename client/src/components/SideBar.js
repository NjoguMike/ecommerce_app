import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../components/SideBar.css"
import ComputerIcon from '@mui/icons-material/Computer';
import HomeIcon from '@mui/icons-material/Home';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import GrassIcon from '@mui/icons-material/Grass';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ChairIcon from '@mui/icons-material/Chair';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import { Button } from "@mui/material";


export default function SideBar() {

const location = useLocation()
const [ closeMenu, setCloseMenu] = useState(true)

const handleSidebar = () => {
  setCloseMenu(!closeMenu)
}

  return (
    <aside className={closeMenu ? "side-bar" : "side-bar active"}>
      <div className={closeMenu ? "side-menu": "side-menu active"}>
        <Link className={location.pathname === "/electronics" ? "active" : ""} to={"/electronics"}><span><ComputerIcon /></span>Electronics</Link>
        <Link className={location.pathname === "/baby-products" ? "active" : ""} to={"/baby-products"}><span><ChildCareIcon /></span>Baby</Link>
        <Link className={location.pathname === "/clothes" ? "active" : ""} to={"/clothes"}><span><CheckroomIcon /></span>Clothes</Link>
        <Link className={location.pathname === "/kitchen" ? "active" : ""} to={"/kitchen"}><span><CoffeeMakerIcon /></span>Kitchen</Link>
        <Link className={location.pathname === "/home-products" ? "active" : ""} to={"/home-products"}><span><ChairIcon /></span>Home Products</Link>
        <Link className={location.pathname === "/outdoors" ? "active" : ""} to={"/outdoors"}><span><GrassIcon /></span>Outdoors</Link>
        <Outlet />
      </div>
      <div className="home-btn"><li onClick={()=>{handleSidebar()}}><HomeIcon /></li></div>
    </aside>
  );
}
