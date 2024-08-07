import axios from "axios";
import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import WordCloudComponent from "./WordCloudComponent";
import CustomBarChart from "./CustomBarChart";
import CustomPieChart from "./CustomPieChart";
import Sidebar from "./Sidebar";
import Ratingplot from "./Ratingplot";

const RecommendationDashboard = ({
  tweets,
  selectedBooks,
  selectedMovies,
  beauty,
  fashion,
  phones,
  username,
}) => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem1, setSelectedItem1] = useState(null);

  // Load CSV Data
  useEffect(() => {
    loadCsvData("/finalmetabooks.csv"); // Replace with your CSV file path
  }, []);

  const loadCsvData = (filePath) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      complete: (results) => {
        console.log("CSV Data:", results.data); // Debugging: Log CSV Data
        setCsvData(results.data);
      },
      error: (error) => {
        console.error("Error loading CSV data:", error);
      },
    });
  };

  // Handle Recommendations
  const handleRecommendation = async () => {
    if (
      tweets.length === 0 &&
      selectedBooks.length === 0 &&
      selectedMovies.length === 0
    ) {
      setError(
        "Please select at least one book, movie, or tweet for recommendations."
      );
      return;
    }

    setLoading(true);
    setError(null);
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("JSON parsing error:", e);
      return {};
    }
  };

  const getRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
      //  "https://multiproduct-ede8551aad17.herokuapp.com/getRecommendation",
      "http://127.0.0.1:5000/getRecommendation",  
      {
          selection: {
            Movies_and_TV: selectedMovies,
            Books: selectedBooks,
            All_Beauty: beauty,
            Amazon_Fashion: fashion,
            Cell_Phones_and_Accessories: phones,
          },
          twitter: username,
        }
      );
      const recommendationsData = response.data;
      console.log("Raw recommendations data:", recommendationsData);

      const parsedRecommendations = {
        ...recommendationsData,
        top_5:
          typeof recommendationsData.top_5 === "string"
            ? safeParse(recommendationsData.top_5)
            : recommendationsData.top_5,
        top_best:
          typeof recommendationsData.top_best === "string"
            ? safeParse(recommendationsData.top_best)
            : recommendationsData.top_best,
      };

      setRecommendations(parsedRecommendations);
      console.log("Parsed recommendations data:", parsedRecommendations);
    } catch (err) {
      console.error("Error fetching recommendations:", err); // Debugging: Log API Error
      setError("Error fetching recommendations");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecommendations();
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

  // Handle Domain Selection
  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
     {/* <h1 className="text-2xl font-bold mb-4">Recommendation Dashboard</h1>*/}
      {/* User Insights Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Discover Your Insights</h2>

        {/* Custom Pie Chart */}
        <div className="flex">
          {/* Pie Chart Section */}
          <div className="bg-white p-4 rounded-md shadow-md mt-4 w-2/3">
            <h3 className="text-lg font-bold mb-2">
              Pie Chart for User History
            </h3>
            <CustomPieChart
              data={pieChartData}
              detailedItems={detailedItems}
              setSelectedItem={setSelectedItem}
            />
          </div>

          {/* Sidebar Section */}
          <div className="bg-white p-4 rounded-md shadow-2xl w-1/3">
            <Sidebar
              selectedItem={selectedItem}
              detailedItems={detailedItems}
            />
          </div>
        </div>

        {/* Custom Bar Chart Section */}
        <div className="flex">
          <div className="bg-white p-4 rounded-md shadow-md mt-4 w-2/3">
            <h3 className="text-lg font-bold mb-2">
              Bar Chart for User History
            </h3>
            <CustomBarChart
              data={barChartData}
              detailedItems={detailedItems}
              setSelectedItem={setSelectedItem1}
            />
          </div>
          {/* Sidebar Section */}
          <div className="bg-white p-4 rounded-md shadow-2xl w-1/3">
            <Sidebar
              selectedItem={selectedItem1}
              detailedItems={detailedItems}
            />
          </div>
        </div>

        {/* Word Cloud Component */}
        <div className="bg-white p-4 rounded-md shadow-md mt-4">
          <h3 className="text-lg font-bold mb-2">Personalized Tweet Word Cloud</h3>
          {tweets && tweets.length > 0 && (
            <WordCloudComponent tweets={tweets} />
          )}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Explore Your Recommended Products
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Domain Selection Dropdown */}
      <div className="mt-8">
        <label htmlFor="domain-select" className="block text-lg font-semibold mb-2">
        Pick a Category to Personalize
        </label>
        <select
          id="domain-select"
          value={selectedDomain}
          onChange={handleDomainChange}
          className="border p-2 rounded"
        >
          <option value="">-- Select a Domain --</option>
          {recommendations &&
            recommendations["in-domain"] &&
            Object.keys(recommendations["in-domain"]).map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
        </select>
      </div>

      {/* Recommendations for Selected Domain */}
      {selectedDomain && recommendations && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recommendations for {selectedDomain}</h2>
          {recommendations["in-domain"][selectedDomain] && (
            <>
              {recommendations["in-domain"][selectedDomain].top_5 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Top 5 Recommendations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.values(safeParse(recommendations["in-domain"][selectedDomain].top_5)).map((rec, index) => (
                      <div key={index} className="border p-4 rounded">
                        <img
                          src={rec["image link"]}
                          alt={rec["product name"]}
                          className="w-full h-70 mb-2"
                        />
                        <p className="font-semibold text-justify text-blue-700">{rec["product name"]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {recommendations["in-domain"][selectedDomain].top_best && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Top Best Recommendation</h3>
                  <div className="border p-4 rounded">
                    <img
                      src={safeParse(recommendations["in-domain"][selectedDomain].top_best)["product 1"]["image link"]}
                      alt={safeParse(recommendations["in-domain"][selectedDomain].top_best)["product 1"]["product name"]}
                      className="w-80 h-70 items-center mb-2"
                    />
                    <p className="w-80 font-semibold text-justify text-blue-700">
                      {safeParse(recommendations["in-domain"][selectedDomain].top_best)["product 1"]["product name"]}
                    </p>
                    <p className="w-80 font-light text-justify">
                    <p className="font-semibold"> Explanation:</p> {safeParse(recommendations["in-domain"][selectedDomain].top_best)["product 1"].reason}
                    </p>
                    <Ratingplot bookTitle={safeParse(recommendations["in-domain"][selectedDomain].top_best)["product 1"]["product name"]} domain={selectedDomain}/>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendationDashboard;
