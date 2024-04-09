import React from "react";
import './Hero.css'
//import hand_icon from '../Assets/hand_icon.png'
//import Arrow_icon from '../Assets/arrow.png'
import Arrow_icon from '../Assets/arrowDown.png'
import { useState } from "react";
import NewCollections from "../NewCollections/NewCollections";

const Hero = () => {
    const [imageClicked, setImageClicked] = useState(false);
    
      // Function to handle button clicks
      const onClickHandler = () => {
       
        setImageClicked((prevState) => !prevState); // Toggle the boolean value
        
      };

      
      

     //console.log(useScreenSize())

      
    return(
        <div className="hero">
            
           

            
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