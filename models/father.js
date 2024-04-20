const mongoose = require('mongoose');

const father = new mongoose.Schema({
    name : {type : String},
    lastname : {type : String},
    email : {type : String},
    phone : {type : Number},
    age : {type : Number},
    password : {type : String},
    pin : {type : Number},
    country : {type : String},
    birthdate : {type : String},
    status : {type : Boolean},
    avatar : {type : Number}
});

module.exports = mongoose.model('Father', father);