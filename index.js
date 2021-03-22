const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
require('dotenv').config()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//Test
app.get('/', (req, res) => {
    res.send("API is ready !")
})

//Auth Route
const user = require('./modules/auth/auth.route')
app.use('/api/auth', user)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Listen to port ${PORT}`))