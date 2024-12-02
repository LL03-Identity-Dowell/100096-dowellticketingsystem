import PropTypes from 'prop-types';
import { Button as MuiButton } from '@mui/material';

export default function Button({ label,type, onClick, variant, color, size, startIcon, endIcon, disabled }) {
  return (
    <MuiButton
      variant={variant}
      color={color}
      type={type}
      size={size}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      sx={{
        margin: '8px', // Add spacing around the button
        textTransform: 'none', // Prevents uppercase transformation of text
      }}
    >
      <small>{label}</small>
    </MuiButton>
  );
}

// PropTypes for validation
Button.propTypes = {
  label: PropTypes.string.isRequired, // Button label text
  onClick: PropTypes.func, // Callback when button is clicked
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']), // MUI Button variants
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'info', 'warning']), // MUI Button colors
  size: PropTypes.oneOf(['small', 'medium', 'large']), // MUI Button sizes
  startIcon: PropTypes.element, // Optional icon displayed at the start
  endIcon: PropTypes.element, // Optional icon displayed at the end
  disabled: PropTypes.bool, // Disable button
  type:PropTypes.string
};

// Default Props
Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
  size: 'medium',
  onClick: () => {},
  startIcon: null,
  endIcon: null,
  disabled: false,
};
