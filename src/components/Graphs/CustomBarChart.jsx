import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const CustomBarChart = ({ data, detailedItems, setSelectedItem, setHoveredItem}) => {
  const handleClick = (entry) => {
    if (entry && entry.activePayload && entry.activePayload.length) {
      const selectedCategory = entry.activePayload[0].payload.category;
      setSelectedItem(selectedCategory); // Set the selected item for the sidebar
    }
  };

  const handleMouseEnter = (entry) => {
    if (entry && entry.payload) {
      const selectedCategory = entry.payload.category;
      setHoveredItem(selectedCategory); // Set the hovered item for the sidebar
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 5, left: 5, bottom: 5 }}
        onMouseEnter={handleMouseEnter} //
        onClick={handleClick} // Handle clicks on bars
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        {/*<Tooltip content={({ active, payload }) => {
          if (active && payload && payload.length) {
            const item = payload[0].payload; // Correctly access payload data
            const category = item.category; // Correctly access category from payload
            const details = detailedItems[category] || []; // Get details based on category

            return (
              <div className="bg-white p-2 rounded shadow-md">
                <h4 className="font-bold">{category}</h4>
                {details.length > 0 ? (
                  details.map(detail => (
                    <div key={detail.name}>
                      <strong>{detail.name}</strong>
                    </div>
                  ))
                ) : (
                  <p>No details available</p>
                )}
              </div>
            );
          }
          return null;
        }} />*/}
        <Legend />
        <Bar dataKey="count" 
        fill="#8884d8" 
        onMouseEnter={handleMouseEnter} // Handle mouse enter on bars
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
