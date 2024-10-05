import useAuth from "../Context/useAuth";

import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Content() {
  const {isAuthenticated, user, logout} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
        navigate('/login');
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [isAuthenticated]);


  const handleLogout = (event) => {
    event.preventDefault();
    logout();
  }

  return (
    <>
      <button className="login" onClick={handleLogout}>Logout</button>
      
      <p>Hi user with id {user.id}, you are authenticated : {isAuthenticated ? "true" : "false"}!</p>
    </>
  )
}

export default Content
