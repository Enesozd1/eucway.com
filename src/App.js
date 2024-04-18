import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import bumper_banner from './Components/Assets/banner_mens.png'
import pads_banner from './Components/Assets/banner_women.png'
import Payment from './Pages/Payment';
import Verification from './Pages/Verification';
import PageNotFound from './Pages/PageNotFound';
import ContactUs from './Pages/ContactUs';


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
          <Route path='/payment' element={<Payment />} />
          <Route path='/verification' element={<Verification/>}/>
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
