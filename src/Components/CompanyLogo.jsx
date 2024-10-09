import PropTypes from 'prop-types';
import "../styles/CompanyLogo.scss";
//function CompanyLogo({companyName, companySlogan}) {
//
//
//
//    return (
//        <div className="logo-container">
//            <img src="../../public/images/LOGO_IMAGE.png" id="logo-image" />
//            <div className="textLogo">
//                <p id="company-name">{companyName}</p>
//                <p id="company-slogan">{companySlogan}</p>
//            </div>
//        </div>
//    )
//  }

const CompanyLogo = ({companyName, companySlogan, sizeFactor}) => {
    const defaultWidth = 350;
    const defaultHeight = 150;
    
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={sizeFactor ? defaultWidth*sizeFactor : defaultWidth}
            height={sizeFactor ? defaultHeight*sizeFactor : defaultHeight} 
            viewBox={`0 0 ${defaultWidth} ${defaultHeight}`}
            style={{overflow: 'hidden'}}
            >

            <rect width="100%" height="100%" fill="transparent" />

        
            <image
                className='logoImage'
                href="public/images/LOGO_IMAGE.png" 
                width="350"  
                x="-1%" 
                y="15%"
            />

            <text
                className='companyName'
                x="30%"
                y="55%" 
                fontFamily="'EB Garamond', serif" 
                fontSize="32" 
                fill="black" 
                letterSpacing="12"
            >
                {companyName}
            </text>

        
            <text
                className='companySlogan'
                x="30%" 
                y="65%" 
                fontFamily="'EB Garamond', serif" 
                fontSize="12" 
                fill="black" 
                letterSpacing="1.3"
            >
                {companySlogan}
            </text>
        </svg>
    )
}
    

CompanyLogo.propTypes = {
    companyName:PropTypes.string.isRequired,
    companySlogan:PropTypes.string.isRequired,
    sizeFactor:PropTypes.string,
  };
  
export default CompanyLogo
  


    