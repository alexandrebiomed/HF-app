import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import LoginField from './LoginField';

import { FaUserCircle } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


import "../styles/SignUp&LoginForm.scss";

function SignUpForm() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const formData = { username:username, email:email, password:password };

    try{
      const res = await fetch('http://localhost:3000/signup', {
        method:'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      })

      const result = await res.json();
      if (result.validity){
        setError(false);
        navigate('/content');
      }
      else{
        setError(true)
      }
    }catch(error){
      console.error('Error submitting form:', error);
    }
    };

  return (
    <div className="page">
      <div className="login-container loginPage">
        <div className="login-container loginCard">
          <div className="titleContainer">
            <h1 id="login-title">Sign Up</h1>
            {error && <h6 className='loginErrorMessageActive'>Wrong Password or Username ! Try Again</h6>}
            <hr/>
          </div>
          <div className="login-container form">
            <form onSubmit={handleLoginSubmit}>
              <div className="login-container userInputs">
                  <LoginField
                  fieldName="username"
                  type="text"
                  value={username}
                  name='username'
                  id='usernameInput'
                  onChange={(e)=> setName(e.target.value)}
                  icon={<FaUserCircle style={{fontSize:"25px", opacity:"0.8"}}/>}
                  require={true} />
                  <LoginField
                  fieldName="email"
                  type="email"
                  value={email}
                  name='email'
                  id='emailInput'
                  onChange={(e)=> setEmail(e.target.value)}
                  icon={<IoIosMail style={{fontSize:"25px", opacity:"0.8"}}/>}
                  require={true} />
                  <LoginField
                  fieldName="password"
                  type="password"
                  value={password}
                  name='password'
                  id='passwordInput'
                  onChange={(e)=> setPassword(e.target.value)}
                  icon={<RiLockPasswordFill style={{fontSize:"25px", opacity:"0.8"}}/>}
                  require={true} />
                  <button type="submit" className="submitButton">Log in</button>
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
