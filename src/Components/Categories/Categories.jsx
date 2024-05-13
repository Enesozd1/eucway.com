import React from "react";
import tempaccessories from '../Assets/tempaccessories.jpeg'
import tempEuc from '../Assets/tempeuc.jpeg'
import tempPads from '../Assets/temppads.jpg'
import "./Categories.css"
import { Link } from "react-router-dom";
const Categories = () => {
    return (
        <div class="container">
  <div class="image-wrapper">
    <Link to="/pads"><img src={tempPads} alt="Pads" /></Link>
    <p>Pads</p>
  </div>
  <div class="image-wrapper">
    <Link to="/searcheuc"><img src={tempEuc} alt="Search by EUC" /></Link>
    <p>Search by EUC</p>
  </div>
  <div class="image-wrapper">
  <Link to="/bumper"><img src={tempaccessories} alt="Other Accessories" /></Link>
    <p>Other Accessories</p>
  </div>
</div>

        
    )
}

export default Categories;