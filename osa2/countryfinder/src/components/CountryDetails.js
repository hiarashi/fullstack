import { useEffect, useState } from "react";
import axios from "axios";

const CountryDetails = ({country}) => {
    const [weather, setWeather] = useState({temp:0.0,description:'',icon:'04d',wind:0.0});
    /* const [latLon, setlatLon] = useState({lat:0.0, lon:0.0}); */

    useEffect(() =>{
        const api_key = process.env.REACT_APP_WEATHER_API_KEY;
        const city = country.capital[0];
        const code = country.cca2;
        let longitude = 0;
        let latitude = 0;
        axios
        .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${code}&appid=${api_key}`)
        .then(response => {
            /* setlatLon({lon:response.data[0].lon , lat: response.data[0].lat}) */
            longitude = response.data[0].lon;
            latitude = response.data[0].lat})
        .then(
            axios
            /* .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${api_key}`) */
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`)
            .then(response => {setWeather({
                temp: (response.data.main.temp-273.15).toFixed(2),
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
                wind: response.data.wind.speed})})
        )
        .catch((e) => console.log(e))
    },([country]))

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
        <h2>Weather in {country.capital[0]}</h2>
        <p>{`Temperature ${weather.temp}`}</p>
        <img alt={weather.description} src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}/>
        <p>{`Wind ${weather.wind}m/s`}</p>
        </>
    )
}

export default CountryDetails