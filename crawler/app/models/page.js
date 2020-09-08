const mongoose = require('mongoose')

const page = mongoose.model('page', {
    group :{
        type: String,
    },
    no :{
        type: Number,
    },
    images : {
        type: Number,
    },
    checked : {
        type: Date,
    },

}, 'page')

module.exports = page