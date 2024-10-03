import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Team from './Components/Team';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import Content from './Components/Content';
import NavBar from './Components/NavBar';

import AuthProvider from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {

  return (
    <Router>
      <div>
        <Routes>
         
          <Route path="/" element={
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
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

            <Route path="/login" element={
              <AuthProvider>
                <LoginForm />
              </AuthProvider>}
            />

            <Route path="/signup" element={
              <AuthProvider>
                <SignUpForm />
              </AuthProvider>}
            />

            <Route path="/content" element={
              <AuthProvider>
                <ProtectedRoute  element = {<Content />} />
              </AuthProvider>}
            />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
