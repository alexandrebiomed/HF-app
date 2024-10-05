import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

import LoginField from './LoginField';
import GoBackArrow from './GoBackArrow';
import LoginButton from "./LoginButton";

import { FaUserCircle } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import axios from 'axios';


import useAuth from "../Context/useAuth";

import "../styles/SignUp&LoginForm.scss";
import "../styles/GoBackArrow.scss";

function SignUpForm() {
  
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, setUser} = useAuth();

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpError, setSignUpError] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState('');

  const loginRedirect = (event) => {
    event.preventDefault();
    navigate('/login');
}
  
  useEffect(() => {
    if (isAuthenticated) {
        console.log("User is authenticated");
        navigate('/content');
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [isAuthenticated]);

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    const formData = { username:username, email:email, password:password };

    try{
      const response = await axios.post('http://localhost:3000/signup', formData, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true // Include this if you're working with cookies or sessions
      });

      switch(response.status) {
        case 201:
          setIsAuthenticated(true);
          setUser(response.data.userId);
          setSignUpError(false);
          setSignUpMessage(response.data.message);
          break;
        case 409:
          setIsAuthenticated(false);
          setUser(null);
          setSignUpError(true);
          setSignUpMessage(response.data.message);
          break;
        case 500:
          setIsAuthenticated(false);
          setUser(null);
          setSignUpError(true);
          setSignUpMessage(response.data.message);
          break;
      }
    }
    catch(error){
      console.error('Error submitting form:', error);
      // Check if the error has a response from the server
      if (error.response) {
          // The request was made and the server responded with a status code outside of the 2xx range
          setSignUpMessage(error.response.data.message);
      }
      setSignUpError(true);
    }
    };

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
    <div style={{display: "flex", position : "absolute", top : "30px", left : "90%"}}><LoginButton buttontext='Log In' onclick={loginRedirect}/></div>
    <div className="background"></div>
    <div className="login-container loginPage">
      <div className="login-container loginCard">
        <div className="titleContainer">
          <h1 id="login-title">Sign Up</h1>
          <hr/>
        </div>
        <div className="login-container form">
          <form onSubmit={handleSignUpSubmit}>
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
              <div className={`loginErrorMessageContainer ${signUpError ? '' : 'deActivated'}`}>
                {signUpMessage}
              </div>
              <button type="submit" className="submitButton">Sign Up</button>
            </div>
          </form>
          <img src="/images/logo2RB.png" alt="image" id="loginImage" />
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

export default SignUpForm;
