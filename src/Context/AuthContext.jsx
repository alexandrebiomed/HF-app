import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

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

          switch (response.status) {
              case 200:
                setLoginError(false);
                setLoginMessage(response.data.info.message);
                setIsAuthenticated(true);
                setUser(response.data.user);
                break;
              case 401:
                setLoginError(true);
                setLoginMessage(response.data.message);
                setIsAuthenticated(false);
                setUser(null);
                break;
              case 500:
                setLoginError(true);
                setLoginMessage(response.data.message);
                setIsAuthenticated(false);
                setUser(null);
                break;
          }

        }
        catch(error){
          console.error('Error submitting form:', error);
          // Check if the error has a response from the server
          if (error.response) {
              // The request was made and the server responded with a status code outside of the 2xx range
              setLoginMessage(error.response.data.message);
          }
          setLoginError(true);
        }
    }

    const logout = () => {setIsAuthenticated(false)}
    //! REMOVE setIsAuthenticated from the context for security ???
    return (
        <AuthContext.Provider value={
          {isAuthenticated, setIsAuthenticated, user, // Authentication & User
          loginError, loginMessage, login, // Login
          logout} // Logout
          }> 
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensures children are required
};

export {AuthContext};

export default AuthProvider; 