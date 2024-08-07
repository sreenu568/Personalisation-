import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WordCloudComponent = ({ tweets }) => {
  const [wordcloudUrl, setWordcloudUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (tweets.length > 0) {
      fetchWordcloud();
    }
  }, [tweets]);

  const fetchWordcloud = async () => {
    setIsLoading(true);
    setError('');
    try {
      console.log("Sending request to generate word cloud with tweets:", tweets);
      const tweetTexts = tweets.map(tweet => tweet.text); // Ensure only text is sent
      const response = await axios.post('https://wordcloud-2b03167c6e0f.herokuapp.com/extract', { tweets: tweetTexts });
      console.log("Received response:", response.data);
      if (response.data.wordcloud_url) {
        setWordcloudUrl(`https://wordcloud-2b03167c6e0f.herokuapp.com/${response.data.wordcloud_url}`);
      } else {
        setError('Failed to generate word cloud');
      }
    } catch (error) {
      console.error('Error generating word cloud:', error.response);
      setError('Error generating word cloud: ' + error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <p>Loading word cloud...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {wordcloudUrl && <img src={wordcloudUrl} alt="Word Cloud" />}
    </div>
  );
};

export default WordCloudComponent;
