const mongoose = require('mongoose');

const Playlist = new mongoose.Schema({
    name : {type : String},
    father : {type : mongoose.ObjectId,
        ref : 'Father'},
    videos : [{
        name : {type : String},
        URL : {type : String},
        descripcion: {type : String}
    }],
    linked: [{
        child: {type: mongoose.ObjectId,ref:'Childs'}
    }]
});

module.exports = mongoose.model('Playlist',Playlist)