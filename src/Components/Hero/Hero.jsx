import React from "react";
import './Hero.css'
//import hand_icon from '../Assets/hand_icon.png'
//import Arrow_icon from '../Assets/arrow.png'
import Arrow_icon from '../Assets/arrowDown.png'
const Hero = () => {
    return(
        <div className="hero">
            
            <div className="hero-left">
            
                <div>
                    <div className="hero-hand-icon">
                        
                        
                    </div>
                    
                </div>

            
                <div className="hero-lastest-btn">
                    <div>Latest Collections</div>
                    <img src={Arrow_icon} alt="" />
                </div>
                </div>
            
        </div>
    )
}

export default Hero;