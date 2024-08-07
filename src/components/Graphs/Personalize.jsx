import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Papa from "papaparse";
import WordCloudGraph from "../Recommendations/WordCloudGraph";
import CustomBarChart from "./CustomBarChart";
import CustomPieChart from "./CustomPieChart";
import WordCloudComponent from "./WordCloudComponent";
import Sidebar from "./Sidebar";
const Personalize = ({
  tweets,
  selectedBooks,
  selectedMovies,
  beauty,
  fashion,
  phones,
}) => {
  const [error, setError] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItem1, setSelectedItem1] = useState("");
  const [hoveredItem, setHoveredItem] = useState("");
  const [hoveredItem1, setHoveredItem1] = useState("");

  useEffect(() => {
    loadCsvData("/finalmetabooks.csv"); // Replace with your CSV file path
  }, []);

  const loadCsvData = (filePath) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      complete: (results) => {
        setCsvData(results.data);
      },
      error: (error) => {
        console.error("Error loading CSV data:", error);
      },
    });
  };

  // Combine data for pie chart
  const pieChartData = [
    { name: "Beauty", value: beauty.length },
    { name: "Fashion", value: fashion.length },
    { name: "Phones", value: phones.length },
    { name: "Books", value: selectedBooks.length },
    { name: "Movies", value: selectedMovies.length },
    { name: "Tweets", value: tweets.length },
  ];

  // Detailed items for each category
  const detailedItems = {
    Beauty: beauty.map((item) => ({
      name: item.title,
      description: item.details,
      image_url: item.image_url,
    })),
    Fashion: fashion.map((item) => ({
      name: item.title,
      description: item.details,
      image_url: item.image_url,
    })),
    Phones: phones.map((item) => ({
      name: item.title,
      description: item.details,
      image_url: item.image_url,
    })),
    Books: selectedBooks.map((item) => ({
      name: item.title,
      description: item.details,
      image_url: item.image_url,
    })),
    Movies: selectedMovies.map((item) => ({
      name: item.title,
      description: item.details,
    })),
    Tweets: tweets.map((item) => ({ name: item.text, price: null })),
  };

  const barChartData = [
    { category: "Beauty", count: beauty.length },
    { category: "Fashion", count: fashion.length },
    { category: "Phones", count: phones.length },
    { category: "Movies", count: selectedMovies.length },
    { category: "Books", count: selectedBooks.length },
    { category: "Tweets", count: tweets.length },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Recommendation Dashboard</h1> */}
      {/* User Insights Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Discover Your Insights</h2>

        {/* Custom Pie Chart */}
        <div className="flex relative">
          {/* Pie Chart Section */}
          <div className="bg-white p-4 rounded-md shadow-md mt-4 w-2/3">
            <h3 className="text-lg font-bold mb-2">
              Pie Chart for User History
            </h3>
            <CustomPieChart
              data={pieChartData}
              detailedItems={detailedItems}
              setSelectedItem={setSelectedItem}
              setHoveredItem={setHoveredItem}
            />
          </div>

          {/* Sidebar Section */}
          {hoveredItem && (
            <div className="bg-white p-4 rounded-md shadow-2xl w-1/3 absolute right-0 top-0 mt-4">
              <Sidebar
                selectedItem={hoveredItem}
                detailedItems={detailedItems}
              />
            </div>
          )}
        </div>

        {/* Custom Bar Chart Section */}
        <div className="flex relative">
          <div className="bg-white p-4 rounded-md shadow-md mt-4 w-2/3">
            <h3 className="text-lg font-bold mb-2">
              Bar Chart for User History
            </h3>
            <CustomBarChart
              data={barChartData}
              detailedItems={detailedItems}
              setSelectedItem={setSelectedItem1}
              setHoveredItem={setHoveredItem1}
            />
          </div>
          {/* Sidebar Section */}
          {hoveredItem1 && (
            <div className="bg-white p-4 rounded-md shadow-2xl w-1/3 absolute right-0 top-0 mt-4">
              <Sidebar
                selectedItem={hoveredItem1}
                detailedItems={detailedItems}
              />
            </div>
          )}
        </div>

        {/* Word Cloud Component */}
        <div className="bg-white p-4 rounded-md shadow-md mt-4">
          <h3 className="text-lg font-bold mb-2">
            Personalized Tweet Word Cloud
          </h3>
          {tweets && tweets.length > 0 && (
            <WordCloudComponent tweets={tweets} />
          )}
        </div>
        </div>
    </div>
  );
};

export default Personalize;
