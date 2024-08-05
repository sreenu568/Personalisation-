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

const CustomBarChart = ({ data, detailedItems, setSelectedItem }) => {
  const handleClick = (entry) => {
    if (entry && entry.activePayload && entry.activePayload.length) {
      const selectedCategory = entry.activePayload[0].payload.category;
      setSelectedItem(selectedCategory); // Set the selected item for the sidebar
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        onClick={handleClick} // Handle clicks on bars
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip content={({ active, payload }) => {
          if (active && payload && payload.length) {
            const item = payload[0].payload; // Correctly access payload data
            const category = item.category; // Correctly access category from payload
            const details = detailedItems[category] || []; // Get details based on category

            return (
              <div className="bg-white p-2 rounded shadow-md">
                <h4 className="font-bold">{category}</h4>
                <p>Count: {item.count}</p> {/* Use item.count for the count */}
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
        }} />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
