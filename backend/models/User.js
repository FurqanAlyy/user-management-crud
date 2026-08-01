const mongoose = require('mongoose');


const userschema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{13}$/, "CNIC must be exactly 13 digits"],
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userschema);

