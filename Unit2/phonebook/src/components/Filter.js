import React from "react"

const Filter = ({onChange}) => {
    return (
        <form>
            <div>
                filter names with: <input onChange={onChange}/>
            </div>
        </form>
    )
}

export default Filter