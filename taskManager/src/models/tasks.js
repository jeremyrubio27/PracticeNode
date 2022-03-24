
const mongoose = require('mongoose');
const validator = require('validator');


const Tasks = mongoose.model('Task' , {
    description: {
        type: String,
        required:true,
        trim:true,
    },
    completed:{
        type: String,
        default: false,
    }
})



module.exports = Tasks;

