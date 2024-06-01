import React, { createContext, useEffect, useState } from "react";


export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart ={};
    for (let index=0; index< 100+ 1; index++){
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([]);

    const [cartItems, setCartItems] = useState(getDefaultCart());
    //const [Pavailable, setPavailable] = useState(true)
    
    useEffect(() =>{
        
        const allproducUrl = `${process.env.REACT_APP_API_LINK}/allproducts`;
        const getcartUrl = `${process.env.REACT_APP_API_LINK}/getcart`;
        
        fetch(allproducUrl)
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch(getcartUrl, {
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',

                },
                body:"",
            }).then((response) => response.json())
            .then((data)=>setCartItems(data));
        }
    },[])
    
   
    const addToCart = (itemId) => {
        
        //const productMap = new Map(all_product.map(product => [String(product.id), product]));
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId] +1}));
        const addtocartUrl = `${process.env.REACT_APP_API_LINK}/addtocart`;
        //Object.entries(cartItems).forEach(([key, value]) => {
        //    if (value > 0) {
        //        const product = productMap.get(key);
                
        //        if (product.id===itemId) {
        //            if(product.available){
        //                setCartItems((prev) => ({...prev,[itemId]:prev[itemId] +1}));
                        //setPavailable(true)
        //            }
        //            else if(product.available===false)
        //            alert("This Product is not currently available")
       //         }
        //    }
        //});
       
        if(localStorage.getItem('auth-token')){
            fetch(addtocartUrl,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',

                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const RemoveFromCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId] -1}));
        const removecartUrl = `${process.env.REACT_APP_API_LINK}/removefromcart`;
        if(localStorage.getItem('auth-token')){
            if(localStorage.getItem('auth-token')){
                fetch(removecartUrl,{
                    method:'POST',
                    headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json',

                    },
                    body:JSON.stringify({"itemId":itemId}),
                })
                .then((response)=>response.json())
                .then((data)=>console.log(data));
            }
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
            
        }
        return totalAmount;
    }
    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product, cartItems, addToCart,RemoveFromCart};

    
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider> 
    )
}

export default ShopContextProvider;