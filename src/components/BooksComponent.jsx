import React, { useEffect, useState } from 'react';

function BooksComponent() {
  const [books, setBooks] = useState([
    { image_url: "https://m.media-amazon.com/images/I/51Pn2VSQenL._SX319_BO1,204,203,200_.jpg", title: "Book Title 1", price: "$19.99" },
    { image_url: "https://m.media-amazon.com/images/I/51Pn2VSQenL._SX319_BO1,204,203,201_.jpg", title: "Book Title 2", price: "$24.99" },
    { image_url: "https://m.media-amazon.com/images/I/51Pn2VSQenL._SX319_BO1,204,203,202_.jpg", title: "Book Title 3", price: "$29.99" }
  ]);

  return (
    <div className="flex space-x-4 p-4 overflow-x-auto">
      {books.map((book, index) => (
        <div key={index} className="relative h-[40vh] w-[200px] rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex-shrink-0">
          <div
            className="h-full w-full bg-center bg-cover rounded-xl"
            style={{ backgroundImage: `url(${book.image_url})`, backgroundSize: 'cover' }}
          ></div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 rounded-b-xl">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm">{book.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BooksComponent;
