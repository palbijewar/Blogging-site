const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    fname:{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    title: {
        type:String,
        require:true, 
        num : ["Mr", "Mrs", "Miss"]
    }, 
    email: {
        type:String,
        require:true,  
        unique:true,
        validate: {
            validator: function (email) {
              // Regular expression to validate email format
              const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
              return emailRegex.test(email);
            },
            message: 'Please enter a valid email address'
          }
    }, 
    password: {
        type: String,
        required: true,
        minlength: 8
    } 
},{timestamps:true});

module.exports = mongoose.model('author', authorSchema);