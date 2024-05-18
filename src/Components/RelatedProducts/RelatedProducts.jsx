import React from "react";
import './RelatedProducts.css'
//import data_product from '../Assets/data'
import Item from "../item/Item";
import { useState } from "react";
import { useEffect } from "react";

const RelatedProducts = () => {

    const [data_product , setAll_Product] = useState([]);

    useEffect(() =>{
        const allproducts = `${process.env.REACT_APP_API_LINK}/allproducts`;
        fetch(allproducts)
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))
    },[])

    return(
        <div className="relatedproducts">
            <h1>Related Products</h1>
            <hr />
            <div className="relatedproduts-item">
            {data_product.slice(0, 4).map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}  />
            })}
            </div>
        </div>
    )
}

export default RelatedProducts;