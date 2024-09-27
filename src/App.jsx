import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Team from './Components/Team';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import Content from './Components/Content';
import NavBar from './Components/NavBar';

import {useState, useEffect} from "react";
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

   // Check authentication status on component mount
   useEffect(() => {
    const checkAuth = async () => {
        try {
            const response = await axios.get('/auth/status');
            setIsAuthenticated(response.data.authenticated);
            setUser(response.data.user);
        } catch (error) {
            console.error('Error checking authentication status:', error);
        }
    };
    checkAuth();
}, []);

  return (
    <Router>
      <div>
        <Routes>
         
          <Route path="/" element={
            <div style={{display:"flex",flexDirection:"column",justifyContent:"Center",alignItems:"center"}}>
              <NavBar />
              <Home />
            </div>
          }/>

          <Route path="/about" element={
            <div>
              <NavBar />
              <About />
            </div>
          }/>

          <Route path="/contact" element={
            <div>
              <NavBar />
              <Contact />
            </div>
          }/>

          <Route path="/team" element={
            <div>
              <NavBar />
              <Team />
            </div>
          }/>

          <Route path="/login" element={<LoginForm />}/>

          <Route path="/signup" element={<SignUpForm />}/>

          <Route path="/content">
            {isAuthenticated ? <Content user={user}/> : <Redirect to="/login" /> }
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
