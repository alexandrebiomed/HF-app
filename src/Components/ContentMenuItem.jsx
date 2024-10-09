import PropTypes from 'prop-types';
import "../styles/LoginButton.scss";

function ContentMenuItem({text, onclick}) {

    return (
      <>
        <button className="menuItem" onClick={onclick}>{text}</button>
      </>
    )
  }
  
  ContentMenuItem.propTypes = {
    text:PropTypes.string.isRequired,
    onclick:PropTypes.func.isRequired,
  
};

  export default ContentMenuItem
  


    