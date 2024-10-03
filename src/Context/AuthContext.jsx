import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');


    const login = async (username, password, email) => {
        const formData = { username:username, password:password, email:email };
    
        try{
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true // Include this if you're working with cookies or sessions
          });
          console.log("IS THE USER AUTHENTICATED ? : ", isAuthenticated);
          switch (response.status) {
              case 200:
                setLoginError(false);
                setLoginMessage(response.data.info.message);
                setIsAuthenticated(true);
                break;
              case 401:
                setLoginError(true);
                setLoginMessage(response.data.message);
                setIsAuthenticated(false);
                break;
              case 500:
                setLoginError(true);
                setLoginMessage(response.data.message);
                setIsAuthenticated(false);
                break;
          }
          console.log("IS THE USER AUTHENTICATED ? : ", isAuthenticated);
        }catch(error){
          console.error('Error submitting form:', error);
          // Check if the error has a response from the server
          if (error.response) {
              // The request was made and the server responded with a status code outside of the 2xx range
              setLoginMessage(error.response.data.message);
          }
          setLoginError(true);
        }
      }

    return (
        <AuthContext.Provider value={{isAuthenticated, loginError, loginMessage, login}}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensures children are required
};

export {AuthContext};

export default AuthProvider; 