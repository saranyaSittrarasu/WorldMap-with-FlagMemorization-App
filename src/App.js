import React from "react";
import WordlMap from "./components/WorldMap";
import data from "./WorldData.geo.json";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import TakeaQuiz from "./components/TakeaQuiz"


const App=()=> {
  return (
    <Routes>
      <Route path="/" element={<WordlMap data={data} />} />
      <Route path="/takeaQuiz" element={<TakeaQuiz />} />
      </Routes>
  );
}

export default App;
