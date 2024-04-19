import React, { useContext } from "react";
import './CartItems.css'
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../Assets/cart_cross_icon.png'
import { Link } from "react-router-dom";
import { useState } from "react";

//import { useSelector} from 'react-redux';

const CartItems = () => {

    const {getTotalCartAmount,all_product,  cartItems,RemoveFromCart} = useContext(ShopContext);
    //const user = useSelector((state) => state.auth);
    const [currency, setCurrency] = useState('eur');

    
    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
       
    };
    
    const handlecheckout = () => {
        
        //Object.entries(cartItems).forEach(([key, value]) => {
        //    if (value > 0) {
         //       console.log(`Element ${key} has a value of ${value}`);
        //        console.log(all_product)
        //    }     
    //});
    let productWithQuantityArray = []; 
    Object.entries(cartItems).forEach(([key, value]) => {
        if (value > 0) {
            all_product.forEach(product => {
                if (String(product.id) === key) {
                    let productWithQuantity = {...product, quantity: value, currency: currency};
                    
                    productWithQuantityArray.push(productWithQuantity);
                    
                    fetch(`${process.env.REACT_APP_API_LINK}/create-checkout-session`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            productWithQuantityArray,
                            //userId : user._id,
                        })
                    })
                    .then(response => response.json())
                    
                    .then(data => {
                        if(data.url){
                            console.log(data.url)
                            window.location.href=data.url;
                        }
                    })
                    .catch((error) => console.log(error.message));
                    
                    
                    
                   // console.log(productWithQuantity);
                }
            });
        }
    });
    
    
    }

    
    return(
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e)=>{
                if(cartItems[e.id]>0)
                {
                    return <div>
                    <div className="cartitems-format cartitems-format-main">
                        <img src={e.image} alt="" className="carticon-product-icon" />
                        <p>{e.name}</p>
                        <p>€{e.new_price}</p>
                        <button className="cartitems-quantity">{cartItems[e.id]}</button>
                        <p>€{e.new_price*cartItems[e.id]}</p>
                        <img className="cartitems-remove-icon" src={remove_icon} onClick={()=>{RemoveFromCart(e.id)}} alt="" />
                    </div>
                    <hr />
                </div>
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1> 
                    <label>
                 
                    
                <select value={currency} onChange={handleCurrencyChange}>
                    <option value="eur">Euro</option>
                    <option value="usd">USD (Currently Not Available)</option>
                </select>
                
            </label>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>€{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>€{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    
                    {localStorage.getItem('auth-token') !== null ? (
                    <Link to="/payment"><button onClick={handlecheckout}>Proceed To Checkout</button></Link>
                    ) : (
                    <button disabled>Proceed To Checkout</button>
                    )}
                </div>
                <div className="cartitems-promocode">
                    <p>Enter your promocode, if you have one</p>
                    
                    <div className="cartitems-promobox">
                    <input type="text" placeholder="Promo Code" />
                    {localStorage.getItem('auth-token') !== null ? (
                        <button onClick={() => alert("Event")}>Submit</button>
                    ) : (
                    <button disabled>Submit</button>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems;