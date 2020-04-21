const path = require('path')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const logger = require('morgan')

require('./db/mongoose')

const indexRouter = require('./routes/index')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const layoutsPath = path.join(__dirname, '../templates/layouts')

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(expressLayouts)
app.use(express.static(publicDirectoryPath))
app.use('/images', express.static(path.join(__dirname, '../../../images')))


app.use(express.json())
app.use(indexRouter)

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})