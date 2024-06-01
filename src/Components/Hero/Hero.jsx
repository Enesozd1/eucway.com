import React from "react";
import './Hero.css'
//import hand_icon from '../Assets/hand_icon.png'
//import Arrow_icon from '../Assets/arrow.png'
//import Arrow_icon from '../Assets/arrowDown.png'
//import { useState } from "react";
//import NewCollections from "../NewCollections/NewCollections";
import { Link } from "react-router-dom";
const Hero = () => {
    //const [imageClicked, setImageClicked] = useState(false);
    
      // Function to handle button clicks
      //const onClickHandler = () => {
       
        //setImageClicked((prevState) => !prevState); // Toggle the boolean value
        
      //};

      
      

     

      
    return(
        <div className="hero">
            
           

            <div className="containers">
            <p>Check out The Latest Products</p>
            <Link to="/newproducts" ><button className="btn">Latest Collections</button></Link>
            </div>
                {/*<div className={`hero-lastest-btn ${imageClicked ? 'open' : ''}`}>
                    <div>Latest Collections</div>
                    <Link to="/newproducts" > <img src={Arrow_icon} alt="" onClick={onClickHandler}/></Link> 
                </div>
                <div className="conditionalRender"> 
                {imageClicked === true && <NewCollections />}
                
                </div> */}

                
            
        </div>
    )
}

export default Hero;