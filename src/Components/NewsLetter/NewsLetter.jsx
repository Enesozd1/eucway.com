import React from "react";
import './Newsletter.css';

const NewsLetter = () => {
    return(
        <div className="newsletter">
            <h1>Get Exclusive Offers on Your Email</h1>
            <p>Subscribe to newsletter to stay updated!</p>
            <div>
                <input type="email" placeholder="Your Email" />
                <button>Subscribe</button>
            </div>
        </div>
    )
}

export default NewsLetter;