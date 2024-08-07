import React from 'react';

const Sidebar1 = ({ hoveredData }) => {
  if (!hoveredData) {
    return <div className="bg-gray-200 p-4 rounded-md shadow-md">Hover over a chart to see details here.</div>;
  }

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-2">Hovered Data</h3>
      <p className="mb-2">{hoveredData.date ? `Date: ${hoveredData.date}` : `Rating: ${hoveredData.rating}`}</p>
      <p className="mb-2">{hoveredData.count ? `No. of users: ${hoveredData.count}` : `Price: $${hoveredData.price}`}</p>
      <p className="mb-2">{hoveredData.review ? `Review: ${hoveredData.review}` : ''}</p>
      {hoveredData.reviews && (
        <ul className="list-disc list-inside">
          {hoveredData.reviews.map((review, index) => (
            <li key={index}>{review}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar1;
