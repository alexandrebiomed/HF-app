import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import LoginField from './LoginField';

import { FaUserCircle } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import axios from 'axios';


import "../styles/SignUp&LoginForm.scss";

function LoginForm() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const formData = { username:username, email:email, password:password };

    try{
      const response = await axios.post('http://localhost:3000/login', formData, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true // Include this if you're working with cookies or sessions
      });

      const result = response.data; // Axios automatically parses JSON
      if (result.validity){
        setError(false);
        navigate('/content');
      }
      else{
        setError(true)
      }
    }catch(error){
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
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
      <div className="login-container loginPage">
        <div className="login-container loginCard">
          <div className="titleContainer">
            <h1 id="login-title">Log in</h1>
            {error && <h6 className='loginErrorMessageActive'>Wrong Password or Username ! Try Again</h6>}
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

export default LoginForm;
