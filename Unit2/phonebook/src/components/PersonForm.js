import React from 'react'

const PersonForm = (props) => {
    return (
        <form>
            <div>
            name: <input value={props.newName} onChange={props.handleNameChange}/>
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handlePhoneChange}/>
            </div>
            <div>
                <button type="submit" onClick={props.handleSubmit}>add</button>
            </div>
        </form>
    )
}

export default PersonForm