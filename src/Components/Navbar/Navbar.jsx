import React, { useContext, useRef } from "react";
import './Navbar.css';
import logo from '../Assets/new logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/navdropdown.png";
import LoginSignup from '../../Pages/LoginSignup';
//import { useLocation } from "react-router-dom";
//import { useEffect } from "react";

const Navbar = () => {
    //const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();
    
    //const location = useLocation();

    //useEffect(() => {
    //    const isBumper = location.pathname.endsWith('/bumper');
    //    const isPads = location.pathname.endsWith('/pads');
    //    if (isBumper) {
            //setMenu("bumper");
    //    } else if (isPads) {
            //setMenu("pads");
   //     } else {
            //setMenu("shop");
    //    }
    //}, [location]);

    const logout = async () => {
        const logoutUrl = `${process.env.REACT_APP_API_LINK}/logout`;
        let responseData;
        await fetch(logoutUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(LoginSignup.formData),
        }).then((response) => response.json()).then((data) => responseData = data)
        alert(responseData);
    }

    const dropdownToggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    const handleDropdownClick = (e) => {
        menuRef.current.classList.remove('nav-menu-visible'); //this used to toggle off navbar
        
    }

    return (
        <div className="navbar">
            <div className="nav-logo">
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
                <Link to="/"><p>EUCWAY</p></Link>
            </div>
            <img className='nav-dropdown' onClick={dropdownToggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li><Link to='/'>Homepage</Link></li>
                <li className="dropdown">
                    <span>Shop</span>
                    <ul className="dropdown-content">
                        <li><Link to='/pads' onClick={handleDropdownClick}>Pads</Link></li>
                        <li><Link to='/handle' onClick={handleDropdownClick}>Handles</Link></li>
                        <li><Link to='/bumper' onClick={handleDropdownClick}>Bumper</Link></li>
                        <li><Link to='/accessories' onClick={handleDropdownClick}>Accessories</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <span>By Euc</span>
                    <ul className="dropdown-content">
                        <li><Link to='/kingsong' onClick={handleDropdownClick}>Kingsong</Link></li>
                        <li><Link to='/inmotion' onClick={handleDropdownClick}>Inmotion</Link></li>
                        <li><Link to='/leaperkim' onClick={handleDropdownClick}>Leaperkim</Link></li>
                        <li><Link to='/begode' onClick={handleDropdownClick}>Begode</Link></li>
                    </ul>
                </li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? <button onClick={() => {
                    localStorage.removeItem('auth-token'); window.location.replace('/');
                    logout();
                }}>Logout</button>
                    : <Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar;
