import React from "react";
import './Footer.css'
import footer_logo from '../Assets/new logo.png'
import insta_icon from '../Assets/instagram_icon.png'
import whatsap_icon from '../Assets/whatsapp_icon.png'
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>EUCWAY</p>
            </div>
            <ul className="footer-links">
                <Link to="/contactus"><li>Contact</li></Link>
                <li>About</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                <Link to="https://www.instagram.com/eucway?igsh=dmQ5aGl2eXFsOGJ2">
                    <img src={insta_icon} alt=""  />
                    </Link>
                </div>
                <div className="footer-icons-container">
                    <img src={whatsap_icon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 -All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer;