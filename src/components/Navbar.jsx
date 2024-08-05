import React from 'react'

import {Link} from "react-router-dom";

import Logo from "../books.jpeg"
const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-4'>
         
         <img className='w-[50px]' src={Logo} alt="" />
         
         <Link to='/' className='text-black-500 text-2xl font-semibold'> Home</Link>
         <Link to='/watchlist' className='text-black-500 text-2xl font-semibold'> Movies</Link>
         <Link to='/twitter' className='text-black-500 text-2xl font-semibold'> Twitter</Link>
        <Link to='/allbeauty' className='text-black-500 text-2xl font-semibold'> Beauty Items</Link>
        <Link to='/fashion' className='text-black-500 text-2xl font-semibold'> Amazon Fashion</Link>
        <Link to='/phones' className='text-black-500 text-2xl font-semibold'> Cell Phones</Link> 
        {/*<Link to='/llm' className='text-black-500 text-2xl font-semibold'> Book domain</Link>*/}
         <Link to='/llm1' className='text-black-500 text-2xl font-semibold'> Recommendations</Link>
         
    </div>
  )
}

export default Navbar