import React, { useState } from 'react';
import Logo from './twitter-logo.png'; // Import your Twitter logo or any other image
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is properly imported

const Dashboard = () => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col justify-center items-center p-4">
      <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden w-full -mt-16"> {/* Negative margin to move the dashboard up */}
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
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300" onClick={() => console.log(inputText)}>
            Submit
          </button>
        </div>
        {/* Display input text */}
        {inputText && (
          <div className="px-4 py-4 bg-gray-100 border-t border-gray-300">
            <p className="text-gray-800 font-medium">{inputText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
