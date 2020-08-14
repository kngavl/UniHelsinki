import React, {useState, useEffect} from "react"
import axios from "axios"

const Weather = ({capital}) => {
    const [weather, setWeather] = useState([])
    const [ready, setReady] = useState(false);
    const api_key = process.env.REACT_APP_WEATHER_API_KEY

    useEffect(() => {
        axios
        .get("http://api.weatherstack.com/current", {
            params: {
                access_key: api_key,
                query: {capital}
            }
        })
        .then(response => {
            console.log("promise fufilled")
            setWeather(response.data)
            setReady(true);
        })
    }, [api_key, capital])

    if (ready) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p><strong>Temperature: {weather.current.temperature} Celsius</strong></p>
                <p><strong>Wind: {weather.current.wind_speed} km/h {weather.current.wind_dir}</strong></p>
            </div>
        )
    } else {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p><strong>Temperature: Loading... </strong></p>
                <p><strong>Wind: Loading...</strong></p>
            </div>
        )
    }
    
}

export default Weather