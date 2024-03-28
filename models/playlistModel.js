const mongoose = require('mongoose');

const Playlist = new mongoose.Schema({
    name : {type : String},
    father : {type : mongoose.ObjectId,
        ref : 'Father'},
    videos : [{
        name : {type : String},
        URL : {type : String}
    }]
});

module.exports = mongoose.model('Playlist',Playlist)