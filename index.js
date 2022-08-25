const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const validator = require('express-validator')
const slugify = require('slugify')

const validationRoute = require('./routes/validation')

const port = 8000

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

app.use('/validation', validationRoute)

app.listen (port, () => {
    console.log(`Server is running on port ${port}`)
})