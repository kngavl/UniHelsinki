import React, {useState, useEffect} from 'react';
import Filter from "./Filter"
import Countries from "./Countries"
import axios from "axios"

const App = () => {
    const [filter, setFilter] = useState([]);
    const [countries, setCountries] = useState([]) 

    useEffect(() => {
        axios
        .get("https://restcountries.eu/rest/v2/all")
        .then(response => {
            setCountries(response.data)
        })
    }, [])
    
    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }

    return (
        <div>
            <Filter onChange={handleFilterChange}/>
            <Countries filter={filter} countries={countries} />
        </div>
    )
}

export default App