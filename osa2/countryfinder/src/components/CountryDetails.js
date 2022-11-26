const CountryDetails = ({country}) => {
    return(
        <>
        <h1>{country.name.common}</h1>
        <div>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        </div>
        <p><b>Languages:</b></p>
        <ul>
            {Object.keys(country.languages).map(language =>
                <li key={language}>{country.languages[language]}</li>
                )}
        </ul>
        <img alt={`Flag of ${country.name.common}`} src={country.flags["png"]} ></img>
        </>
    )
}

export default CountryDetails