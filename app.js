const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./config/db')

// Load env config
dotenv.config({ path: './config/config.env' })

connectDb()

const app = express()

// Body parser
app.use(express.json())

// Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

// Listen
const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
