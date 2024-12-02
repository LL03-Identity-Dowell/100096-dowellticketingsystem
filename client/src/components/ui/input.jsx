import * as React from 'react';
import { TextField as MuiTextField, Select as MuiSelect, InputLabel } from '@mui/material';
import { cn } from '@/lib/utils';
import PropTypes from 'prop-types'; // Import PropTypes

// Input Component
const Input = React.forwardRef(({ className = '', type, ...props }, ref) => {
  const classname = cn(
    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    className
  );

  return (
    <input
      type={type}
      className={classname}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

// Prop validation for Input component
Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

// TextField Component
const TextField = ({ label, value, className = '', onChange, ...props }) => {
  const classname = cn(
    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    className
  );

  return (
    <MuiTextField
      label={label}
      className={classname}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

// Prop validation for TextField component
TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

// Select Component
const Select = ({ labelId, value, label, className = '', onChange, children }) => {
  const classname = cn(
    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    className
  );

  return (
    <MuiSelect
      labelId={labelId}
      value={value}
      label={label}
      onChange={onChange}
      className={classname}
    >
      {children}
    </MuiSelect>
  );
};

// Prop validation for Select component
Select.propTypes = {
  labelId: PropTypes.string.isRequired, // ID for accessibility
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Supports string or numeric values
  label: PropTypes.string.isRequired, // The label for the select
  className: PropTypes.string, // Additional classes for styling
  onChange: PropTypes.func.isRequired, // Event handler for selection changes
  children: PropTypes.node.isRequired, // Nodes representing the menu items
};

// Default Props (if necessary)
Select.defaultProps = {
  label: '',
};

export { Input, TextField, Select, InputLabel };
