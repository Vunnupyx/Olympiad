import React from "react";
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/Layout/MainPage/MainPage";
import Layout from "./components/Layout/Layout";
import GamePage from "./components/Layout/GamePage/GamePage";
import ResultPage from "./components/Layout/ResultPage/ResultPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<MainPage/>}/>
                    <Route path="game/:id" element={<GamePage/>}/>
                    <Route path="game/:id/result" element={<ResultPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
