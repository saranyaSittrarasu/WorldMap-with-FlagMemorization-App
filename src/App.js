import React from "react";
import WordlMap from "./components/WorldMap";
import data from "./WorldData.geo.json";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ContinentList from "./components/ContinentList"


const App=()=> {
  return (
    <Routes>
      <Route path="/" element={<WordlMap data={data} />} />
      <Route path="/continentList" element={<ContinentList />} />
      </Routes>
  );
}

export default App;
