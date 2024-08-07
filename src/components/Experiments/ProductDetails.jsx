import React, { useState } from 'react';

const ProductDetails = () => {
  const [productName, setProductName] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/getProductByName?name=${productName}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setProductDetails(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    setProductName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchProductDetails();
  };

  // Safely parse a JSON string
  const safeJsonParse = (jsonString) => {
    try {
      return JSON.parse(jsonString.replace(/'/g, '"')); // replace single quotes with double quotes
    } catch (e) {
      console.error('Failed to parse JSON', e);
      return null;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" value={productName} onChange={handleChange} />
        </label>
        <button type="submit">Get Product Details</button>
      </form>

      {error && <p>Error: {error}</p>}

      {productDetails && productDetails.metadatas && productDetails.metadatas.length > 0 && (
        <div>
          <h2>Product Details</h2>
          {productDetails.metadatas.map((meta, index) => {
            const authorData = safeJsonParse(meta[0].author);
            const imagesData = safeJsonParse(meta[0].images);
            const detailsData = safeJsonParse(meta[0].details);

            return (
              <div key={index}>
                <h3>{meta[0].title}</h3>
                <p><strong>Author:</strong> {authorData ? authorData.name : 'Unknown'}</p>
                <p><strong>Average Rating:</strong> {meta[0].average_rating}</p>
                <p><strong>Price:</strong> ${meta[0].price}</p>
                <p><strong>Category:</strong> {meta[0].category}</p>
                <p><strong>Description:</strong> {meta[0].features}</p>
                <p><strong>Publisher:</strong> {detailsData ? detailsData.Publisher : 'N/A'}</p>
                <p><strong>ISBN 10:</strong> {detailsData ? detailsData['ISBN 10'] : 'N/A'}</p>
                {imagesData && imagesData.large && imagesData.large[0] && (
                  <img src={imagesData.large[0]} alt={meta[0].title} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
