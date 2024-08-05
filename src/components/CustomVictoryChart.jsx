import React from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryTooltip } from 'victory';

const data = [
  { x: 1, y: 2, size: 400, label: 'Nike Shoes' },
  { x: 2, y: 3, size: 300, label: 'Levi Jeans' },
  { x: 3, y: 4, size: 200, label: 'Gucci Watch' },
  { x: 4, y: 5, size: 500, label: 'Harry Potter' },
  { x: 5, y: 6, size: 350, label: 'Yoga Mat' },
];

const CustomVictoryChart = () => (
  <VictoryChart theme={VictoryTheme.material}>
    <VictoryScatter 
      data={data}
      bubbleProperty="size"
      maxBubbleSize={25}
      minBubbleSize={5}
      labels={({ datum }) => datum.label}
      labelComponent={<VictoryTooltip />}
      style={{
        data: {
          fill: ({ datum }) => datum.size > 300 ? "#c43a31" : "#00a2ee",
          stroke: "#black",
          strokeWidth: 1
        }
      }}
    />
  </VictoryChart>
);

export default CustomVictoryChart;
