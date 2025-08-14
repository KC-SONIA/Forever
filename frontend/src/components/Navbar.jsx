import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from "../assets/assets";
import { ShopContext } from '../context/shopContext';

const Navbar = () => {
  const[visible ,setVisible]=useState(false); 
  const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems}=useContext(ShopContext);
  const logout = () =>{
    console.log("loggin out")
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigate('/login')
  }
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <img src={assets.logo} className='w-36 h-auto' alt=""/>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>Home</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/collections' className='flex flex-col items-center gap-1'>
            <p>Collections</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>About</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>Contact</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-6'>
        <img onClick={()=>setShowSearch(true)}src={assets.search_icon} className='w-4 h-4 cursor-pointer align-middle' alt=" "></img>
        <div className='group relative'>
          <img onClick={() =>
          {
            if (!token) {
              navigate('/login');
            }
          }}
          className='w-5 h-5 cursor-pointer align-middle'
          src={assets.profile_icon}
          alt=" "
          />
          {/* dropdown */}
          {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
          <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
            <p className='cursor-pointer hover:text-black'>My Profile</p>
            <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
            <p onClick={logout} className='cursor-pointer hover:text-black'>Log Out</p>
          </div>
        </div>}
        </div>
        <Link to='/cart' className='relative'>
        <img src={assets.cart_icon} className='w-5 min-w-5'/>
        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-xs'>{getCartCount()}</p>
        </Link>
        <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden'/>{/*sidebar menu for smaller screen*/}
      </div>
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full':'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3'>
            <img className='h-4 rotate-90' src={assets.dropdown_icon}/>
            <p>Back</p>
          </div>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collections'>COLLECTIONS</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>

      </div>
    </div>
  )
}

export default Navbar
