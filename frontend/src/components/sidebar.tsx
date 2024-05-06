import React from "react";
import { NavLink } from "react-router-dom";
import { dashboardIcon, productsIcon, dashboardactive, productsactive } from "../assets/images";

function Sidebar(){
    return(
        <>
        <nav className="navbar">
            <ul>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={"/dashboard"} title="Dashboard"> <img src={dashboardIcon} alt="dashboard" className="default-icon" /><img src={dashboardactive} alt="dashboard" className="active-icon" /> Dashboard</NavLink></li>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={"/account"} title="Account"> <img src={productsIcon} alt="account" className="default-icon" /><img src={productsactive} alt="account" className="active-icon" /> Account</NavLink></li>
            </ul>
        </nav>
        </>
    )
}
export default Sidebar;