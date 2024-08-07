import React, { useState } from 'react';

const Sidebar = ({ selectedItem, detailedItems }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const details = detailedItems[selectedItem] || [];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md w-full h-100">
      {selectedProduct ? (
        <div className="pl-5">
          <button 
            onClick={handleBackClick} 
            className="text-blue-500 text-justify hover:underline mb-4"
          >
            Back
          </button>
          <h2 className="text-xl text-justify font-bold mb-2">{selectedProduct.name}</h2>
          {selectedProduct.image_url && (
            <img 
              src={selectedProduct.image_url} 
              alt={selectedProduct.name} 
              className="w-full h-40 mb-4 rounded object-cover"
            />
          )}
          <p className="text-gray-700 text-justify">{selectedProduct.description}</p>
          {selectedProduct.price && (
            <p className="font-semibold mt-2">Price: ${selectedProduct.price}</p>
          )}
        </div>
      ) : (
        <div className="text-justify">
          <h2 className="text-xl p-4 font-bold mb-2">{selectedItem}</h2>
          {details.length === 0 ? (
            <p className="text-gray-500">No details available</p>
          ) : (
            <ol className="list-decimal pl-5 text-left">
              {details.map((detail, index) => (
                <li key={index} className="mb-2">
                  <button 
                    onClick={() => handleProductClick(detail)} 
                    className="text-blue-500 text-justify hover:underline"
                  >
                    {detail.name}
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
