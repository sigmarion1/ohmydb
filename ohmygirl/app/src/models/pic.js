const mongoose = require('mongoose')

const pic = mongoose.model('pic', {
    group :{
        type: String,
    },
    no :{
        type: Number,
    },
    who : {
        type: Array,
    },
    path_original : {
        type: String,
    },
    path_thumbnail : {
        type: String,
    },
    isGroup : {
        type: Boolean,
    }

}, 'pic')

module.exports = pic
