import React, { useState } from "react";
import Quiz from "./Quiz";
import { quizData, q } from "./Q1";

interface QuizItem { 
    question: string;
    options: string[];
    correctAnswer: string;
}

export default function Test() {
    const [currentQuiz, setCurrentQuiz] = useState<QuizItem[] | null>(null); 
    const [buttonsVisible, setButtonsVisible] = useState<boolean>(true);

    const showQuiz1 = () => {
        setCurrentQuiz(quizData);
        setButtonsVisible(false);
    };

    const showQuiz2 = () => {
        setCurrentQuiz(q);
        setButtonsVisible(false);
    };

    return (
        <div>
            <h1>Онлайн тест</h1>
            {buttonsVisible && (
                <>
                    <button onClick={showQuiz1} style={{ cursor: 'pointer', background:'#7cc5d9'}}>
                        <img width={150} height={100} src='/Q1.jpg' alt="тест 1" />
                        <p style={{display:'centre'}}> ТЕСТ 1</p>
                    </button>
                    <button onClick={showQuiz2} style={{ cursor: 'pointer', background:'#7cc5d9'}}>
                        <img width={150} height={100} src='/Q2.jpg' alt="тест 2" />
                        <p style={{display:'centre'}}> ТЕСТ 2</p>
                    </button>
                </>
            )}
            {currentQuiz && <Quiz quizData={currentQuiz} />}
        </div>
    );
}

