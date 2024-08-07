import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ data }) => {
  // Sort data by timestamp (x-axis) in ascending order
  const sortedData = [...data].sort((a, b) => a.x - b.x);

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
          label={{ value: 'Time', position: 'insideBottomRight', offset: -5 }}
        />
        <YAxis label={{ value: 'Rating', angle: -90, position: 'insideLeft' }} />
        <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
        <Legend />
        <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
