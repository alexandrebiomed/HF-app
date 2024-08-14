import "../styles/LoginField.scss";


function LoginField(props) {


    return (
        <div className="LoginField">
            <div style={{marginBottom:"5px"}}>
                <label >{props.fieldName}</label>
            </div>
            
            <div className="container inputLine">
                {props.icon}
                <input
                    type={props.type}
                    value={props.value}
                    onChange={props.onchange}
                    required={props.require} 
                />
            </div>
        </div>
    )
  }
  
  export default LoginField
  