import React from 'react';

interface LeaderboardEntry {
  name: string;
  moves: number;
}

interface LeaderboardProps {
  data: LeaderboardEntry[];
  onClear: () => void; 
}

function Leaderboard({ data, onClear }: LeaderboardProps) {
  const handleDelete = () => {
    if (onClear) {
      onClear();
    }
  }
 
  const sortedData = [...data].sort((a, b) => a.moves - b.moves);

  return (
    <div>
      <h2>Таблица лидеров</h2>
      <table>
        <thead>
          <tr>
            <th>Игрок</th>
            <th>Шаги</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.moves}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDelete}>Очистить список</button>
    </div>
  );
}

export default Leaderboard;


