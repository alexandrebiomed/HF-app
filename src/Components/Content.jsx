import { useState } from "react";

import useAuth from "../Context/useAuth";
import "../styles/Content.scss";

// import { useEffect } from 'react';
// import { useNavigate } from "react-router-dom";

function Content() {
  const {isAuthenticated, user, logout} = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
      setDrawerOpen(open);
  };

//  const navigate = useNavigate();

//  useEffect(() => {
//    if (!isAuthenticated) {
//        navigate('/login');
//    }
//// eslint-disable-next-line react-hooks/exhaustive-deps
//}, [isAuthenticated]);


  const handleLogout = (event) => {
    event.preventDefault();
    logout();
  }

  return (
    <div className="content-container">
      <div className="gridLayout">
        <div className="content-background"></div>
        <div className="grid-item Logo">
          <img src="images/logo2.png" alt="FamilyBlog logo" id="logo" />
          <a href="/" id="familyblog">HappyFamily</a> 
        </div>
        <div className="grid-item leftSideBar">
          leftSideBar
        </div>
        <div className="grid-item Panel">
          Panel
        </div>
        <div className="grid-item rightSideBar">
          rightSideBar
          <button className="login" onClick={handleLogout}>Logout</button>
          <p>Hi user with id {user?.id}, you are authenticated : {isAuthenticated ? "true" : "false"}!</p>
        </div>
        
      </div>
    </div>
  )
}

export default Content
