import React, {useState} from "react"
import SingleCountry from "./SingleCountry"

const Button = ({country}) => {
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }

    if (!show) {
        return (
            <div>
                <button onClick={handleShow}>Show</button>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={handleShow}>Hide</button>
                <SingleCountry country={country}/>
            </div>
        )
    }
}

export default Button