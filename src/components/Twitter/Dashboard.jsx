// Dashboard.jsx

import React, { useState } from 'react';
import axios from 'axios';
import Logo from '/home/sree/Desktop/test/vite-project/src/twitter-logo.png'; // Import your Twitter logo or any other image
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is properly imported
import WordCloudComponent from "../Graphs/WordCloudComponent";

const Dashboard = ({ setSelectedTweets, setUsername}) => {
  const [inputText, setInputText] = useState('');
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const fetchTweets = async () => {
    try {
      const apiUrl = `https://persona1-14c3597db9ce.herokuapp.com/api/twitter/${inputText}`;
      const response = await axios.get(apiUrl);
      setUsername(inputText);
      setTweets(response.data);
      setSelectedTweets(response.data); // Pass tweets to the parent component
      setError(null);
    } catch (error) {
      setError('Error fetching tweets. Please try again later.');
      console.error('Error fetching tweets:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden w-full -mt-16">
        <div className="flex justify-center items-center py-6 bg-blue-700">
          <img className="w-12 mx-4" src={Logo} alt="Twitter Logo" />
          <h1 className="text-2xl font-bold text-white">Twitter Dashboard</h1>
        </div>
        <div className="flex justify-center items-center my-4 px-4">
          <input
            type="text"
            placeholder="Enter the twitter username"
            value={inputText}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2 rounded-md mr-2 focus:outline-none w-full focus:border-blue-500"
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
            onClick={fetchTweets}
          >
            Submit
          </button>
        </div>
        {/* Display input text */}
        {inputText && !error && tweets.length === 0 && (
          <div className="px-4 py-4 bg-gray-100 border-t border-gray-300">
            <p className="text-gray-800 font-medium">{inputText}</p>
          </div>
        )}
        {/* Display error */}
        {error && (
          <div className="px-4 py-4 bg-red-100 border-t border-red-300">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}
        <div className="flex">
          {/* Display tweets */}
          {tweets.length > 0 && (
            <div className="px-4 py-4 bg-gray-100 border-t border-gray-300 w-1/2">
              {tweets.map((tweet, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-800 font-medium">Tweet created at {tweet.created_at}:</p>
                  <p className="text-gray-600">{tweet.text}</p>
                </div>
              ))}
            </div>
          )}
          {/* Display wordcloud */}
          <div className="px-4 py-4 bg-gray-100 border-t border-gray-300 w-1/2">
            <WordCloudComponent tweets={tweets} /> {/* Pass tweets as props to WordCloudComponent */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
