import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import "./i18n";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Accommodation from './pages/Accommodation';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;


