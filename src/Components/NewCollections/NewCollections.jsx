import React, { useEffect, useState } from "react";
import './NewCollections.css'
//import new_collection from '../Assets/new_collections'
import Item from "../item/Item";
import LoadingScreen from "../../Pages/LoadingScreen";



const NewCollections = () => {
    const [new_collection, setNew_Collection] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        const newcollectionUrl = `${process.env.REACT_APP_API_LINK}/newcollections`;
        fetch(newcollectionUrl)
        .then((response)=>response.json())
        .then((data)=>{
            setNew_Collection(data)
            setIsLoading(false);

    });
    },[])

    if(isLoading){
        <LoadingScreen />
    }
    
    
    return(

        
        <div className={"new-collections-Mobile"}>
            <h1>Recent Uploads</h1>
            <hr />
            <div className="collections">
                {new_collection.map((item,i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}  />
                })}
            </div>
        </div>
    )
}

export default NewCollections;