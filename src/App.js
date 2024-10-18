import React from "react";
import WordlMap from "./components/WorldMap";
import data from "./WorldData.geo.json";
import "./App.css";

function App() {
  return (
    <>
      <h2>World Map with color code for continents</h2>
      <WordlMap data={data} />
     
    </>
  );
}

export default App;
