import React from "react"

const Filter = ({onChange}) => {
    return (
        <form>
            <div>
                Find countries <input onChange={onChange}/>
            </div>
        </form>
    )
}

export default Filter