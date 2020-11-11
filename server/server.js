const express = require('express')
const mongoose = require('mongoose')

const app = express()


const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://maxim:12345qwe@cluster0.6zm2l.mongodb.net/cloudStorage?retryWrites=true&w=majority', {
            useCreateIndex: true,
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        
        app.listen(5000, () => {
            console.log('Server has been started')
        })

    } catch (error) {
        console.log('Server Error')
    }
}

start()

