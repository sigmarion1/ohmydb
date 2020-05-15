const mongoose = require('mongoose')

const db_id = process.env.MONGO_INITDB_ROOT_USERNAME || 'admin'
const db_pw = process.env.MONGO_INITDB_ROOT_PASSWORD || 'admin1'
const db_host = process.env.DB_HOST || 'localhost'
const db_port = process.env.DB_PORT || '27017'

mongoose.connect(`mongodb://${db_id}:${db_pw}@${db_host}:${db_port}/admin`, {
    dbName: "ohmydb",
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
