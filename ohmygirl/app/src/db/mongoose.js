const mongoose = require('mongoose')

mongoose.connect('mongodb://mongodb:27017/ohmydb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

