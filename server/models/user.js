const {Schema, model, ObjectId} = require("mongoose")


const User = new Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    diskSpace: {type: Number, default: 1024**3*10},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
})

module.exports = model('User', User)