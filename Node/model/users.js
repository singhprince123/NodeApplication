const mongoose = require('mongoose');

const Users = mongoose.model('Users',{
    name:{type:String, required : true},
    phone: {type:Number, required : true},
    email:{type: String, required : true},
    job:{type: String, required : true},
    resume: {type:String, required: true}
});

module.exports = { Users };