import React, { useContext } from "react";
import './CSS/ShopCategory.css';
import { ShopContext } from "../Context/ShopContext";
//import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/item/Item'

const ShopCategory = (props) => {
    

    const{all_product} = useContext(ShopContext)
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return(
        <div className="shop-category">
            {/*<img className="shopcategory-banner" src={props.banner} alt=""/> */}
            <h1>
    {props.category === "accessories" 
      ? capitalizeFirstLetter(props.category) 
      : `${capitalizeFirstLetter(props.category)} Models`}
  </h1>

            <div className="shopcategory-indexSort">
                
                
            </div>
            <div className="shopcategory-products">
                {all_product.map((item,i) =>{
                    if (props.category === item.category){
                        
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}  />
                    }
                    else{
                        return null;
                    }
                })}
            </div>
        </div>
    )
}

export default ShopCategory;