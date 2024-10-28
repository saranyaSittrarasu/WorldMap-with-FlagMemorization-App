import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, geoMercator } from "d3";
import useResizeObserver from "../useResizeObserver";
import CountryModal from "./CountryModal";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const continentColors = {
  Africa: "#f4a582",
  Europe: "#92c5de",
  Asia: "#b2182b",
  Oceania: "#d6604d",
  "North America": "#67a9cf",
  "South America": "#053061",
};

const WorldMap = ({ data }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [countryDetails, setCountryDetails] = useState(null);
  const [errorMessage,setErrorMessage]=useState(null);
const Navigate = useNavigate();
 
  const handleModalClose = () => {
    setSelectedCountry(null);
    setShowModal(false); 
  };
  
  const openModal = async (feature) => {
    try{
    const response= await axios.get(`https://restcountries.com/v3.1/name/${feature.properties.name}`);
   
   if(response?.data.length>0){
    const countryData=response?.data.filter((country) => country?.name?.common === feature?.properties?.name);
    setCountryDetails(countryData?.[0]);
    setSelectedCountry(feature);
    setShowModal(true);
   }
    }
    catch(error){
      const errorMessage = error;
      setErrorMessage(errorMessage);
    }
  };
  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();
    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data)
      .precision(100);

    const pathGenerator = geoPath().projection(projection);

    svg
      .selectAll(".country")
      .data(data.features)
      .join("path")
      .on("click", (event, feature) => openModal(feature)
       )
      .attr("class", "country")
      .transition()
      .attr("fill", (feature) => {
        const continent = feature.properties.continent; 
        return continentColors[continent] || "#ccc"; 
      })
      .attr("d", feature => pathGenerator(feature));

  }, [data, selectedCountry]
);

  return (
    <>
     <h2>World Map with color code for continents</h2>
    <div ref={wrapperRef} style={{ display: "flex", flexDirection: "row", marginBottom: "2rem" }}>
      <svg ref={svgRef} style={{ flex: 1 }}></svg>
      <div style={{ marginLeft: "1rem" }}>
        <h3>Continent Colors</h3>
        <ul>
          {Object.keys(continentColors).map((continent) => (
            <li key={continent} style={{ marginBottom: "0.5rem" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "20px",
                  backgroundColor: continentColors[continent],
                  marginRight: "0.5rem",
                }}
              ></span>
              {continent}
            </li>
          ))}
        </ul>
        
      </div>
      <CountryModal
        show={showModal}
        onClose={handleModalClose} 
        country={selectedCountry}
        countryDetails={countryDetails}
        error={errorMessage}
      />

    </div>
    <div><button onClick={()=>Navigate("/takeaQuiz")} >Take a Quiz</button></div>
    </>
  );
};

export default WorldMap;
