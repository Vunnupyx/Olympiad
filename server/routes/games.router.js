const Router = require('express');
const router = new Router();
const {check} = require('express-validator');
const controller = require('../controllers/gamesController');

router.post('/addGame',
    [
        check('count', 'Количество не может быть пустым').notEmpty()
    ],
    controller.initGame
)
router.post('/getGame',
    [
        check('id', 'Идентификатор не может быть пустым').notEmpty()
    ], controller.getGame);

router.post('/getQuestion',
    [
        check('id', 'Идентификатор не может быть пустым').notEmpty()
    ], controller.getQuestion);
router.post('/setAnswer',
    [
        check('sessionId', 'Идентификатор не может быть пустым').notEmpty(),
        check('questionId', 'Идентификатор не может быть пустым').notEmpty(),
        check('answerId', 'Идентификатор не может быть пустым').notEmpty()
    ], controller.setAnswer);

router.post('/setCompleted',
    [
        check('id', 'Идентификатор не может быть пустым').notEmpty()
    ], controller.setCompleted);

module.exports = router;
