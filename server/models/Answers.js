const {Schema, model} = require('mongoose');

const Answers = new Schema({
    title: {type: String, required: true},
    questionId: {type: String, required: true},
    isRight: {type: Boolean, required: true},
})

module.exports = model('Answers', Answers);
