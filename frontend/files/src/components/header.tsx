import { Button, IconButton, Menu, MenuItem, Popover } from "@mui/material";
import React from "react";
import { companyLogo } from "../assets/images";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuIcon } from "../assets/images";



function Header() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const location = useLocation();
    const navigate = useNavigate();
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(null);
    const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const open2 = Boolean(anchorEl2);
    const id2 = open ? 'simple-popover' : undefined;
    return (<>
        <div className="header">
            <div className="header-section" style={{alignItems: 'center', justifyContent: "center"}}>
            {
                location.pathname != '/' && (<IconButton className="menu-btn" style={{left: 0, position: "absolute"}} onClick={e => { document.body.classList.toggle('sidebar-open'); document.body.classList.remove('search-open') }}><img src={menuIcon} alt="menu" /></IconButton>) 
            } 
            
                <a href="#">
                    <img src={companyLogo} alt="company" className="logo" />
                <h2>Go-Canvas</h2>
                </a>
                {
                    location.pathname != '/' && ( <Button variant="contained" color="info" style={{position: "absolute", right: "10px"}}
                    onClick={()=>{ localStorage.removeItem('token'); navigate('/')}}>Log Out</Button>) 
                }
            </div>
        </div>
    </>
    );
}
export default Header;