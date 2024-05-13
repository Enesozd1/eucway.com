import React from 'react';
import { Link } from "react-router-dom";
import "./CSS/searcheuc.css";

// Import your images
import begodeImage from '../Components/Assets/BegodeTemp.jpeg';
import leaperkimImage from '../Components/Assets/LeaperkimTemp.jpg';
import inmotionImage from '../Components/Assets/InmotionTemp.jpeg';
import kingsongImage from '../Components/Assets/KingsongTemp.jpeg';

const searcheuc = () => {
    return (
        <div className="euc-container">
            <div className="euc-item">
                <Link to='/begode'>
                    <img src={begodeImage} alt="Begode" />
                    <p>Begode</p>
                </Link>
            </div>
            <div className="euc-item">
                <Link to='/leaperkim'>
                    <img src={leaperkimImage} alt="Leaperkim" />
                    <p>Leaperkim</p>
                </Link>
            </div>
            <div className="euc-item">
                <Link to='/inmotion'>
                    <img src={inmotionImage} alt="Inmotion" />
                    <p>Inmotion</p>
                </Link>
            </div>
            <div className="euc-item">
                <Link to='/kingsong'>
                    <img src={kingsongImage} alt="Kingsong" />
                    <p>Kingsong</p>
                </Link>
            </div>
        </div>
    );
}

export default searcheuc;
