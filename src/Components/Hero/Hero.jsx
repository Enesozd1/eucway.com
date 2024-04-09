import React from "react";
import './Hero.css'
//import hand_icon from '../Assets/hand_icon.png'
//import Arrow_icon from '../Assets/arrow.png'
import Arrow_icon from '../Assets/arrowDown.png'
import { useState } from "react";
import NewCollections from "../NewCollections/NewCollections";
import { useEffect } from "react";
const Hero = () => {
    const [imageClicked, setImageClicked] = useState(false);
    
      // Function to handle button clicks
      const onClickHandler = () => {
       
        setImageClicked((prevState) => !prevState); // Toggle the boolean value
        
      };

      const useScreenSize = () => {
        const [screenSize, setScreenSize] = useState({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      
        useEffect(() => {
          const handleResize = () => {
            setScreenSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });
          };
      
          window.addEventListener('resize', handleResize);
      
          // Clean up the event listener when the component unmounts
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }, []);
      
        return screenSize.width;
      };
      

     //console.log(useScreenSize())

      
    return(
        <div className="hero">
            
           {useScreenSize()>500? <NewCollections /> : <></>}

            
                <div className={`hero-lastest-btn ${imageClicked ? 'open' : ''}`}>
                    <div>Latest Collections</div>
                    <img src={Arrow_icon} alt="" onClick={onClickHandler}/>
                </div>
                <div className="conditionalRender"> 
                {imageClicked === true && <NewCollections />}
                {/* Other components */}
                </div>

                
            
        </div>
    )
}

export default Hero;