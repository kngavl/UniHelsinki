import React, { useState, useEffect } from 'react'
import Numbers from "./Numbers"
import Filter from "./Filter"
import PersonForm from "./PersonForm"
import ErrorNotification from "./ErrorNotification"
import SuccessNotification from "./SuccessNotification"
import personService from "../services/persons"

const App = () => {
    const [persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("");
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    useEffect(() => {
        personService.getAll()
        .then(initialPersons => {
            setPersons(initialPersons)
        })
    }, [])

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setNewNumber(e.target.value);
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
        let newNameLowerCase = newName.toLowerCase();
        let individual = {name: newNameLowerCase, number: newNumber}
        let filteredList = persons.filter(person => person.name === newNameLowerCase)
        if (filteredList.length === 0) {
            personService.create(individual)
            .then(response => {
                setPersons([...persons, response]);
                setNewName("")
                setNewNumber("")
                setSuccessMessage(`${response.name} has been added!`)
                setTimeout(() => {setSuccessMessage(null)}, 3000)
            })
        } else {
            if (window.confirm(`${newNameLowerCase} is already included in the phonebook, replace the old number with a new one?`)) {
                personService.updateID(filteredList[0].id, individual)
                .then(response => {
                    setPersons(persons.map(person => person.id !== response.id ? person : response))
                    setSuccessMessage(`${individual.name}'s phone number has been updated!`)
                    setTimeout(() => {setSuccessMessage(null)}, 3000)
                }).catch(error => {
                    setErrorMessage(`${individual.name} has already been removed from the server`)
                    setTimeout(() => {setErrorMessage(null)}, 3000)
                    personService.getAll()
                    .then(initialPersons => {
                    setPersons(initialPersons)
                })
                })
            }
        }
    }

    const filterNames = (e)=> {
        setFilter(e.target.value.toLowerCase());
    }

    const deleteIndividual = (e) => {
        e.preventDefault()
        const individual = persons.filter(person => person.name === e.target.value)
        if (window.confirm(`Delete ${individual[0].name}?`)) {
            personService.deleteID(individual[0].id).then(() => {
                setPersons(persons.filter(person => person.id !== individual[0].id))
                setErrorMessage(`${individual[0].name} has been removed from the list!`)
                setTimeout(() => {setErrorMessage(null)}, 3000)
            }).catch(error => {
                setErrorMessage(`${individual[0].name} has already been removed from the server`)
                setTimeout(() => {setErrorMessage(null)}, 3000)
            })
        }
    }
    
    return (
        <div>
            <SuccessNotification message={successMessage}/>
            <ErrorNotification message={errorMessage}/>
            <h2>Phonebook</h2>
            <Filter onChange={filterNames}/>
            <h2>Add a new Number</h2>
            <PersonForm 
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handlePhoneChange={handlePhoneChange}
                handleSubmit={handleSubmit}
            />
            <h2>Numbers</h2>
            <Numbers 
                persons={persons} 
                filter={filter} 
                deleteIndividual={deleteIndividual}/>
        </div>
  )
}

export default App