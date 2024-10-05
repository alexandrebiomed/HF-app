import PropTypes from 'prop-types';
import "../styles/LoginButton.scss";

function LoginButton({buttontext, onclick}) {

    return (
      <>
        <button className="login" onClick={onclick}>{buttontext}</button>
      </>
    )
  }
  
  LoginButton.propTypes = {
    buttontext:PropTypes.string.isRequired,
    onclick:PropTypes.func.isRequired,
  
};

  export default LoginButton
  


    