import React, { useState } from 'react';
import axios from 'axios';

function TwitterTweets() {
  const [username, setUsername] = useState('');
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);

  const fetchTweets = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5001/tweets?username=${username}`);
      setTweets(response.data.tweets);
      setError(null);
    } catch (error) {
      setError('Error fetching tweets. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Twitter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchTweets}>Fetch Tweets</button>

      {error && <p>{error}</p>}

      {tweets.length > 0 && (
        <div>
          {tweets.map((tweet, index) => (
            <div key={index}>
              <p>Tweet created at {tweet.created_at}</p>
              <p>{tweet.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TwitterTweets;
