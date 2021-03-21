const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: { type: String, required: true }, //all the validations needed for each piece of data
    description: { type: String, required: true }, 
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
}, { //optional settings for schema
    timestamps: true,
});

module.exports = new mongoose.model('Exercise', exerciseSchema);