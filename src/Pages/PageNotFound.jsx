import React from "react";
//import payment from "../Pages/CSS/Payment.css";
import './CSS/PageNotFound.css'
const PageNotFound = () => {
    return(
        <div className="error-page">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for might have been removed, had its name changed, or is unavailable.</p>
        </div>
    )
}

export default PageNotFound;