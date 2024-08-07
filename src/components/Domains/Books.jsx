import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Pagination from './Pagination';

function Books({ onSelectedBooksChange }) {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooks, setSelectedBooks] = useState([]);
  const booksPerPage = 50;

  useEffect(() => {
    Papa.parse('/finalmetabooks.csv', {
      download: true,
      header: true,
      complete: (results) => {
        setBooks(results.data);
        console.log(results.data);
      },
    });
  }, []);

  useEffect(() => {
    onSelectedBooksChange(selectedBooks);
  }, [selectedBooks, onSelectedBooksChange]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const filteredBooks = books.filter(book =>
    book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const formatPriceToDollars = (price) => {
    const euroToDollarRate = 1.13;
    const priceInDollars = price * euroToDollarRate;
    return `$${priceInDollars.toFixed(2)}`;
  };

  const selectBook = (book) => {
    if (!selectedBooks.includes(book)) {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const removeBook = (bookToRemove) => {
    setSelectedBooks(selectedBooks.filter(book => book !== bookToRemove));
  };

  return (
    <div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search Books by Title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex space-x-4 p-4 overflow-x-auto">
        {currentBooks.map((book, index) => (
          <div
            key={index}
            className="relative h-[40vh] w-[200px] rounded-xl hover:scale-110 duration-300 hover:cursor-pointer bg-gray-200 flex-shrink-0"
            onDoubleClick={() => selectBook(book)}
          >
            <div
              className="h-full w-full bg-center bg-cover rounded-xl"
              style={{ backgroundImage: `url(${book.image_url})` }}
            >
              <button
                className="absolute bottom-4 right-4 bg-blue-500 text-white py-1 px-2 rounded-md"
                onClick={() => selectBook(book)}
              >
                Add
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 rounded-b-xl">
              <p className="text-sm font-bold text-center p-2 bg-gray-800 text-white rounded-md shadow-md">
                Price: {formatPriceToDollars(parseFloat(book.price))}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={filteredBooks.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Selected Books for Purchase</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {selectedBooks.map((book, index) => (
            <div
              key={index}
              className="relative h-[40vh] w-[200px] rounded-xl hover:scale-110 duration-300 hover:cursor-pointer bg-gray-200 flex-shrink-0"
            >
              <div
                className="h-full w-full bg-center bg-cover rounded-xl"
                style={{ backgroundImage: `url(${book.image_url})` }}
              >
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full text-xl font-bold"
                  onClick={() => removeBook(book)}
                >
                  &times;
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 rounded-b-xl">
                <p className="text-sm font-bold text-center p-2 bg-gray-800 text-white rounded-md shadow-md">
                  Price: {formatPriceToDollars(parseFloat(book.price))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Books;
