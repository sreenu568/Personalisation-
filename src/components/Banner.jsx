import React from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is properly imported

function Banner() {
  const bookImageUrl = 'https://images.unsplash.com/photo-1512820790803-83ca734da794'; // Example URL for a book image

  return (
    <div
      className="h-64 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bookImageUrl})` }}
    >
      {/*<div className="text-white text-4xl font-bold bg-black bg-opacity-50 p-4 rounded">
        Welcome to the Bookstore
      </div>*/}
    </div>
  );
}

export default Banner;
