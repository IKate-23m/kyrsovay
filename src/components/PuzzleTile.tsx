import React from 'react';

interface PuzzleTileProps {
  index: number;
  emptyIndex: number;
  moveTile: (index: number) => void;
  size: number;
  isSolved: boolean;
  imageUrl: string;
}

function PuzzleTile({
  index,
  emptyIndex,
  moveTile,
  size,
  isSolved,
  imageUrl
}: PuzzleTileProps) {
  const isMovable = !isSolved && (
    (index - 1 === emptyIndex && Math.floor(index / size) === Math.floor(emptyIndex / size)) ||
    (index + 1 === emptyIndex && Math.floor(index / size) === Math.floor(emptyIndex / size)) ||
    (index - size === emptyIndex) ||
    (index + size === emptyIndex)
  );

  const handleClick = () => {
    if (isMovable) {
      moveTile(index);
    }
  };

  return (
    <div
      className="puzzle-tile"
      onClick={handleClick}
      style={{
        border: '1px solid black',
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: isMovable ? 'pointer' : 'default',
        backgroundImage: `url(${imageUrl})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        color: 'transparent',
        fontSize: '20px',
        fontWeight: 'bold',
      }}
    >
    </div>
  );
}

export default PuzzleTile;
