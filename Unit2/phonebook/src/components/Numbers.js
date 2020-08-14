import React from 'react'

const Numbers = ({persons, filter, deleteIndividual}) => {
    let filteredPersons = persons.filter((person) => person.name.includes(filter))
    return (
        <div>
            {filteredPersons.map((person) => {
                let newNameCapitalized = person.name.split(" ").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");
                return (
                    <div key={newNameCapitalized}>
                        <p>{newNameCapitalized} {person.number} <button type="submit" onClick={deleteIndividual} value={person.name}>delete</button></p>
                    </div>
                )
            })}
        </div>
    )
}

export default Numbers