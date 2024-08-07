import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar'
import './App.css';
import MovieSearch from './components/Domains/MovieSearch';
import Dashboard from './components/Twitter/Dashboard';
import AllBeauty from './components/Domains/AllBeauty';
import AmazonFashion from './components/Domains/AmazonFashion';
import CellPhones from './components/Domains/CellPhones';
import RecommendationDashboard1 from './components/Recommendations/RecommendationDashboard1';
import Mainsidebar from './components/NavBar/Mainsidebar';
import Books from './components/Domains/Books';
import Personalize from './components/Graphs/Personalize';

function App() {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedTweets, setSelectedTweets] = useState([]);
  const [selectedBeauty, setSelectedBeauty] = useState([]);
  const [selectedFashion, setSelectedFashion] = useState([]);
  const [selectedPhones, setSelectedPhones] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [username, setUsername] = useState('');

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Navbar selectedDomain={selectedDomain} />

        <div className="flex flex-grow">
          <Mainsidebar selectedDomain={selectedDomain} />

          <div className='flex-grow ml-48 p-4'>
            <Routes>
              <Route 
                path="/watchlist" 
                element={<MovieSearch setSelectedMovies={setSelectedMovies} />} 
                onEnter={() => handleDomainSelect('Movies')}
              />
              <Route 
                path="/twitter" 
                element={<Dashboard setSelectedTweets={setSelectedTweets} setUsername={setUsername}/>} 
              />
              <Route 
                path="/allbeauty" 
                element={<AllBeauty onSelectedItemsChange={setSelectedBeauty} />} 
                onEnter={() => handleDomainSelect('Beauty')}
              />
              <Route 
                path="/fashion" 
                element={<AmazonFashion onSelectedItemsChange={setSelectedFashion} />} 
                onEnter={() => handleDomainSelect('Fashion')}
              />
              <Route 
                path="/phones" 
                element={<CellPhones onSelectedItemsChange={setSelectedPhones} />} 
                onEnter={() => handleDomainSelect('Phones')}
              />

             <Route 
                path="/books" 
                element={<Books onSelectedBooksChange={setSelectedBooks} />} 
                onEnter={() => handleDomainSelect('Books')}
              />
              <Route 
                path="/personalize" 
                element={<Personalize 
                  selectedMovies={selectedMovies} 
                  selectedBooks={selectedBooks} 
                  tweets={selectedTweets} 
                  beauty={selectedBeauty} 
                  fashion={selectedFashion} 
                  phones={selectedPhones} 
                />} 
              />
              <Route 
                path="/llm1" 
                element={<RecommendationDashboard1 
                  selectedMovies={selectedMovies} 
                  selectedBooks={selectedBooks} 
                  tweets={selectedTweets} 
                  beauty={selectedBeauty} 
                  fashion={selectedFashion} 
                  phones={selectedPhones} 
                  username={username} 
                />} 
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
