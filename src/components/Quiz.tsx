import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuizItem {
    question: string;
    options: string[];
    correctAnswer: string;
}

interface QuizProps {
    quizData: QuizItem[];
}

export function Quiz({ quizData }: QuizProps) {
    const [answers, setAnswers] = useState<string[]>(Array(quizData.length).fill('')); 
    const [showResults, setShowResults] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [showNameInput, setShowNameInput] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleAnswer = (questionIndex: number, answer: string) => { 
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answer;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        setShowResults(true);
    };

    const handleRestart = () => {
        setAnswers(Array(quizData.length).fill(''));
        setShowResults(false);
        setName('');
        setShowNameInput(false);
    };

    const handleGetName = () => {
        setShowNameInput(true);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setName(event.target.value);
    };

    const handleGetDiploma = () => {
        const { correct } = calculateResults();
        navigate(`/diploma?name=${name}&score=${correct}&totalQuestions=${quizData.length}`);
    };


    const calculateResults = () => {
        let correctAnswers = 0;
        for (let i = 0; i < quizData.length; i++) {
            if (answers[i] === quizData[i].correctAnswer) {
                correctAnswers++;
            }
        }
        return {
            correct: correctAnswers,
            incorrect: quizData.length - correctAnswers,
        };
    };

    const results = calculateResults();
    const quizLength = quizData.length;
return (
        <div>
            {!showResults ? (
                <>
                    {quizData.map((question, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <p>{index + 1}. {question.question}</p>
                            {question.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleAnswer(index, option)}
                                    style={{marginRight: '10px',
                                        padding: '5px 10px',
                                        backgroundColor: answers[index] === option ? (option === question.correctAnswer ? 'green' : 'red') : '#eee',
                                        color: answers[index] === option ? 'white' : 'black',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                    disabled={answers[index] !== ''} 
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    ))}
                    <button onClick={handleSubmit} disabled={answers.includes('')}> 
                        Завершить тест
                    </button>
                </>
            ) : (
                <div>
                    <h3>Результаты: {results.correct}/{quizLength}</h3>
                    <p><button onClick={handleRestart}>Начать тест сначала</button></p>
                    {!showNameInput ? (
                        <p><button onClick={handleGetName}>Получить диплом</button></p>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Введите ваше имя"
                                value={name}
                                onChange={handleNameChange}
                            />
                            <button onClick={handleGetDiploma} disabled={!name}>Подтвердить</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Quiz;