const {Schema, model} = require('mongoose');

const Games = new Schema({
    completed: {type: Boolean, default: false},
    lastQuestion: {type: Number, required: true}
})

module.exports = model('Games', Games);
