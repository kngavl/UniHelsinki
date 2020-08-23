const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true)
const url = process.env.MONGODB_URI

console.log("connecting to", url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("connected to MongoDB"))
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uniqueCaseInsensitive: true,
        unique: true,
        minlength: 3
    },
    number: {
        type: String,
        required: true,
        minlength: 8
    },
    identifier: Number
})

//Remove the __V and _id fields from the frontend
personSchema.set("toJson", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

personSchema.plugin(uniqueValidator)


module.exports = mongoose.model("Person", personSchema)