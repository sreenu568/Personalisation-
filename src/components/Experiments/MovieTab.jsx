import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is properly imported

function MovieTab() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  const handleAddMovie = () => {
    if (title && review) {
      setMovies([...movies, { title, review }]);
      setTitle('');
      setReview('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 to-gray-900 flex flex-col items-center p-4">
      <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden w-full p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Movie Reviews</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter movie title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full mb-2 focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Enter movie review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleAddMovie}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300 w-full"
        >
          Submit
        </button>
        <div className="mt-6">
          {movies.map((movie, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md mb-4">
              <h2 className="text-xl font-bold text-gray-800">{movie.title}</h2>
              <p className="text-gray-700">{movie.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieTab;


//https://api.themoviedb.org/3/search/movie?query=the%20boys&include_adult=false&api_key=b2a367476250dce79e5107c6a46d0a2d&language=en-US&page=1%27;4