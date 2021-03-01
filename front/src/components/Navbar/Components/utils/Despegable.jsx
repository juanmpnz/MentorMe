import React from 'react';
import Button from '@material-ui/core/Button';
import { useLocation, Link } from "react-router-dom"
import Menu from '@material-ui/core/Menu';
import { logout } from "../../../../redux/action-creators/currentUser";
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from "react-redux";

import Avatar from "@material-ui/core/Avatar";

export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const currentUser = useSelector((state) => state.currentUser)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch();
    return (
        <div>
            <Button aria-controls="simple-menu" style={{ width: '50px', marginTop: '33px', marginRight: '13px' }} aria-haspopup="true" onClick={handleClick}>

                <Avatar
                    alt="avatar"
                    src={currentUser.avatar}
                    style={{ height: "1.8em", width: "1.8em" }}
                />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link className="linkDesktop" style={{ textDecoration: 'none', color: 'black' }} to="/myprofile">
                    <MenuItem onClick={handleClose}>My Profile</MenuItem>
                </Link>


                <Link className="linkDesktop" style={{ textDecoration: 'none', color: 'black' }} to={{
                    pathname: "/skills/select",
                    state: { option: "mentor", changeSearch: false },
                }}>
                    <MenuItem onClick={handleClose}>Match Mentor</MenuItem>
                </Link>
                <Link className="linkDesktop" style={{ textDecoration: 'none', color: 'black' }} to={{
                    pathname: "/skills/select",
                    state: { option: "mentee", changeSearch: false },
                }}>
                    <MenuItem onClick={handleClose}>Match Mentee</MenuItem>
                </Link>
                <Link className="linkDesktop" style={{ textDecoration: 'none', color: 'black' }} to="/login" >
                    <MenuItem onClick={() => dispatch(logout())}  >Logout</MenuItem>
                </Link>
            </Menu>
        </div >
    );
}