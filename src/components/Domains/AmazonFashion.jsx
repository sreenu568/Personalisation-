import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Pagination from './Pagination';

function AmazonFashion({ onSelectedItemsChange }) {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const itemsPerPage = 50;

  useEffect(() => {
    Papa.parse('/final_raw_meta_Amazon_Fashion.csv', {
      download: true,
      header: true,
      complete: (results) => {
        setItems(results.data);
        console.log(results.data);
      },
    });
  }, []);

  useEffect(() => {
    onSelectedItemsChange(selectedItems);
  }, [selectedItems, onSelectedItemsChange]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = items.filter(item =>
    item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const selectItem = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeItem = (itemToRemove) => {
    setSelectedItems(selectedItems.filter(item => item !== itemToRemove));
  };

  return (
    <div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search Fashion Items by Title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex space-x-4 p-4 overflow-x-auto">
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="relative h-[40vh] w-[200px] rounded-xl hover:scale-110 duration-300 hover:cursor-pointer bg-gray-200 flex-shrink-0"
            onDoubleClick={() => selectItem(item)}
          >
            <div
              className="h-full w-full bg-center bg-cover rounded-xl"
              style={{ backgroundImage: `url(${item.image_url})` }}
            >
              <button
                className="absolute bottom-4 right-4 bg-blue-500 text-white py-1 px-2 rounded-md"
                onClick={() => selectItem(item)}
              >
                Add
              </button>
            </div>
           {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 rounded-b-xl">
              <p className="text-sm font-bold text-center p-2 bg-gray-800 text-white rounded-md shadow-md">
                {item.main_category}
              </p>
              <p className="text-xs text-center">
                {item.details}
              </p>
            </div>*/}
          </div>
        ))}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredItems.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Selected Fashion Items</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {selectedItems.map((item, index) => (
            <div
              key={index}
              className="relative h-[40vh] w-[200px] rounded-xl hover:scale-110 duration-300 hover:cursor-pointer bg-gray-200 flex-shrink-0"
            >
              <div
                className="h-full w-full bg-center bg-cover rounded-xl"
                style={{ backgroundImage: `url(${item.image_url})` }}
              >
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full text-xl font-bold"
                  onClick={() => removeItem(item)}
                >
                  &times;
                </button>
              </div>
              {/*<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 rounded-b-xl">
                <p className="text-sm font-bold text-center p-2 bg-gray-800 text-white rounded-md shadow-md">
                  {item.main_category}
                </p>
                <p className="text-xs text-center">
                  {item.details}
                </p> 
              </div>*/}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AmazonFashion;
