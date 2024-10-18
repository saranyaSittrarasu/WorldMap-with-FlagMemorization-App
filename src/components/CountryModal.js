import React from "react";
import "../CSS/CountryModal.css"; // You can style the modal here

const CountryModal = ({ show, onClose, country }) => {
  if (!show || !country) return null;
  // fetch('https://restcountries.com/v3.1/all')
  // .then(response => response.json())
  // .then(data => {
  //   data.forEach(country => {
  //     console.log(`Name: ${country.name.common}`);
  //     console.log(`Capital: ${country.capital ? country.capital[0] : 'N/A'}`);
  //     console.log(`Flag: ${country.flags.png}`);
  //   });
  // });
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{country.properties.name}</h2>
        <p><strong>Capital:</strong> {country.properties.continent || "N/A"}</p>
        {/* <p><strong>Population:</strong> {country.properties.pop_est.toLocaleString()}</p> */}
        <img src="https://flagcdn.com/in.svg" alt="My Icon" width={350} height={350} />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CountryModal;
