const Questions = require("../models/Questions");

class questionsController {
    async getAllQuestions(req, res) {
        try {
            const questions = await Questions.find();
            if (!questions)
                return res.status(412).json({message: "Ошибка сервера при получении списка всех треков."});
            return res.json(questions);
        } catch (e) {
            console.log('Ошибка сервера при getAllSongs', e);
            return res.send({message: "Ошибка сервера при получении списка всех треков."});
        }
    }
}


module.exports = new questionsController();
