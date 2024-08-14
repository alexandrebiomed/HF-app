import React, { useState } from 'react';
import LoginField from './LoginField';

import { FaUserCircle } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


import "../styles/LoginForm.scss";

function LoginForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = { name, email, password };

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setResponse(result.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponse('There was an error submitting the form.');
    }
  };

  return (
    <div className="page">
      <div className="login-container loginPage">
        <div className="login-container loginCard">
          <div className="titleContainer">
            <h1 id="login-title">Log in</h1>
            <hr/>
          </div>
          <div className="login-container form">
            <form onSubmit={handleSubmit}>
              <div className="login-container userInputs">
                  <LoginField
                  fieldName="username"
                  type="text"
                  value={name}
                  onchange={(e)=> setName(e.target.value)}
                  icon={<FaUserCircle style={{fontSize:"25px"}}/>}
                  require={true} />
                  <LoginField
                  fieldName="email"
                  type="email"
                  value={email}
                  onchange={(e)=> setEmail(e.target.value)}
                  icon={<IoIosMail style={{fontSize:"25px"}}/>}
                  require={true} />
                  <LoginField
                  fieldName="password"
                  type="password"
                  value={password}
                  onchange={(e)=> setPassword(e.target.value)}
                  icon={<RiLockPasswordFill style={{fontSize:"25px"}}/>}
                  require={true} />  
                  <button type="submit" className="submitButton">Log in</button>
              </div>
            </form>
            <img src="../../public/images/logo2RB.png" alt="image" id="loginImage" />
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
