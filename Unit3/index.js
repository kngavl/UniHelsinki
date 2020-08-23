const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()
const Person = require("./models/person")
const PORT = process.env.PORT

app.use(express.static("build"))
app.use(express.json())
morgan.token("body", (request) => {return JSON.stringify(request.body)})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))
app.use(cors())

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

app.get("/api/persons", (request, response) => {
    Person.find({}).then(people => {
        response.json(people.map(person => person.toJSON()))
    })
})

app.get("/info", (request, response) => {
    Person.find({}).then(people => {
        response.send(`<p>The phonebook contains ${people.length} people</p></br>${Date()}`)
    })
})

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            }
            else {
                response.status(404).end()
            }}).catch(error => next(error))})

app.post("/api/persons", (request, response, next) => {
    const body = request.body
    const generatedID = Math.floor(Math.random() * (10000))

    if (body.name === undefined) {
        return response.status(400).json({ error: "content missing" })
    }

    const person = new Person({
        name: body.name.toLowerCase(),
        number: body.number,
        identifier: generatedID
    })

    person.save().then(savedPerson => {
        response.json(savedPerson.toJSON())
    }).catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id).then(response.status(204).end()
    ).catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new:true }).then(updatedPerson => {
        response.json(updatedPerson)
    }).catch(error => next(error))
})


//const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})