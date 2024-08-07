import React from 'react';
import { Link } from 'react-router-dom';

const Mainsidebar = ({ selectedDomain }) => {
  return (
    <div className='fixed top-50 left-0 w-48 h-[calc(100vh-4rem)] bg-gray-100 text-black p-4 z-50'>
      <Link 
        to='/watchlist' 
        className={`block py-2 ${selectedDomain === 'Movies' ? 'bg-gray-700' : ''}`}
      >
        Movies
      </Link>
      <Link 
        to='/allbeauty' 
        className={`block py-2 ${selectedDomain === 'Beauty' ? 'bg-gray-700' : ''}`}
      >
        Beauty
      </Link>
      <Link 
        to='/fashion' 
        className={`block py-2 ${selectedDomain === 'Fashion' ? 'bg-gray-700' : ''}`}
      >
        Fashion
      </Link>
      <Link 
        to='/phones' 
        className={`block py-2 ${selectedDomain === 'Phones' ? 'bg-gray-700' : ''}`}
      >
        Cell Phones
      </Link>

      <Link 
        to='/books' 
        className={`block py-2 ${selectedDomain === 'Books' ? 'bg-gray-700' : ''}`}
      >
        Books
      </Link>
    </div>
  );
};

export default Mainsidebar;
