const express = require('express')


const connect_db_app = require('./Utils/db')
const ORIGIN = process.env.ORIGIN || 'http://localhost:3000'
const PORT = process.env.PORT || 8000

const app = express()
connect_db_app()

/* middlewares */
app.use(express.json())

/* start server */
const server = app.listen(PORT);


console.log(`Server listing on port: ${PORT}`)