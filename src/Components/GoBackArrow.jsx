import { FaArrowCircleLeft } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';


function GoBackArrow() {

    const navigate = useNavigate();

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
      <>
        <div className="goBackArrow">
            <button className="goBackButton" onClick={handleGoBack}>
                <FaArrowCircleLeft className="goBackIcon"/>
            </button>
        </div>
      </>
    )
  }
  
  export default GoBackArrow
  


    