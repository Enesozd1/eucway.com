import React, { useEffect, useState } from "react";
import './NewCollections.css'
//import new_collection from '../Assets/new_collections'
import Item from "../item/Item";

const NewCollections = () => {
    const [new_collection, setNew_Collection] = useState([]);

    useEffect(()=>{
        fetch('newcollections')
        .then((response)=>response.json())
        .then((data)=>setNew_Collection(data));
    },[])
    return(
        <div className="new-collections">
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