const mongoose = require('mongoose')

const Pic = mongoose.model('Pic', {
    name :{
        type: String,
    },
    group :{
        type: String,
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

})

module.exports = Pic