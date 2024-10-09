import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

import LoginField from './LoginField';
import GoBackArrow from './GoBackArrow';
import SignUpButton from "./SignUpButton";

import { FaUserCircle } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import useAuth from "../Context/useAuth";

import "../styles/SignUp&LoginForm.scss";


function LoginForm() {
  
  const navigate = useNavigate();

  const {login, loginError, loginMessage, isAuthenticated} = useAuth();

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupRedirect = (event) => {
    event.preventDefault();
    navigate('/signup');
}

  useEffect(() => {
    if (isAuthenticated) {
        console.log("User is authenticated");
        navigate('/content');
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [isAuthenticated]);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    login(username, password, email);
  }
  

  const loginFields = [
    {
        fieldName: "username",
        type: "text",
        value: username,
        name: 'username',
        id: 'usernameInput',
        onChange: (e) => setName(e.target.value),
        icon: <FaUserCircle style={{ fontSize: "25px", opacity: "0.8" }} />,
        require: true
    },
    {
        fieldName: "email",
        type: "email",
        value: email,
        name: 'email',
        id: 'emailInput',
        onChange: (e) => setEmail(e.target.value),
        icon: <IoIosMail style={{ fontSize: "25px", opacity: "0.8" }} />,
        require: true
    },
    {
        fieldName: "password",
        type: "password",
        value: password,
        name: 'password',
        id: 'passwordInput',
        onChange: (e) => setPassword(e.target.value),
        icon: <RiLockPasswordFill style={{ fontSize: "25px", opacity: "0.8" }} />,
        require: true
    }
];

  return (
   
    <div className="page">
      <GoBackArrow />
      <div style={{display: "flex", position : "absolute", top : "30px", left : "90%"}}><SignUpButton buttontext='Sign Up' onclick={signupRedirect}/></div>
      <div className="background"></div>
      <div className="login-container loginPage">
        <div className="login-container loginCard">
          <div className="titleContainer">
            <h1 id="login-title">Log in</h1>
            <hr/>
          </div>
          <div className="login-container form">
            <form onSubmit={handleLoginSubmit}>
              <div className="login-container userInputs">
                {loginFields.map((field, index) => (
                  <LoginField
                      key={index} // Use a unique key for each element
                      fieldName={field.fieldName}
                      type={field.type}
                      value={field.value}
                      name={field.name}
                      id={field.id}
                      onChange={field.onChange}
                      icon={field.icon}
                      require={field.require}
                  />
                ))}
                <div className={`loginErrorMessageContainer ${loginError ? '' : 'deActivated'}`}>
                  {loginMessage}
                </div>
                <button type="submit" className="submitButton">Log In</button>
              </div>
            </form>
            <div className='logoContainer'>
              <img src="/images/LOGO_HUG.png" alt="image" id="loginImage" />
              <span id="companyName">D E E P E R</span>
            </div>
          </div>
          <div className="or-separation">
            <hr/>
              <h1 id="or">or</h1>
            <hr/>
          </div>
          <div className="login-container signWith">
            
            <div className="companySign">
              <button id="google-button">
                <FcGoogle style={{fontSize:"20px"}}/>
                <span>Sign in with Google</span>
              </button>
            </div>
            <div className="companySign">
              <button id="facebook-button">
                <FaFacebook style={{color:"#0866ff",fontSize:"20px"}}/>
                <span>Sign in with Facebook</span>
              </button>
            </div>
            <div className="companySign">
              <button id="github-button">
                <FaGithub style={{color:"black",fontSize:"20px"}}/>
                <span>Sign in with Github</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default LoginForm;
