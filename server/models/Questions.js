const {Schema, model} = require('mongoose');

const Questions = new Schema({
    title: {type: String, required: true},
})

module.exports = model('Questions', Questions);
