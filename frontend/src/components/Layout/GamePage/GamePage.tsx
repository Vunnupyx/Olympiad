import {useNavigate, useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import gameAPI from "../../../API/gameAPI";
import {Button, Divider, Form, Radio} from "antd";
import {Answer, Question, QuestionAndAnswers} from "../../../config/types";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../../redux/Reducers/rootReducer";
import {clearAlert, setErrorAlert, setSuccessAlert} from "../../../redux/Actions/alertActions";
import SuccessAlert from "../../Alerts/SuccessAlert/SuccessAlert";
import ErrorAlert from "../../Alerts/ErrorAlert/ErrorAlert";

const GamePage = () => {
    const urlParams = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearAlert());
    }, []);
    const error = useSelector((state: RootState) => state.alert.error);
    const success = useSelector((state: RootState) => state.alert.success);

    const [sessionId, setSessionId] = useState<string>('');
    const [question, setQuestion] = useState<Question>({_id: '', title: ''});
    const [answers, setAnswers] = useState<Answer[]>([]);

    const [questionsLength, setQuestionsLength] = useState(1)

    useEffect(() => {
        gameAPI.getGame(urlParams.id).then((data) => {
            setQuestionsLength(data.questionsLength);
        })
        gameAPI.getQuestion(urlParams.id).then((data: QuestionAndAnswers) => {
            setAnswers(data.answers);
            setQuestion(data.questions);
            setSessionId(data.sessionId);
        })
    }, [urlParams.id]);

    const onSubmit = useCallback((data) => {
        dispatch(clearAlert());
        gameAPI.setAnswer(sessionId, question._id, data['radio-button']).then((data) => {
            if (data.answers) dispatch(setSuccessAlert('Ответ верный')); else dispatch(setErrorAlert('Ответ не верный'));
        })
    }, [sessionId, question._id, answers]);

    const secondQuestion = () => {
        gameAPI.getQuestion(urlParams.id).then((data: QuestionAndAnswers) => {
            setAnswers(data.answers);
            setQuestion(data.questions);
            setSessionId(data.sessionId);
        })
        setQuestionsLength(questionsLength - 1)
    }

    const setCompleted = () => {
        navigate(`result`)
    }

    let games = answers.map((item: Answer, index: number) => {
        return (<Radio.Button key={index} value={item._id}>{item.title}</Radio.Button>)
    })
    return (<div className="game-page">
            <div className="game-page__header">
                <div className="title">Игра началась</div>
            </div>
            <Form
                form={form}
                name="items"
                className="form-calc"
                onFinish={onSubmit}
                layout="vertical"
            >
                <div className="form-calc__heads">
                    <div className="form-calc__subtitle">{question?.title}</div>
                    <Divider/>
                </div>
                <div className="form-calc__list">
                    <Form.Item
                        name="radio-button"
                        label="Выберите ответ"
                        rules={[{required: true, message: 'Please pick an item!'}]}
                    >
                        <Radio.Group>
                            {games}
                        </Radio.Group>
                    </Form.Item>
                </div>
                {success && (<Form.Item>
                        <SuccessAlert message={success}/>
                    </Form.Item>)}
                {error && (<Form.Item>
                        <ErrorAlert error={error}/>
                    </Form.Item>)}
                <Form.Item>
                    <Button type="default" htmlType="submit">
                        Ответить
                    </Button>
                </Form.Item>
            </Form>
            {questionsLength > 1 ? (<Button onClick={secondQuestion} type="default">
                    Следующий
                </Button>) : (<Button onClick={setCompleted} type="default">
                    Завершить игру
                </Button>)}
        </div>);
}
export default GamePage;