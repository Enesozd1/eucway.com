import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from '../Components/Offers/Offers';
import NewCollections from "../Components/NewCollections/NewCollections";
//import NewsLetter from "../Components/NewsLetter/NewsLetter";
import useScreenSize from "../Components/useScreenSize";
import Categories from "../Components/Categories/Categories"
const Shop = () => {
    return (
        <div>
            <Categories />
            {useScreenSize()<500?<Hero />:<></>}
            
            
            <Offers /> 
            
            {useScreenSize()>500? <Popular />:<></>}
        {useScreenSize()>500? <NewCollections />:<></>}
         
            
        </div>
        //Prev <Newsletter below newcollections
    )
}

export default Shop;