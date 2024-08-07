import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CustomPieChart = ({ data, detailedItems, setSelectedItem, setHoveredItem}) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5555', '#6a5acd'];

  const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

  const renderLabel = ({ name, value }) => {
    const percentage = ((value / totalValue) * 100).toFixed(2);
    return `${name} - ${percentage}%`;
  };

  const handleClick = (entry) => {
    setSelectedItem(entry.name); // Set the selected item for the sidebar
  };

  const handleMouseEnter = (entry) => {
    setHoveredItem(entry.name); // Set the hovered item for the sidebar
  };

  return (
    <ResponsiveContainer width="100%" height={600}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={handleMouseEnter} //
          onClick={handleClick} // Handle clicks on pie slices
          
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/*<Tooltip content={({ active, payload }) => {
          if (active && payload && payload.length) {
            const item = payload[0];
            const details = detailedItems[item.name];
            const percentage = ((item.value / totalValue) * 100).toFixed(2);
            return (
              <div className="bg-white p-2 rounded shadow-md">
                <h4 className="font-bold">{item.name} - {percentage}%</h4>
                <ol className="list-decimal pl-5">
                  {details.map((detail, index) => (
                    <li key={detail.name} className="mb-1">
                      <strong>{detail.name}</strong>
                    </li>
                  ))}
                </ol>
              </div>
            );
          }
          return null;
        }} />*/}
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
