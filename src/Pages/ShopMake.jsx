import React, { useContext } from "react";
// ... (other imports)
import Item from "../Components/item/Item";
import { ShopContext } from "../Context/ShopContext";
//import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import "./CSS/ShopMake.css"
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ShopMake = (props) => {
    const { all_product } = useContext(ShopContext);
    const [selectedModel, setSelectedModel] = useState('');
    const [filterOptions, setFilterOptions] = useState([]);
    const location = useLocation();
    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
        
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    //const models = all_product
    //.filter((product) => product.make === props.make)
    //.map((product) => product.model)
    //.filter((value, index, self) => self.indexOf(value) === index);

    useEffect(() => {
        
        if (typeof window !== 'undefined') {
            
        
        
        // Determine the make based on the pathname
        //const make = location.pathname.split('/').pop();
        //let options;

        //from here
        const availableModels = all_product
            .filter((product) => product.make === props.make)
            .map((product) => product.model);

        const uniqueAvailableModels = [...new Set(availableModels)];

        const modelsWithProducts = uniqueAvailableModels.filter((model) =>
            all_product.some((product) => product.model === model)
        );
        // to here

        // Set filter options based on the make
      //  switch (make) {
       //     case 'begode':
         //       options = ['', 'Option2', 'Option3']; // Replace with actual options for Begode
           //     break;
          //  case 'kingsong':
          //      options = ['masterpro', 'masterpro', 'OptionC']; // Replace with actual options for Kingsong
           //     break;
            //case 'leaperkim':
            //    options = ['OptionX', 'OptionY', 'OptionZ']; // Replace with actual options for Leaperkim
            //    break;
            //case 'inmotion':
        //        options = ['OptionL', 'OptionM', 'OptionN']; // Replace with actual options for Inmotion
        //        break;
        //    default:
        //        options = []; // Default case if no make is matched
        //}
        setFilterOptions(modelsWithProducts); //CHANGED FROM OPTIONS
    }
    }, [location,all_product,props.make]);

    return (
        <div className="shop-make">
            <h1>{capitalizeFirstLetter(props.make)} Models</h1>
            <div className="shopcategory-indexSort">
                <p>
                    
                </p>
                <div className="shopcategory-sort">
                    Sort by    
                    <select onChange={handleModelChange} value={selectedModel}>
                        <option value="">All Models</option>
                        
                        {filterOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                </div>
            {/* ... (other JSX) */}
            <div className="shopmake-products">
                {all_product.map((item, i) => {
                    
                    if (props.make === item.make && (selectedModel === '' || selectedModel === item.model)) {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}  />;
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
};

export default ShopMake;
