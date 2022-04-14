const {Schema, model} = require('mongoose');

const Sessions = new Schema({
    answerId: {type: String},
    gameId: {type: String},
    order: {type: Number},
    questionId: {type: String},
})

module.exports = model('Sessions', Sessions);
