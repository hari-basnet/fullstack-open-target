import { useEffect, useState } from "react";
import "./App.css";
import countryServices from "./services/countryServices";
import Country from "./components/country";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [result, setResult] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filteredCountries = countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .startsWith(searchTerm.toLowerCase());
      });

      if (filteredCountries.length) {
        setResult(filteredCountries);
      }

      if (filteredCountries.length === 1) {
        countryServices.getCountryByName(searchTerm).then((response) => {
          setResult([response]);
        });
      }
    } else {
      console.log("running else");
      setResult([]);
    }
  }, [debouncedSearchTerm, countries]);

  useEffect(() => {
    countryServices.getAll(searchTerm).then((response) => {
      setCountries(response);
    });
  }, []);

  return (
    <div className="Main-application">
      <p>Find countries</p>
      <input value={searchTerm} onChange={handleSearchChange} />
      {result.length === 1 ? <Country country={result[0]} /> : null}
      {result.length > 10 ? (
        <p>Too many matches, specify another filter!!!</p>
      ) : (
        result.map((country) => {
          console.log(country);
          return <p key={country.name.common}>{country.name.common}</p>;
        })
      )}
    </div>
  );
}

export default App;
