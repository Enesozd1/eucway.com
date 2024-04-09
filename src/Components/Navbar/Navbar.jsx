import React, { useContext,useRef,useState } from "react";
import './Navbar.css'
import logo from '../Assets/new logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/navdropdown.png";
import LoginSignup from '../../Pages/LoginSignup'
//import logout from '../../Pages/LoginSignup'
//import {logout} from "../../Pages/LoginSignup";
//import { formData } from '../../Pages/LoginSignup';
const Navbar =() => {
    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');

    }
    
    //console.log(LoginSignup.formData)
    
    const logout = async () => {
        //console.log("Login Function Executed", formData);
        const logoutUrl = `${process.env.REACT_APP_API_LINK}/logout`;
        let responseData;
        await fetch(logoutUrl,{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',

            },
            body: JSON.stringify(LoginSignup.formData),
        }).then((response)=> response.json()).then((data) =>responseData=data)
        alert(responseData)
    }
    //console.log(LoginSignup.formData.email)
    

    //const login = async () => {
    //    //console.log("Login Function Executed", formData);
    //    const loginUrl = `${process.env.REACT_APP_API_LINK}/login`;
    //    let responseData;
    //    await fetch(loginUrl,{
    //        method:'POST',
    //        headers:{
    //            Accept:'application/form-data',
    //            'Content-Type':'application/json',
    //
    //        },
    //        body: JSON.stringify(formData),
    //    }).then((response)=> response.json()).then((data) =>responseData=data)
    //}

    return(
        <div className="navbar">
            <div className="nav-logo">
                <Link to="/">
                <img src={logo} alt="" />
                </Link>
                <p>EUCWAY</p>
            </ div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => {setMenu("shop")}}><Link style={{ textDecoration: 'none'}} to='/'>Homepage</Link>{menu==="shop"? <hr />:<></>}</li>
                <li onClick={() => {setMenu("bumper")}}><Link style={{ textDecoration: 'none'}} to='/bumper'>Bumper sets</Link>{menu==="bumper"? <hr />:<></>}</li>
                <li onClick={() => {setMenu("pads")}}><Link style={{ textDecoration: 'none'}} to='/pads'>Pads</Link>{menu==="pads"? <hr />:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')?<button onClick={()=>{
                    localStorage.removeItem('auth-token');window.location.replace('/');
                    logout();
                }}>Logout</button>
                :<Link to='/login'><button>Login</button></Link>}
                
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>

        </div>
    )
}

export default Navbar;