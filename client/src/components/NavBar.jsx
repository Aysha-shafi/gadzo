import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import { useState } from "react";
import { SlMenu } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";
import { ShopContext } from "../context/ShopContext.jsx";



const NavBar = () => {

  const [visible, setVisible] = useState(false);
  const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems}=useContext(ShopContext)
  const logout=()=>{
    navigate('/login')
    localStorage.removeItem('token')
     setToken('')
    setCartItems({})
    
  }
  return (
    <header className="flex items-center justify-between w-full ">
      {/* Left: Logo */}
      <div className="flex-shrink-0">
       <Link to='/'> <img src={assets.logo} alt="Logo" /></Link>
      </div>

      {/* Center: Menu */}
      <nav className="hidden md:flex flex-1  justify-center">
        <ul className="flex list-none items-center font-bold space-x-12 text-base">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "text-blue-600 font-semibold" : "text-gray-700"} no-underline`
              }
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `${isActive ? "text-blue-600 font-semibold" : "text-gray-700"} no-underline`
              }
            >
              SHOP
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${isActive ? "text-blue-600 font-semibold" : "text-gray-700"} no-underline`
              }
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${isActive ? "text-blue-600 font-semibold" : "text-gray-700"} no-underline`
              }
            >
              CONTACT
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Right: Icons */}
      <div className="flex items-center gap-6">
        <IoSearchSharp onClick={()=>setShowSearch(true)} className="text-3xl text-gray-700 cursor-pointer hover:text-blue-600" />

        <div className="relative group inline-block">
         <CgProfile onClick={()=> token ? null : navigate('/login')} className="text-3xl cursor-pointer text-gray-700 hover:text-blue-600" />
          {/* Dropdown */}
          {token && 
          <div className="absolute right-0 mt-1 w-40 bg-white top-full  shadow-lg rounded-md p-2 hidden group-hover:block">
            <p className="px-4 py-2 text-sm hover:bg-gray-100 hover:text-black hover:font-bold cursor-pointer">
              My Profile
            </p>
            <p onClick={()=>navigate('/orders')} className="px-4 py-2 text-sm hover:bg-gray-100 hover:text-black hover:font-bold cursor-pointer">
              Orders
            </p>
            <p  onClick={logout} className="px-4 py-2 text-sm hover:bg-gray-100 hover:text-black hover:font-bold cursor-pointer">
              Logout
            </p>
          </div>}
          
        </div>
        <Link to="/cart" className="relative">
          <IoBagOutline className="text-3xl font-bold text-gray-700 cursor-pointer hover:text-blue-600" />
          <p className="absolute right-[-7px] bottom-[-5px] w-5 text-center leading-4 bg-black text-white aspect-square rounded-full text-xs">{getCartCount()}</p>

        </Link>

         <SlMenu  onClick={()=>setVisible(true)}  className='text-2xl font-bold text-gray-700 w-5 cursor-pointer sm:hidden'/>


      </div>
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-700 ">
          <div onClick={()=>setVisible(false)}className="flex items-center gap-4 p-3 cursor-pointer">
            <IoIosArrowBack className="h-4 " />

            <p>Back</p>

          </div>
          <NavLink onClick={()=>setVisible(false)} to='/' className="p-4 border-t border-gray-300">HOME</NavLink>
          <NavLink onClick={()=>setVisible(false)} to='/shop' className="p-4 border-t border-gray-300">SHOP</NavLink>
          <NavLink onClick={()=>setVisible(false)} to='/about' className="p-4 border-t border-gray-300">ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)} to='/contact' className="p-4 border-t border-gray-300">CONTACT</NavLink>

        </div>

      </div>



    </header>
  );
};



export default NavBar;

