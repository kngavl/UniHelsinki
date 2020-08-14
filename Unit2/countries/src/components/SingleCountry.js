import React from "react"
import Weather from "./Weather"

const SingleCountry = ({country}) => {
    return (
        <div>
            <div>
                <h1>{country.name}</h1>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
                <h2>Languages</h2>
                <ul>
                    {country.languages.map(language => {
                        return (
                            <li key={language.iso639_1}>{language.name}</li>
                        )
                    })}
                </ul>
                <img src={country.flag} alt="country flag" width="300px" object-fit="contain"/>
            </div>
            <Weather capital={country.capital}/>
        </div>
    )
}

export default SingleCountry