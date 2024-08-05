import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Tweetsdash from './Tweetsdash';
import Banner from './components/Banner';
import Sample from './components/Sample';
import MovieSearch from './components/MovieSearch';
import LLMComponent from './components/LLMComponent';
import TwitterTweets from './components/TwitterTweets';
import Dashboard from './components/Dashboard';
import Recommendation from './components/Recommendation';
import AllBeauty from './components/AllBeauty';
import AmazonFashion from './components/AmazonFashion';
import CellPhones from './components/CellPhones';
import RecommendationDashboard from './components/RecommendationDashboard';
import TopProducts from './components/TopProducts';
import ProductDetails from './components/ProductDetails';
import Ratingplot from './components/Ratingplot';
import DomainDropdown from './components/DomainDropdown';
import RecommendationDashboard1 from './components/RecommendationDashboard1';

function App() {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedTweets, setSelectedTweets] = useState([]);
  const [selectedBeauty, setSelectedBeauty] = useState([]);
  const [selectedFashion, setSelectedFashion] = useState([]);
  const [selectedPhones, setSelectedPhones] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [username, setUsername]=useState('');

  const domains = [
    'Books',
    'Movies',
    'Beauty',
    'Fashion',
    'Phones',
    // Add more domains as needed
  ];

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    // Additional logic to handle domain selection
    console.log(`Selected domain: ${domain}`);
  };
  
  const handleSelectedBooksChange = (books) => {
    setSelectedBooks(books);
  };
  const handleSelectedItemsChange = (items) => {
    setSelectedBeauty(items);
  };
  const handleSelectedFashionChange = (items) => {
    setSelectedFashion(items);
  };
  const handleSelectedPhonesChange = (phones) => {
    setSelectedPhones(phones);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/watchlist" element={<MovieSearch setSelectedMovies={setSelectedMovies} />} />
        <Route path="/twitter" element={<Dashboard setSelectedTweets={setSelectedTweets} setUsername={setUsername}/>} />
        <Route path="/allbeauty" element={<AllBeauty onSelectedItemsChange={handleSelectedItemsChange}/>} />
        <Route path="/fashion" element={<AmazonFashion onSelectedItemsChange={handleSelectedFashionChange}/>} />
        <Route path="/phones" element={<CellPhones onSelectedItemsChange={handleSelectedPhonesChange}/>} />
        {/*<Route path="/llm" element={<LLMComponent selectedMovies={selectedMovies} selectedBooks={selectedBooks} tweets={selectedTweets} beauty={selectedBeauty} fashion={selectedFashion} phones={selectedPhones}/>} />*/}
        {/*<Route path="/llm1" element={<RecommendationDashboard selectedMovies={selectedMovies} selectedBooks={selectedBooks} tweets={selectedTweets} beauty={selectedBeauty} fashion={selectedFashion} phones={selectedPhones} username={username}/>} />*/}
        <Route path="/llm1" element={<RecommendationDashboard1 selectedMovies={selectedMovies} selectedBooks={selectedBooks} tweets={selectedTweets} beauty={selectedBeauty} fashion={selectedFashion} phones={selectedPhones} username={username}/>} />
        {/*<Route path="/llm1" element={<ProductDetails/>} />*/}
        {/*<Route path="/llm1" element={<Ratingplot bookTitle="Five Stars" domain="Books"/>}/>*/}
        {/*<Route path="/llm1" element={<DomainDropdown domains={domains} onSelect={handleDomainSelect}/>} />*/}

      </Routes>
      <div className="flex flex-row space-x-4 p-4 overflow-x-auto">
        <Sample onSelectedBooksChange={handleSelectedBooksChange}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
