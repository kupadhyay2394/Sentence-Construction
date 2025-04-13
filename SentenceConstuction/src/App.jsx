import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home"
import Quize from "./Components/Quiz"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/quize" element={<Quize />} />
      </Routes>
    </Router>
  );
}

export default App;
