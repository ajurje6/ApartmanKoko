import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import "./i18n";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Accommodation from "./pages/Accommodation";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

function App() {
  const [count, setCount] = useState(0);

  return (
    <HelmetProvider>
      <Router>
        <div>
          <Header /> {/* Include the Header component */}

          {/* Define your routes */}
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

