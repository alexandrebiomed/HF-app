import useAuth from "../Context/useAuth";
import "../styles/Content.scss";

import LoginButton from "./LoginButton";
import ContentMenuItem from "./ContentMenuItem";
import CompanyLogo from './CompanyLogo'

// import { useEffect } from 'react';
// import { useNavigate } from "react-router-dom";

function Content() {
  const {isAuthenticated, user, logout} = useAuth();

 

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
        <div className="grid-item logo-container">
          <div className="contentLogo">
            <a href="/"> <CompanyLogo sizeFactor="0.7" companyName="DEEPER" companySlogan="BUILD REAL HUMAN INTERACTION"/> </a>
          </div>
        </div>
        <div className="grid-item leftSideBar">
          <ContentMenuItem text="My Chat"/>
          <ContentMenuItem text="Family Chat"/>
          <ContentMenuItem text="Blog"/>
        </div>
        <div className="grid-item Panel">
          Panel
        </div>
        <div className="grid-item rightSideBar">
          rightSideBar <br/>
          <LoginButton buttontext='Logout' onclick={handleLogout}/>
          <p>Hi user with id {user?.id}, you are authenticated : {isAuthenticated ? "true" : "false"}!</p>
        </div>
        
      </div>
    </div>
  )
}

export default Content
