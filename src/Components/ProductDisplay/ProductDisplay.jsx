import React, { useContext } from "react";
import './ProductDisplay.css'
import { ShopContext } from "../../Context/ShopContext";
import { Link } from 'react-router-dom';
//import { useState } from "react";
import { useState } from "react";

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (id) => {
        addToCart(id);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 500); // Reset after the animation
    }

    return(
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image2} alt="" />
                    <img src={product.image3} alt="" />
                    <img src={product.image4} alt="" />
                    
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt=""/>
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-prices">
                    <div className="productdisplayright-price-old">
                    €{product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">€{product.new_price}</div>
                </div>
                <div className="productdisplay-right-description"> 
                <p>{product.description}</p>
                <div className="button-container">
                <button className={isAdded ? 'button-added' : ''} onClick={() => handleAddToCart(product.id)}>ADD TO CART</button>
                <Link to="/contactus" className="custom-order-link">Do you want a custom order?</Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay;