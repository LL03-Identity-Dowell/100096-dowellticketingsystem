import { useState } from 'react';
import PropTypes from 'prop-types';

export default function LevelSelector({ onChange }) {
  const [selectedLevel, setSelectedLevel] = useState('');
  
  const levels = [
    { value: '1', name: '1' },
    { value: '2', name: '2' },
    { value: '3', name: '3' },
    { value: '4', name: '4' },
    { value: '5', name: '5' },
    { value: '6', name: '6' },
    { value: '7', name: '7' },
    { value: '8', name: '8' },
    { value: '9', name: '9' },
    { value: '10', name: '10' }
  ];

  const handleChange = (event, level) => {
    setSelectedLevel(level.value);
    if (onChange) onChange(level.value); // Call the passed onChange handler
  };

  return (
    <span style={{ fontSize: '0.875rem', fontWeight: 'bold' ,display:'flex', margin:'12px' }}>
      Levels:
      <small className="levels-container">
        {levels.map((level) => (
          <div
            key={level.value}
            className={`level-item ${selectedLevel === level.value ? 'level-item-selected' : ''}`}
            onClick={(e) => handleChange(e, level)}
          >
            {level.name} {/* Or use level.value */}
          </div>
        ))}
      </small>
    </span>
  );
}

LevelSelector.propTypes = {
  onChange: PropTypes.func, // Callback when a level is selected
};
