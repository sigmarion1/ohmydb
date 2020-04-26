const mongoose = require('mongoose')

const db_host = process.env.DB_HOST || 'localhost'
const db_port = process.env.DB_port || '27017'

mongoose.connect('mongodb://' + db_host + ':' + db_port + '/ohmydb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

