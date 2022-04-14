const Answers = require("../models/Answers");
const Games = require("../models/Games");
const Sessions = require("../models/Sessions");
const Questions = require("../models/Questions");
const {validationResult} = require("express-validator");

class gamesController {
    async initGame(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400)
                .json({
                    message: "Ошибка", errors
                });

            const {count} = req.body;
            let questionsLength = Number(await Questions.find().count());

            let questions = await Questions.find().then((data) => {
                let list = [];
                for (let i = 0; (i < count) && (i < questionsLength); i++) {
                    let r = Math.floor(Math.random() * (questionsLength - i)) + i;
                    let city = data[r];
                    data[r] = data[i];
                    data[i] = city;

                    list.push(city);
                }
                return list
            });

            const game = new Games({lastQuestion: 0})
            await game.save().then((dataGame) => {
                questions.map(async (questionItem, index) => {
                    const gameSession = new Sessions({
                        gameId: dataGame._id,
                        questionId: questionItem._id,
                        answerId: '',
                        order: index
                    })

                    await gameSession.save()
                })
                return res.json({
                    gameId: dataGame._id, questionsLength: questions.length
                });
            });
        } catch (e) {
            console.log(e);
            res.send({message: `Ошибка сервера при создании игры ${e.message}`});
        }
    }

    async getGame(req, res) {
        try {
            const {id} = req.body;
            const game = await Games.findOne({_id: id});
            let questionsLength = await Sessions.find({gameId: id}).count();
            if (!game) return res.status(412).json({message: "Ошибка сервера при получении игры."});
            return res.json({
                gameId: id,
                questionsLength: questionsLength - game.lastQuestion
            });
        } catch (e) {
            console.log('Ошибка сервера при getGame', e);
            return res.send({message: "Ошибка сервера при получении игр."});
        }
    }

    async getQuestion(req, res) {
        try {
            const {id} = req.body;
            const game = await Games.findById(id);
            if (!game) return res.status(412).json({message: "Ошибка сервера при получении списка игр."});
            let sessions = await Sessions.findOne({gameId: id, order: game.lastQuestion})
            if (!sessions) return res.status(403).json({message: "Сессия не найдена."});
            let answers = await Answers.find({questionId: sessions.questionId}).select('-isRight');
            let questions = await Questions.findById(sessions.questionId)
            return res.json({
                sessionId: sessions._id,
                questions: questions,
                answers: answers
            });
        } catch (e) {
            console.log('Ошибка сервера при getQuestion', e);
            return res.send({message: "Ошибка сервера при получении списка вопросов и ответов."});
        }
    }

    async setAnswer(req, res) {
        try {
            const {sessionId, questionId, answerId} = req.body;
            let sessions = await Sessions.findOneAndUpdate({
                _id: sessionId,
                answerId: "",
                questionId: questionId
            }, {answerId: answerId}, {new: true})
            //Возвращаю всегда результат ответа: верный/ не верный. Требований к этому не было.
            let answers = await Answers.findOne({_id: answerId})
            if (sessions) await Games.findByIdAndUpdate({_id: sessions.gameId}, {lastQuestion: sessions.order + 1})
            return res.json({
                answers: answers['isRight']
            });
        } catch (e) {
            console.log('Ошибка сервера при setAnswer', e);
            return res.send({message: "Ошибка сервера при записи ответа."});
        }
    }

    async setCompleted(req, res) {
        try {
            const {id} = req.body;
            const game = await Games.findByIdAndUpdate(id, {completed: true});

            if (!game) return res.status(412).json({message: "Ошибка сервера при получении списка игр."});

            let correctAnswers = 0;
            await Sessions.find({gameId: id}).then(async (session) => {
                for (const sessionItem of session) {
                    const answer = await Answers.findById(sessionItem.answerId)
                    if (answer['isRight']) correctAnswers += 1;
                }
            })
            return res.json({
                correctAnswers: correctAnswers
            });
        } catch (e) {
            console.log('Ошибка сервера при setCompleted', e);
            return res.send({message: "Ошибка сервера при заверщении игры."});
        }
    }
}


module.exports = new gamesController();
