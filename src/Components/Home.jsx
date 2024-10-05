import {useState, useRef} from 'react';

import "../styles/Home.scss";

const Home = () => {

    const images = {
        image1 : {initial : "../../public/images/FamillyDALLE.png", mouseDown : "../../public/images/handChat.png"},
        image2 : {initial : "../../public/images/FamillyDALLE2.png", mouseDown : "../../public/images/handChat.png"},
        image3 : {initial : "../../public/images/FamillyDALLE3.png", mouseDown : "../../public/images/handChat.png"}
    }

    const [imageSrc, setImageSrc] = useState({image1 : images.image1.initial, image2 : images.image2.initial, image3 : images.image3.initial});
    const [canClick, setCanClick] = useState(true);
    const [isClicked, setisClicked] = useState(false);
    const [isOutAble, setisOutAble] = useState(false);
    const imgRefs = useRef({}); 
    let timer;

    const handleMouseUp = (image) => {
        
        if (imgRefs.current[image] && canClick && !isClicked) {
            setisOutAble(prev => !prev);
            console.log("ON MOUSE UP");
            clearTimeout(timer);
            setTimeout(() => setImageSrc((prevImageSrc) => ({...prevImageSrc, [image] : images[image].mouseDown,})), 100);
            imgRefs.current[image].style.transform = 'rotateY(180deg) scaleX(-1)';
            imgRefs.current[image].style.transition = 'transform 0.5s'; // Optional for smooth transition
            setCanClick(prev => !prev);
            setisClicked(prev => !prev);
            setisOutAble(prev => !prev);
        }      
    
    };

    const handleMouseOver = (image) => {
        
        if (imgRefs.current[image]) {
            setisOutAble(true);
            console.log("ON MOUSE ENTER");
            imgRefs.current[image].style.filter = 'drop-shadow(0 0 10px rgba(0, 123, 255, 0.8))';
            imgRefs.current[image].style.transform = 'scale(1.03)';
            imgRefs.current[image].style.transition = 'transform 0.5s ease-out'; // Optional for smooth transition
        }    
    }

    const handleMouseOut = (image) => {
        setisOutAble(false);
        if (imgRefs.current[image]) {
            if (isClicked) {
                console.log("ON MOUSE OUT WITH CLICKED");
                setTimeout(() => setImageSrc((prevImageSrc) => ({...prevImageSrc, [image] : images[image].initial,})), 100);
                imgRefs.current[image].style.transform =  'scale(1) scaleX(1)';
                imgRefs.current[image].style.transition = 'transform 0.5s';
                timer = setTimeout(() => {setCanClick(prev => !prev);}, 500);
            }else {
                console.log("ON MOUSE OUT WITHOUT CLICKED");
                imgRefs.current[image].style.transform = 'scale(1)';
                imgRefs.current[image].style.transition = 'transform 0.5s';
            }
            imgRefs.current[image].style.filter = 'none';
            setisClicked(false);
            
            
        }
    };

    
    
    return (
        <div className="home-container home"> 
            <section>
                <div className="section1 home-container">
                    <div className="text section1">
                        <div style={{display : "flex", wrap : "no-wrap", alignItems : "center"}}>
                            <h1> Amity, </h1>
                            <h2> &nbsp;strengthen family bonds</h2>
                        </div>
                        <p >
                            Create a supportive and harmonious environment where everyone feels valued.
                            By fostering kindness, open communication, and mutual respect, family members
                            build strong bonds that strengthen relationships and enhance collective happiness.
                            <br /><br />
                            Amity ensures that each member contributes to a loving and cohesive family unit,
                            making it a source of strength and joy.
                        </p>
                    </div>
                    <div className={"image section1"}  >
                        <img
                            ref={(el) => imgRefs.current["image1"] = el}
                            src={imageSrc["image1"]}
                            onMouseUp={() => handleMouseUp("image1")}
                            onMouseOver={() => handleMouseOver("image1")}
                            onMouseOut={isOutAble ? () => handleMouseOut("image1") :  ()=>{}}
                            alt="image"
                            id="imageSection1" />
                    </div>
                </div>
            </section>

            <br />
            <hr id="hr1" className="hr-scrollable" />

            <section>
                <div className="section2 home-container">
                    <div className="image section2" >
                        <img
                            ref={(el) => imgRefs.current["image2"] = el}
                            src={imageSrc["image2"]}
                            onMouseUp={() => handleMouseUp("image2")}
                            onMouseOver={() => handleMouseOver("image2")}
                            onMouseOut={isOutAble ? () => handleMouseOut("image2") :  ()=>{}}
                            alt="image"
                            id="imageSection2" />
                    </div>
                    <div className="text section2">
                        <div style={{display : "flex", wrap : "no-wrap", alignItems : "center"}}>
                            <h1> Belonging, </h1>
                            <h2> &nbsp;feel like you belong</h2>
                        </div>
                        <p style={{ textAlign: 'justify', lineHeight: '25px' }}>
                            Feel deeply connected and valued by those around you.
                            Each member&apos;s presence and contributions foster emotional
                            security and acceptance, creating a foundation of love and support.
                        </p>
                        <p>
                            Nurture confidence and well-being, knowing that you are always
                            part of a team that stands together through life&apos;s ups and downs.
                        </p>
                    </div>
                </div>
            </section>

            <br />
            <hr id="hr2" className="hr-scrollable" />

            <section>
                <div className="section3 home-container">
                    <div className="text section3">
                        <div style={{display : "flex", wrap : "no-wrap", alignItems : "center"}}>
                            <h1> Connection, </h1>
                            <h2> &nbsp;a connected family is a happy one</h2>
                        </div>
                        <p style={{ textAlign: 'justify', lineHeight: '25px' }}>
                            At <i>HappyFamily</i> we believe that no matter how far you are from your family,
                            harvesting deep relationships and sharing your adventure should be accessible,
                            fun, convenient, and bring you love.
                            <br /><br />
                            Write private blogs that only you and your family will be able to see, edit, and comment.
                        </p>
                    </div>
                    <div className="image section3">
                    <img
                        ref={(el) => imgRefs.current["image3"] = el}
                        src={imageSrc["image3"]}
                        onMouseUp={() => handleMouseUp("image3")}
                        onMouseOver={() => handleMouseOver("image3")}
                        onMouseOut={isOutAble ? () => handleMouseOut("image3") :  ()=>{}}
                        alt="image"
                        id="imageSection3" />
                    </div>
                </div>
            </section>

            <br />
            <hr id="hr3" className="hr-scrollable" />

            <footer>
                <div className="footer home-container">
                    <p>
                        Copyright - All Rights Reserved - HappyFamily
                    </p>
                </div>
            </footer>

            <br />
            <br />
            <br />
            <br />
            <br />

        </div>
    );
};

export default Home;
