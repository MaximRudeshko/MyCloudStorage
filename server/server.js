  
const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")
const filesRouter = require('./routes/file.routes')
const fileUpload = require('express-fileupload')
const app = express()
const PORT = config.get('serverPort')
const corsMiddleware = require('./middleware/cors.middleware')

app.use(corsMiddleware)
app.use(fileUpload({}))
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/files", filesRouter)


const start = async () => {
    try {
        await mongoose.connect(config.get("dbURL"), {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

