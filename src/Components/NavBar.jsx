import { useNavigate, useLocation } from "react-router-dom";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";
import CompanyLogo from './CompanyLogo'
import "../styles/NavBar.scss";

function NavBar() {
    const location = useLocation(); // Get current location

    const navigate = useNavigate();

    const loginRedirect = (event) => {
        event.preventDefault();
        navigate('/login');
    }

    const signupRedirect = (event) => {
        event.preventDefault();
        navigate('/signup');
    }

    return (
      <div className="navbar container">
          <div className="navbarLogo">
             <a href="/"> <CompanyLogo companyName="DEEPER" companySlogan="BUILD REAL HUMAN INTERACTION"/> </a>
          </div>
          

          <div className="navigators">
              <div className={location.pathname === '/' ? 'active' : ''} id="Home"><a href="/">Home</a></div>
              <div className={location.pathname === '/about' ? 'active' : ''} id="About"><a href="/about">About</a></div>
              <div className={location.pathname === '/contact' ? 'active' : ''} id="Contact Us"><a href="/contact">Contact Us</a></div>
              <div className={location.pathname === '/team' ? 'active' : ''} id="Me"><a href="/team">The Team</a></div>
          </div>
          <div className="loggers">
              <LoginButton buttontext="Log In" onclick={loginRedirect}/>
              <SignUpButton buttontext="Sign Up" onclick={signupRedirect}/>
          </div>
      </div>
    );
}

export default NavBar;