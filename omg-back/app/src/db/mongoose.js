const mongoose = require('mongoose')

const db_host = process.env.DB_HOST || 'localhost'
const db_user = process.env.DB_USER || 'admin'
const db_pw = process.env.DB_PW || 'admin'
const db_name = process.env.DB_NAME || 'page'

mongoose.connect(`mongodb+srv://${db_user}:${db_pw}@${db_host}/${db_name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('db connected!'))
