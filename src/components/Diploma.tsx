import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Dip from './Dip.jpg';

function Diploma() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const score = queryParams.get('score');
  const navigate = useNavigate();
  const totalQuestions = queryParams.get('totalQuestions');

  const diplomaStyle: React.CSSProperties = {
    backgroundImage: `url(${Dip})`, 
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '200px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  };

  const textStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '10px',
    borderRadius: '5px',
  };

  const handleGoBack = () => {
    navigate('/test');
  };

  return (
    <>
      <div style={diplomaStyle}>
        <div style={textStyle}>
          <h2>Диплом</h2>
          <p>Поздравляем, {name}!</p>
          <p>Вы успешно прошли тест и набрали {score}/ {totalQuestions} баллов.</p>
        </div>
      </div>
      <button onClick={handleGoBack}>Перейти к списку тестов</button>
    </>
  );
}

export default Diploma;