import React, {useState} from "react";
import {Button, Divider, Input} from "antd";
import "./MainPage.scss";
import gameAPI from "../../../API/gameAPI";
import {useNavigate} from "react-router-dom";

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState<string>();

    const getAllAnswer = () => {
        gameAPI.addGame(count).then((data) => {
            navigate(`game/${data.gameId}`);
        })
    };


    return (
        <div className="main-page">
            <div className="main-page__header">
                <div className="title">Клиенты</div>
            </div>
            <Divider/>
            <Input onChange={e => {
                setCount(e.target.value)
            }} placeholder="Количество вопросов"/>
            <Button
                onClick={getAllAnswer}
                className="btn"
                size="large"
            >
                Запустить игру
            </Button>

        </div>
    );
};

export default MainPage;
