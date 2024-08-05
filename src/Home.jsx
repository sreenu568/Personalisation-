import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// Components
import MovieTab from './components/MovieTab';
import TwitterTab from './components/TwitterTab';
import BooksComponent from './components/BooksComponent';

function Header() {
  return (
    <header>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/movie">Movie</Link></li>
          <li><Link to="/twitter">Twitter</Link></li>
        </ul>
      </nav>
    </header>
  );
}

function Home() {
  return (
    <Router>
      <div>
        <Header />
        <div className="container">
          <div className="row">
































































































































































































            
            <div className="col">
              <Routes>
                <Route path="/movie" component={MovieTab} />
                <Route path="/twitter" component={TwitterTab} />
              </Routes>
            </div>
            <div className="col">
              <BooksComponent />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Home;
