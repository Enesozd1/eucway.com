import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from '../Components/Offers/Offers';
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import useScreenSize from "../Components/useScreenSize";
const Shop = () => {
    return (
        <div>
            {useScreenSize()<500?<Hero />:<></>}
            
            <Popular />
            <Offers />
        
        {useScreenSize()>500? <NewCollections />:<></>}
         
            <NewsLetter />
        </div>
    )
}

export default Shop;