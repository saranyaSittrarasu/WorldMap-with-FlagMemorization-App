import React from "react";
import "../CSS/CountryModal.css"; 
const CountryModal = ({ show, onClose, country,countryDetails,error }) => {
  if (!show || !country) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      {countryDetails?(<>
        <h2>{countryDetails?.name?.common}</h2>
        <p><strong>Capital:</strong> {countryDetails?.capital[0] || "N/A"}</p>
       <img src={countryDetails?.flags.png} alt="My Icon" style={{border:"1px solid black"}} width={350} height={350} />  </>
      ):(<p>{error}  </p>)}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CountryModal;
