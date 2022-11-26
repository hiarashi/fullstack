import CountryDetails from "./CountryDetails";

const CountryList = ({ value, countries, setFilter }) => {
  const filtered = countries.filter((e) =>
    e.name.common.toLowerCase().includes(value.toLowerCase())
  );
  console.log('Filtered: ',filtered)

  const handleShowClick = (country) => {
    setFilter(country.name.common)
  }

  if (value==='') {
    return <p>Enter search term</p>;
  }
  if (filtered.length > 10) {
    return <p>Too many matches, please narrow search</p>;
  }

  if (filtered.length === 0) {
    return <p>No matches found</p>;
  }

  if (filtered.length > 1) {
    return (
      <>
        {filtered.map((country, index) => (
          <div key={index}>
            <label>{country.name.common}</label>
            <button onClick={(event) => handleShowClick(country)}>Show</button>
          </div>
        ))}
      </>
    );
  }

  if (filtered.length === 1) {
    return <CountryDetails country={filtered[0]} />;
  }
};

export default CountryList;
