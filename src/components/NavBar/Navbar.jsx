import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ selectedDomain }) => {
  return (
    
    <div className='flex border space-x-8 items-center pl-3 py-4'>
         
         <img className='w-[50px]' alt="" />

         <img className='w-[50px]' alt="" />

         <img className='w-[50px]' alt="" />
         
         <Link to='/twitter' className='text-black-500 text-2xl font-semibold'> Twitter</Link>
        {/*<Link to='/llm' className='text-black-500 text-2xl font-semibold'> Book domain</Link>*/}
        <Link to='/personalize' className='text-black-500 text-2xl font-semibold'> Personalize</Link>
         <Link to='/llm1' className='text-black-500 text-2xl font-semibold'> Recommendations</Link>
         
    </div>
  );
};

export default Navbar;
