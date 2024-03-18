import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import bumper_banner from './Components/Assets/banner_mens.png'
import pads_banner from './Components/Assets/banner_women.png'

function App() {
  
  return (
    <div>
      <BrowserRouter> 
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/bumper' element={<ShopCategory banner={bumper_banner} category="bumper"/>}/>
          <Route path='/pads' element={<ShopCategory banner={pads_banner} category="pads"/>}/>
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>

        </Routes>
        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
