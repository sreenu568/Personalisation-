import axios from "axios";
import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
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
import WordCloudComponent from "./WordCloudComponent";
import WordCloudGraph from "./WordCloudGraph";
import CustomBarChart from "./CustomBarChart";
import CustomPieChart from "./CustomPieChart";
import Sidebar from "./Sidebar";

const RecommendationDashboard = ({
  tweets,
  selectedBooks,
  selectedMovies,
  beauty,
  fashion,phones,
}) => {
  const [username, setUsername] = useState("");
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [csvData, setCsvData] = useState({
    books:[],
    movies:[],
    beauty:[],
    fashion:[],
    phones:[],
});
  const [ratingData, setRatingData] = useState([
    { rating: 1, count: 0, reviews: [] },
    { rating: 2, count: 0, reviews: [] },
    { rating: 3, count: 0, reviews: [] },
    { rating: 4, count: 0, reviews: [] },
    { rating: 5, count: 0, reviews: [] },
  ]);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [reviewSentences, setReviewSentences] = useState([]);
  const [featureSentences, setFeatureSentences] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItem1, setSelectedItem1] = useState("");

  // Load CSV Data
  useEffect(() => {
    loadCsvData("/finalmetabooks.csv"); // Replace with your CSV file path
    loadCsvData("/books1000.csv", "books");
    loadCsvData("/movies1000.csv", "movies");
    loadCsvData("/beauty1000.csv", "beauty");
    loadCsvData("/fashion1000.csv", "fashion");
    loadCsvData("/phones1000.csv", "phones");
  }, []);

  const loadCsvData = (filePath, domain) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      complete: (results) => {
        console.log(`CSV Data for ${domain}:`, results.data); // Debugging: Log CSV Data
        setCsvData((prevData) => ({ ...prevData, [domain]: results.data }));
      },
      error: (error) => {
        console.error(`Error loading ${domain} CSV data:`, error);
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

    setIsLoading(true);
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
      
      // Handle data for the domain
      const domain = "books"; // Set domain dynamically as needed
      const bookTitle = parsedRecommendations.top_best["product 1"]["product name"];
      const recommendedBookData = csvData[domain].filter((book) => book.title === bookTitle);

      if (recommendedBookData.length === 0) {
        setError(`No data found for recommended item: ${bookTitle}`);
        return;
      }

      // Process the data
      const { image_url, ...restData } = recommendedBookData[0];
      setRecommendedBooks([{ title: bookTitle, image_url, ...restData }]);
      prepareChartData(domain, recommendedBookData);

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
  
  const prepareChartData = (domain, data) => {
    const ratingCounts = {
      1: { count: 0, reviews: [] },
      2: { count: 0, reviews: [] },
      3: { count: 0, reviews: [] },
      4: { count: 0, reviews: [] },
      5: { count: 0, reviews: [] },
    };
    const ratingsOverTime = [];
    const averageRatingVsPrice = [];

    data.forEach((item) => {
      const rating = parseInt(item.rating);
      ratingCounts[rating].count++;
      ratingCounts[rating].reviews.push(item.review);
      const timestamp = new Date(item.timestamp);
      ratingsOverTime.push({
        x: timestamp.getTime(),
        y: rating,
        review: item.review,
      });
      averageRatingVsPrice.push({
        x: parseFloat(item.average_rating),
        y: parseFloat(item.price),
        review: item.review,
      });
    });

    setRatingData(
      Object.entries(ratingCounts).map(([key, value]) => ({
        rating: key,
        count: value.count,
        reviews: value.reviews,
      }))
    );
    setTimeSeriesData(ratingsOverTime);
    setScatterData(averageRatingVsPrice);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const rating = payload[0].payload.rating;
      const count = payload[0].payload.count;
      const reviews = payload[0].payload.reviews;
      return (
        <div className="custom-tooltip bg-white shadow-md p-2 rounded-md max-w-xs w-auto">
          <p className="label font-bold">{`No. of users ${count}`}</p>
          <p className="label font-bold">{`Rating ${rating}`}</p>
          <ul className="list-disc list-inside text-left mt-2">
            {reviews.map((review, index) => (
              <li key={index} className="text-sm text-gray-700 break-words">
                {review}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip component for rating overtime
  const CustomTooltip1 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label).toLocaleDateString();
      const rating = payload[0].value;
      const review = payload[0].payload.review; // Assuming review data is in payload

      return (
        <div className="custom-tooltip bg-white p-2 shadow-md rounded">
          <p className="label">{`Date: ${date}`}</p>
          <p className="rating">{`Rating: ${rating}`}</p>
          <p className="review">{`Review: ${review}`}</p>
        </div>
      );
    }

    return null;
  };

  // Custom Tooltip component for average rating vs price
  const CustomTooltip2 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const rating = payload[0].payload.x;
      const price = payload[0].payload.y;
      const review = payload[0].payload.review; // Assuming review data is in payload

      return (
        <div className="custom-tooltip bg-white p-2 shadow-md rounded">
          <p className="label">{`Average Rating: ${rating}`}</p>
          <p className="price">{`Price: $${price}`}</p>
          <p className="review">{`Review: ${review}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recommendation Dashboard</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-medium">Twitter Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Get Recommendations
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* User Insights Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">User Insights</h2>

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
          <h3 className="text-lg font-bold mb-2">User Tweets</h3>
          {tweets && tweets.length > 0 && (
            <WordCloudComponent tweets={tweets} />
          )}
        </div>
      </div>
      {recommendations && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Recommendation</h2>
          {recommendations.best && recommendations.best["product 1"] ? (
            <div className="mb-4">
              <img
                src={recommendations.best["product 1"].image_link}
                alt={recommendations.best["product 1"].product_name}
                className="w-full h-auto"
              />
              <p className="font-semibold">
                {recommendations.best["product 1"].product_name}
              </p>
              <p>{recommendations.best["product 1"].reason}</p>
            </div>
          ) : (
            <p>No top recommendation available</p>
          )}
          <h2 className="text-xl font-semibold mb-4">Top 5 Recommendations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendations.top_5 &&
              Object.values(recommendations.top_5).map((rec, index) => (
                <div key={index} className="border p-4 rounded">
                  <img
                    src={rec["image link"]}
                    alt={rec["product name"]}
                    className="w-full h-auto mb-2"
                  />
                  <p>{rec.description}</p>
                </div>
              ))}
          </div>
          <h2 className="text-xl font-semibold mb-4">In-domain Predictions</h2>
          {recommendations["in-domain"] &&
            Object.entries(recommendations["in-domain"]).map(
              ([domain, items]) => {
                const topBestParsed =
                  typeof items.top_best === "string"
                    ? safeParse(items.top_best)
                    : items.top_best;

                return (
                  <div key={domain} className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">{domain}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {items.top_5 && (
                        <div className="col-span-full">
                          <h4 className="text-md font-semibold mb-2">Top 5</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Object.values(safeParse(items.top_5)).map(
                              (rec, index) => (
                                <div key={index} className="border p-4 rounded">
                                  <img
                                    src={rec["image link"]}
                                    alt={rec["product name"]}
                                    className="w-full h-auto mb-2"
                                  />
                                  <p className="font-semibold">
                                    {rec["product name"]}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                      {topBestParsed && topBestParsed["product 1"] && (
                        <div className="col-span-full">
                          <h4 className="text-md font-semibold mb-2">
                            Top Best
                          </h4>
                          <div className="border p-4 rounded">
                            <img
                              src={topBestParsed["product 1"]["image link"]}
                              alt={topBestParsed["product 1"]["product name"]}
                              className="w-full h-auto mb-2"
                            />
                            <p className="font-semibold">
                              {topBestParsed["product 1"]["product name"]}
                            </p>
                            <p>{topBestParsed["product 1"].reason}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                      {/* Ratings vs. Number of Users */}
                      <div className="bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-lg font-bold mb-2">
                          Ratings vs. Number of Users
                        </h3>
                        <ResponsiveContainer width="100%" height={400}>
                          <BarChart data={ratingData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="rating" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                              dataKey="count"
                              fill="rgba(75, 192, 192, 0.6)"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Ratings Over Time */}
                      <div className="bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-lg font-bold mb-2">
                          Ratings Over Time
                        </h3>
                        <ResponsiveContainer width="100%" height={400}>
                          <LineChart data={timeSeriesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="x"
                              tickFormatter={(tick) =>
                                new Date(tick).toLocaleDateString()
                              }
                              label={{
                                value: "Time",
                                position: "insideBottomRight",
                                offset: -5,
                              }}
                            />
                            <YAxis
                              type="number"
                              dataKey="y"
                              name="Rating"
                              label={{
                                value: "Rating",
                                angle: -90,
                                position: "insideLeft",
                              }}
                            />
                            <Tooltip
                              content={<CustomTooltip1 />}
                              labelFormatter={(label) =>
                                new Date(label).toLocaleDateString()
                              }
                            />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="y"
                              stroke="rgba(75, 192, 192, 1)"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Average Rating vs Price */}
                      <div className="bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-lg font-bold mb-2">
                          Average Rating vs Price
                        </h3>
                        <ResponsiveContainer width="100%" height={400}>
                          <ScatterChart>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" name="Average Rating" />
                            <YAxis dataKey="y" name="Price" />
                            <Tooltip
                              content={<CustomTooltip2 />}
                              cursor={{ strokeDasharray: "3 3" }}
                            />
                            <Legend />
                            <Scatter
                              data={scatterData}
                              fill="rgba(75, 192, 192, 0.6)"
                            />
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
        </div>
      )}
    </div>
  );
};

export default RecommendationDashboard;
