const mongoose = require('mongoose')

const ohmygirl = mongoose.model('ohmygirl', {
    engine :{
        type: String,
    },
    group :{
        type: String,
    },
    no :{
        type: Number,
    },
    created :{
        type: Date,
    },
    postName : {
        type: String,
    },
    checkImage : {
        type: Boolean,
    },
    page :{
        type: Number,
    },
    crawledTime :{
        type: Date,
    },
    who : {
        type: Array,
    },
    title : {
        type: String,
    },
    path_original : {
        type: String,
    },
    path_thumbnail : {
        type: String,
    },
    isGroup : {
        type: Boolean,
    },

}, 'ohmygirl')

module.exports = ohmygirl