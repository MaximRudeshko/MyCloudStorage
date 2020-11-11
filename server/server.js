const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth.routes')
const config = require('config')

const app = express()

app.use(express.json())

app.use("/api/auth", authRouter)


const start = async () => {
    try {
        await mongoose.connect(config.get('dbURL'), {
            useCreateIndex: true,
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        
        app.listen(config.get('serverPort'), () => {
            console.log('Server has been started')
        })

    } catch (error) {
        console.log('Server Error')
    }
}

start()

