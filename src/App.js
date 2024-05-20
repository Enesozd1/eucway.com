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
import LoadingScreen from './Pages/LoadingScreen';
import Searcheuc from './Pages/searcheuc'
import { useLocation } from 'react-router-dom';
import ShopMake from './Pages/ShopMake';
import NewCollections from './Components/NewCollections/NewCollections';
import About from './Pages/About'

function App() {
  function ConditionalFooter() {
    const location = useLocation();
    
    if (location.pathname === '/searcheuc') {
      return null;
    }
  
    return <Footer />;
  }
  return (
    <div>
      <BrowserRouter> 
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/bumper' element={<ShopCategory banner={bumper_banner} category="bumper"/>}/>
          <Route path='/pads' element={<ShopCategory banner={pads_banner} category="pads"/>}/>
          <Route path='/kingsong' element={<ShopMake banner={pads_banner} make="kingsong"/>}/>
          <Route path='/inmotion' element={<ShopMake banner={pads_banner} make="inmotion"/>}/>
          <Route path='/leaperkim' element={<ShopMake banner={pads_banner} make="leaperkim"/>}/>
          <Route path='/begode' element={<ShopMake banner={pads_banner} make="begode"/>}/>
          <Route path='/newproducts' element={<NewCollections />}/>

          {/*<Route path='/searcheuc' element={<ShopCategory banner={pads_banner} category="pads"/>}/> */}

          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
          <Route path='/payment' element={<Payment />} />
          <Route path='/verification' element={<Verification/>}/>
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/LoadingPage' element={<LoadingScreen />} />
          <Route path='/searcheuc' element={<Searcheuc />} />
          <Route path='/about' element={<About />} />
          
          <Route path='*' element={<PageNotFound />} />

        </Routes>
        <ConditionalFooter />

      </BrowserRouter>
    </div>
  );
}

export default App;
