const path = require('path')
const express = require('express')
const logger = require('morgan')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env')})

require('./db/mongoose')

const indexRouter = require('./routes/index')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(logger(process.env.LOGGER || 'common'))
app.use(express.static(publicDirectoryPath))
app.use('/image_db', express.static(path.join(__dirname, '../image_db')))


app.use(express.json())
app.use(indexRouter)


const port = (process.env.BACK_PORT || 4000)

app.listen(port, () => {
    console.log('Ohmygirl Back-end Server is up on port : ' + port)
})