import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import Contact from './pages/Contact'   
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/NavBar'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Verify from './pages/Verify.jsx'





function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
     
   <NavBar/>
   <SearchBar/>
     < Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/shop' element={<Shop/>}/>  
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>  
        <Route path='/cart' element={<Cart/> }/>
        <Route path='/login' element={<Login/> }/>
        <Route path='/place-order' element={<PlaceOrder/> }/>
        <Route path='/orders' element={<Orders/> }/>
        <Route path='/verify' element={<Verify/> }/>


     </Routes>
     <ToastContainer />
     <Footer/>
      
    </div>
  )
}

export default App
