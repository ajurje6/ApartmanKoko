import { useState } from 'react';
import "./i18n";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Accommodation from './pages/Accommodation';
import Home from './pages/Home';
import Gallery from './pages/Gallery';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <Header /> {/* Include the Header component */}
        
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
