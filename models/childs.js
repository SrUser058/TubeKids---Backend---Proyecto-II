const mongoose = require('mongoose');

const childs = new mongoose.Schema({
    name : {type : String},
    age : {type : Number},
    pin : {type : Number},
    father : {type : mongoose.ObjectId,
    ref : 'Fathers'},
    avatar : {type : Number}
});

module.exports = mongoose.model('Childs', childs);