import React from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst';

const data = {
  name: 'Recommendations',
  children: [
    { name: 'Home', value: 400 },
    { name: 'Books', value: 300 },
    { name: 'Music', value: 200 },
    { name: 'Phone', value: 150 },
    { name: 'Electronics', value: 100 },
  ],
};

const SunburstChart = () => (
  <div style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <ResponsiveSunburst
      data={data}
      margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
      identity="name"
      value="value"
      colors={{ scheme: 'nivo' }}
      borderWidth={1}
      borderColor={{ theme: 'background' }}
      enableSliceLabels={true}
      sliceLabel={(e) => `${e.id}: ${e.value}`}
      innerRadius={0.3}
      cornerRadius={2}
      tooltip={({ slice }) => (
        slice && ( // Check if slice is defined before accessing its properties
          <div style={{ padding: '10px', background: 'white', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <div><strong>{slice.id}</strong></div>
            <div>Value: {slice.value}</div>
          </div>
        )
      )}
      theme={{
        tooltip: {
          container: {
            background: '#333',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
            padding: '10px',
          },
        },
      }}
    />
  </div>
);

export default SunburstChart;
