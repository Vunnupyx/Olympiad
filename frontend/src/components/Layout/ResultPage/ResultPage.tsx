import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import gameAPI from "../../../API/gameAPI";
import {useDispatch} from 'react-redux';
import {clearAlert} from "../../../redux/Actions/alertActions";
import {Divider} from "antd";
import './ResultPage.scss';

const ResultPage = () => {
    const urlParams = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearAlert());
    }, []);

    const [correctAnswers, setCorrectAnswers] = useState(-1)

    useEffect(() => {
        gameAPI.setCompleted(urlParams.id).then((data) => {
            setCorrectAnswers(data.correctAnswers)
        })
    }, [urlParams.id]);

    return (<div className="result-page">
            <div className="result-page__header">
                <div className="title">Результаты</div>
            </div>
            <Divider/>
            <div className="result-page__content">
                <div className="result-page__subtitle">Количество правильных ответов: {correctAnswers}</div>
                <Link to={`/`}>
                    Перейти на главную
                </Link>
            </div>
        </div>);
}
export default ResultPage;