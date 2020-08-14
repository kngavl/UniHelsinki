import React from "react"
import SingleCountry from "./SingleCountry"
import Button from "./Button"

const Countries = ({filter, countries}) => {
    let filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter))

    if (filteredCountries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else if (filteredCountries.length === 1) {
        return (
            <SingleCountry country={filteredCountries[0]}/>
        )
    } else {
        return (
            <div>
                {filteredCountries.map(country => {
                    return (
                        <div key={country.name}>
                            <p>{country.name}</p>
                            <Button country={country}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Countries