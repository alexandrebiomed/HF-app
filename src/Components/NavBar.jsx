import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
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
      <>
        <div className="navbar container">
            <div className="logo companyName">
                <img src="images/logo2.png" alt="FamilyBlog logo" id="logo" />
                <a href="/" id="familyblog">HappyFamily</a>
            </div>

            <div className="navigators">
                <div id="Home"><a href="/">Home</a></div>
                <div id="About"><a href="/about">About</a></div>
                <div id="Contact Us"><a href="/contact">Contact Us</a></div>
                <div id="Me"><a href="/team">The Team</a></div>
            </div>
                <div className="loggers">
                    <button className="login" onClick={loginRedirect} type="submit">Log In</button>
                    <button className="signup" onClick={signupRedirect} type="submit">Sign Up</button>
                </div>
        </div>
      </>
    )
  }
  
  export default NavBar
  


    