import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@mui/icons-material/Check';

export default function CheckBox({ isChecked, onChange, disabled}) {
  // Provide a default noop function if onChange is not passed
  const [checked, setChecked]  =React.useState(isChecked?true:false)
  const handleClick = () => {
    if (!disabled) {
      const newChecked = !checked;
      setChecked(newChecked);
      if (onChange) {
        onChange(newChecked); // Only call onChange if it's provided
      }
    }
  };

  return (
    <span
      className={`checkbox ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      role="checkbox"
      aria-checked={checked}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {<CheckIcon />}{/*   checked && <CheckIcon /> */}
    </span>
  );
}

// PropTypes for validation
CheckBox.propTypes = {
  isChecked: PropTypes.bool.isRequired, // Whether the checkbox is checked
  onChange: PropTypes.func,            // Callback when the checkbox state changes (optional)
  disabled: PropTypes.bool,            // Whether the checkbox is disabled
};

// Default props
CheckBox.defaultProps = {
  disabled: false,
  onChange: () => {}, // Default to a no-op function if onChange is not passed
};
