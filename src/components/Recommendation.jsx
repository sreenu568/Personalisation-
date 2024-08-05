import React from 'react';
import WordCloudComponent from './WordCloudComponent';
import CustomPieChart from './CustomPieChart';
import CustomBarChart from './CustomBarChart';

const Recommendation = ({ tweets }) => {
  return (
    <div className="flex flex-wrap justify-around items-center">
      <div className="flex-1 min-w-[300px] m-2">
        <CustomPieChart />
      </div>
      <div className="flex-1 min-w-[300px] m-2">
        <CustomBarChart />
      </div>
      <div className="flex-1 min-w-[300px] m-2">
        {/* Ensure tweets exist and have length */}
        {tweets && tweets.length > 0 && (
          <WordCloudComponent tweets={tweets} />
        )}
      </div>
    </div>
  );
};

export default Recommendation;
