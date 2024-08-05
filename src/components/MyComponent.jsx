import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import LineChartComponent from "./LineChartComponent.jsx";

const MyComponent = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Load and parse CSV data
    const filePath = "/finalmetabooks.csv"; // Replace with your CSV file path
    loadCsvData(filePath);
  }, []);

  const loadCsvData = (filePath) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      complete: (results) => {
        // Filter data based on title column (example: "The Very Hungry Caterpillar")
        const filteredData = results.data.filter(
          (item) => item.title === "The Very Hungry Caterpillar"
        );

        // Prepare data for LineChartComponent (timestamp as x-axis, rating as y-axis)
        const chartDataFormatted = filteredData.map((item) => ({
          x: new Date(item.timestamp).getTime(), // Use getTime() to get the timestamp in milliseconds
          y: parseFloat(item.rating),
        }));

        // Update state with formatted chart data
        setChartData(chartDataFormatted);
      },
      error: (error) => {
        console.error("Error loading CSV data:", error);
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/*<h2 className="text-xl font-bold mb-4">Line Chart Example</h2>*/}
      <div className="w-full flex justify-center">
        <LineChartComponent data={chartData} />
      </div>
    </div>
  );
};

export default MyComponent;
