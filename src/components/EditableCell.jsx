import React, { useRef, useEffect } from 'react';

const EditableCell = ({ index, totalCells }) => {
  const cellRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const direction = event.shiftKey ? -1 : 1;
        const nextIndex = (index + direction + totalCells) % totalCells;
        cells[nextIndex].focus();
      }
    };

    cellRef.current.addEventListener('keydown', handleKeyDown);

    return () => {
      cellRef.current.removeEventListener('keydown', handleKeyDown);
    };
  }, [index, totalCells]);

  return (
    <div
      ref={cellRef}
      contentEditable
      style={{ border: '1px solid black', margin: '5px', padding: '5px' }}
    >
      Cell {index + 1}
    </div>
  );
};