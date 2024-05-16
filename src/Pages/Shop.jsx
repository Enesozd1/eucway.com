import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from '../Components/Offers/Offers';
//import NewCollections from "../Components/NewCollections/NewCollections";
//import NewsLetter from "../Components/NewsLetter/NewsLetter";
//import useScreenSize from "../Components/useScreenSize";
import Categories from "../Components/Categories/Categories"
const Shop = () => {
    return (
        <div>
            <Hero />
            <Categories />
            
            
            
            
            <Offers /> 
            <Popular />
            
            
            
         
            
        </div>
        //Prev <Newsletter below newcollections
    )
}

export default Shop;