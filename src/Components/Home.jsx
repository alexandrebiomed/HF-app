import {useState, useEffect, useRef} from 'react';

import "../styles/Home.scss";

const Home = () => {

    const images = {
        image1 : {initial : "../../public/images/FamillyDALLE.png", mouseDown : "../../public/images/handChat.png"},
        image2 : {initial : "../../public/images/FamillyDALLE2.png", mouseDown : "../../public/images/handChat.png"},
        image3 : {initial : "../../public/images/FamillyDALLE3.png", mouseDown : "../../public/images/handChat.png"}
    }

    const [imageSrc, setImageSrc] = useState({image1 : images.image1.initial, image2 : images.image2.initial, image3 : images.image3.initial});
    const [canClick, setCanClick] = useState({image1 : true, image2 : true, image3 : true});
    const [isClicked, setisClicked] = useState({image1 : false, image2 : false, image3 : false});
    const [isAnimating, setisAnimating] = useState({image1 : false, image2 : false, image3 : false});
    const imgRefs = useRef({}); 
    const timerRef = useRef(null);
    console.log(import.meta.env.MODE);


    const handleMouseUp = (image) => {
        
        if (imgRefs.current[image] && canClick[image] && !isClicked[image] && !isAnimating[image]) {
            clearTimeout(timerRef.current); // Ensure timer is cleared
    
            // Set the image source and styles in a single update
            setImageSrc(prevImageSrc => ({
                ...prevImageSrc,
                [image]: images[image].mouseDown,
            }));
            
            imgRefs.current[image].style.transform = 'rotateY(180deg) scaleX(-1)';
            imgRefs.current[image].style.transition = 'transform 0.5s'; // Optional for smooth transition
            
            // Update multiple states in one go
            setCanClick(prevCanClick => ({
                ...prevCanClick,
                [image]: false,
            }));
            setisClicked(prevIsClicked => ({
                ...prevIsClicked,
                [image]: true,
            }));
            setisAnimating(prevIsAnimating => ({
                ...prevIsAnimating,
                [image]: true,
            }));
    
            // If you want to reset the animation state after some time, use a timer
            timerRef.current = setTimeout(() => {
                setisAnimating(prevIsAnimating => ({
                    ...prevIsAnimating,
                    [image]: false,
                }));
            }, 500); // Duration should match your animation time
        }
    };
    

    const handleMouseOver = (image) => {
        
        if (imgRefs.current[image] && !isClicked[image]) {

            imgRefs.current[image].style.filter = 'drop-shadow(0 0 10px rgba(0, 123, 255, 0.8))';
            imgRefs.current[image].style.transform = 'scale(1.03)';
            imgRefs.current[image].style.transition = 'transform 0.5s ease-out'; // Optional for smooth transition
            
        }    
    }

    const handleMouseLeave = (image) => {
        
        if (imgRefs.current[image] && !isAnimating[image]) {
            if (isClicked) {
                setTimeout(() => setImageSrc(prevImageSrc => ({
                    ...prevImageSrc,
                    [image]: images[image].initial,
                })), 100);
                imgRefs.current[image].style.transform =  'scale(1) scaleX(1)';
                imgRefs.current[image].style.transition = 'transform 0.5s';
                timerRef.current = setTimeout(() => {setCanClick(prevCanClick => ({
                    ...prevCanClick,
                    [image]: true,
                }));}, 500);
                setisClicked(prevIsClicked => ({
                    ...prevIsClicked,
                    [image]: false,
                }));
            }else {
                imgRefs.current[image].style.transform = 'scale(1)';
                imgRefs.current[image].style.transition = 'transform 0.5s';
            }
            imgRefs.current[image].style.filter = 'none';
            
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    
    
    return (
        <div className="home">
            <div className='home-background'></div>
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
                            onMouseEnter={() => handleMouseOver("image1")}
                            onMouseLeave={() => handleMouseLeave("image1")}
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
                            onMouseLeave={() => handleMouseLeave("image2")}
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
                        onMouseLeave={() => handleMouseLeave("image3")}
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
