import axios from "axios";
import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import WordCloudComponent from "../Graphs/WordCloudComponent";
import CustomBarChart from "../Graphs/CustomBarChart";
import CustomPieChart from "../Graphs/CustomPieChart";
import Sidebar from "../Graphs/Sidebar";
import Ratingplot from "./Ratingplot";
import Sidebar1 from "../Graphs/Sidebar1";


// Mapping of internal domain keys to user-friendly names
const domainNameMapping = {
  "Movies_and_TV": "Movies and TV",
  "Books": "Books",
  "All_Beauty": "Beauty",
  "Amazon_Fashion": "Fashion",
  "Cell_Phones_and_Accessories": "Phones",
};

const RecommendationDashboard1 = ({
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
  const [jobId, setJobId] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hoveredData, setHoveredData] = useState(null);
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

  // Poll job status until it finishes
  useEffect(() => {
    if (jobId) {
      const interval = setInterval(() => {
        axios.get(`https://multiproduct-3dd536e7ecf6.herokuapp.com/job-status/${jobId}`)
          .then(response => {
            if (response.status === 200) {
              if (response.data.status === 'in progress') {
                console.log("Job is still in progress...");
              } else if (response.data.status === 'failed') {
                console.error("Job failed");
                setError("Job failed");
                setLoading(false);
                clearInterval(interval);
              } else {
                const recommendationsData = response.data;
                console.log("Job finished, recommendations data:", recommendationsData);

                const parsedRecommendations = {
                  ...recommendationsData,
                  top_5: typeof recommendationsData.top_5 === "string" ? safeParse(recommendationsData.top_5) : recommendationsData.top_5,
                  top_best: typeof recommendationsData.top_best === "string" ? safeParse(recommendationsData.top_best) : recommendationsData.top_best,
                };

                setRecommendations(parsedRecommendations);
                console.log("Parsed recommendations data:", parsedRecommendations);

                setLoading(false);
                clearInterval(interval);
              }
            }
          })
          .catch(error => {
            console.error('Error fetching job status:', error);
            setError("Error fetching job status");
            setLoading(false);
            clearInterval(interval);
          });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [jobId]);

  const getRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://multiproduct-3dd536e7ecf6.herokuapp.com/getRecommendation",
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
      setJobId(response.data.job_id);
    } catch (err) {
      console.error("Error fetching recommendations:", err); // Debugging: Log API Error
      setError("Error fetching recommendations");
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecommendations();
  };

  // Handle Domain Selection
  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const handleExplanationToggle = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Recommendation Dashboard</h1> */}
      {/* User Insights Section */}
      <form onSubmit={handleSubmit} className="mb-4">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Explore Personalize Recommendations</button>
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
                {domainNameMapping[domain] || domain}
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
                    <button
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-2"
                      onClick={handleExplanationToggle}
                    >
                      {showExplanation ? "Hide Explanation" : "Show Explanation"}
                    </button>
                    {showExplanation && (
                      <p className="w-80 font-light text-justify">
                        <p className="font-semibold">Explanation:</p> {safeParse(recommendations["in-domain"][selectedDomain].top_best)["product 1"].reason}
                      </p>
                    )}
                    <Ratingplot bookTitle={safeParse(recommendations["in-domain"][selectedDomain].top_best)["product 1"]["product name"]} domain={selectedDomain} setHoveredData={setHoveredData}/>
                    <div className="w-1/3 p-4">
        <Sidebar1 hoveredData={hoveredData} />
      </div>                  
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

export default RecommendationDashboard1;
