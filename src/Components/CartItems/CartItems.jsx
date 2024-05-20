import React, { useContext } from "react";
import './CartItems.css'
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../Assets/cart_cross_icon.png'
//import { Link } from "react-router-dom";
import { useState } from "react";

//import { useSelector} from 'react-redux';

const CartItems = () => {

    const [country, setCountry] = useState('');
    //const [countrychosen, setcountrychosen] = useState(false);

  const handleCountryChange = async (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
    //console.log(country)
  }

    const {getTotalCartAmount,all_product,  cartItems,RemoveFromCart} = useContext(ShopContext);
    //const user = useSelector((state) => state.auth);
    const [currency, setCurrency] = useState('eur');

    
    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
       
    };
    
    const handlecheckout = () => {
        if(country === ""){
            //setcountrychosen(false)
            alert("Choose the country to be shipped")
        }
        else if(country!== ""){
            //setcountrychosen(true)
        
        

        

        
    
        let productWithQuantityArray = []; 
        let Totalweight = 0
        

        Object.entries(cartItems).forEach(([key, value]) => {
            if (value > 0) {
                all_product.forEach(product => {
                    if (String(product.id) === key) {
                        let productWithQuantity = {...product, quantity: value, currency: currency};
                        console.log(productWithQuantity)
                        
                        Totalweight = Totalweight + productWithQuantity.weight * productWithQuantity.quantity
                        
                        productWithQuantityArray.push(productWithQuantity);
                        
                        fetch(`${process.env.REACT_APP_API_LINK}/create-checkout-session`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                productWithQuantityArray,
                                Totalweight,
                                country,
                            })
                        })
                        .then(response => response.json())
                        
                        .then(data => {
                            if(data.url){
                                //console.log(data.url)
                                window.location.href=data.url;
                            }
                        })
                        .catch((error) => console.log(error.message));
                        
                    }
                    
                });

                
            }
            
    });
    
    //console.log("Total weight: "+ Totalweight)
    //        let weightKey = Totalweight + "kg";
    //        console.log(country)
    //        console.log("shipping price: "+ shippingFees[country][Totalweight])

    }
    
}


    const [isClicked, setIsClicked] = useState(false);
  
    const handleClick = (id) => {
      setIsClicked(true);
      RemoveFromCart(id);
      setTimeout(() => setIsClicked(false), 400); // Reset after the animation
    };

    
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
                        <img className={`cartitems-remove-icon ${isClicked ? 'icon-clicked' : ''}`} src={remove_icon} onClick={()=>{handleClick(e.id)}} alt="" />
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
            <form className="country-form">
      <label>
        
        <select value={country} onChange={handleCountryChange}>
          <option value="">Country For Shipping</option>
          <option value="Belgium">Belgium</option>
          <option value="Denmark">Denmark</option>
          <option value="Netherlands">Netherlands</option>
          <option value="Croatia">Croatia</option>
          <option value="Luxemburg">Luxemburg</option>
          <option value="Slovenia">Slovenia</option>
          <option value="Estonia">Estonia</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Latvia">Latvia</option>
          <option value="Romania">Romania</option>
          <option value="France">France</option>
          <option value="Italy">Italy</option>
          <option value="Bulgaria">Bulgaria</option>
          <option value="Finland">Finland</option>
          <option value="Ireland">Ireland</option>
          <option value="Germany">Germany</option>
          <option value="Hungary">Hungary</option>
          <option value="Poland">Poland</option>
          <option value="Portugal">Portugal</option>
          <option value="Greece">Greece</option>
          <option value="Spain">Spain</option>
          <option value="Sweden">Sweden</option>
          <option value="Austria">Austria</option>
          <option value="Czechia">Czechia</option>
          <option value="Slovakia">Slovakia</option>
        </select>
      </label>
      
    </form>
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
  <button onClick={handlecheckout}>Proceed To Checkout</button>
) : (
  <div style={{ position: 'relative' }}>
    <button disabled>Proceed To Checkout</button>
    <div style={{ 
      position: 'absolute', 
      top: '0', 
      left: '0', 
      right: '0', 
      bottom: '0', 
      cursor: 'not-allowed' 
    }} onClick={() => alert('You need to log in first')}></div>
  </div>
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