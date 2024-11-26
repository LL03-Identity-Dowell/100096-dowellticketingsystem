import PropTypes from 'prop-types';  // Import PropTypes for validation
import { IconButton } from '@mui/material';


export default function EmojiButton({ onClick }) {
  // Validation for onClick prop
  if (onClick && typeof onClick !== 'function') {
    console.error('EmojiButton expects "onClick" to be a function');
  }

  return (
    <IconButton onClick={onClick}>
      <span role="img" aria-label="emoji" style={{fontSize:'12px', marginRight:'2px', marginLeft:'2px'}}>
        😊
      </span>
    </IconButton>
  );
}

// PropTypes for validation
EmojiButton.propTypes = {
  onClick: PropTypes.func, // Ensure onClick is a function
};
