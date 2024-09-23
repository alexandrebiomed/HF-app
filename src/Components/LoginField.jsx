import PropTypes from 'prop-types';
import "../styles/LoginField.scss";


function LoginField(props) {


    return (
        <div className="LoginField">
            <div style={{marginBottom:"5px"}}>
                <label htmlFor={props.id} >{props.fieldName}</label>
            </div>
            
            <div className="container inputLine">
                {props.icon}
                <input
                    type={props.type}
                    id={props.id}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    required={props.require} 
                />
            </div>
        </div>
    )
  }

LoginField.propTypes = {
    fieldName:PropTypes.string.isRequired,
    icon:PropTypes.element.isRequired,
    type:PropTypes.string.isRequired,
    id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    require:PropTypes.bool.isRequired,
  };
    
  
  
  export default LoginField
  