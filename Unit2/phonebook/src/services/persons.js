import axios from "axios"
const baseURL = "http://localhost:3001/persons"

const create = (newObject) => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const deleteID = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const updateID = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {create, getAll, deleteID, updateID}