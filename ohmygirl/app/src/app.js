const path = require('path')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const logger = require('morgan')

require('./db/mongoose')

const indexRouter = require('./routes/index')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

app.use(logger('common'))
app.use(expressLayouts)
app.use(express.static(publicDirectoryPath))
app.use('/image_db', express.static(path.join(__dirname, '../image_db')))


// app.use(express.json())
app.use(indexRouter)

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})