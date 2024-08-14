import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
    const navigate = useNavigate();

    const loginRedirect = (event) => {
        event.preventDefault();
        navigate('/login');
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
                <div id="Me"><a href="/alexandrebernard">The Team</a></div>
            </div>
                <div className="loggers">
                    <form onSubmit={loginRedirect}>
                        <button className="login"  type="submit">Log In</button>
                    </form>
                    <form>
                        <button className="signup" type="submit">Sign Up</button>
                    </form>
                </div>
        </div>
      </>
    )
  }
  
  export default NavBar
  


    