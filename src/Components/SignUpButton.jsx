import PropTypes from 'prop-types';
import "../styles/SignUpButton.scss";

function SignUpButton({buttontext, onclick}) {

    

    return (
      <>
        <button className="signup" onClick={onclick}>{buttontext}</button>
      </>
    )
  }
  
  SignUpButton.propTypes = {
    buttontext:PropTypes.string.isRequired,
    onclick:PropTypes.func.isRequired,
  
  };

  export default SignUpButton
  


    