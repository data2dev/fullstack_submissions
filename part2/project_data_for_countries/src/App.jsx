import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountries(response.data));
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredCountries([]);
      return;
    }

    const matches = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(matches);
  }, [query, countries]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const renderCountryDetails = (country) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p><strong>Capital:</strong> {country.capital?.[0]}</p>
        <p><strong>Area:</strong> {country.area} km²</p>
        <h4>Languages:</h4>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="150" />
      </div>
    );
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Country Finder</h1>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter country name..."
      />
      <div style={{ marginTop: '1rem' }}>
        {filteredCountries.length > 10 && <p>Too many matches, please refine your search.</p>}

        {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
          <ul>
            {filteredCountries.map((country) => (
              <li key={country.cca3}>{country.name.common}</li>
            ))}
          </ul>
        )}

        {filteredCountries.length === 1 && renderCountryDetails(filteredCountries[0])}
      </div>
    </div>
  );
}

export default App;
