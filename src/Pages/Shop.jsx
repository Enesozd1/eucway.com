import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from '../Components/Offers/Offers';
//import NewCollections from "../Components/NewCollections/NewCollections";
//import NewsLetter from "../Components/NewsLetter/NewsLetter";
//import useScreenSize from "../Components/useScreenSize";
import Categories from "../Components/Categories/Categories"
import { useState } from "react";
const Shop = () => {
   
    const [isLoading, setIsLoading] = useState(true);

    const allproducUrl = `${process.env.REACT_APP_API_LINK}/allproducts`;
    fetch(allproducUrl)
        .then((response)=>response.json())
        .then((data)=>{

            
            setIsLoading(false);
            })
    
    return (


        <div>
        {isLoading? 
            
            <div className="loading-screen">
              <h1>Loading... Please Wait</h1>
              <div className="loader">      
              </div>
            </div>
          :
            <></>
          }
          
        <div>
            <Hero />
            <Categories />
            
            
            
            
            <Offers /> 
            <Popular />
            
            
            
         
            
        </div>
        </div>
        //Prev <Newsletter below newcollections
        
    )
    
}

export default Shop;