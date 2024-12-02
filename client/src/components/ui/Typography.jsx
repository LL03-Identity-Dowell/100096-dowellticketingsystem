import PropTypes from 'prop-types';

const Title = ({ text, size = 1 }) => {
  const sizeClass = size === 1 ? 'text-xl' : `text-${size}xl`;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className={`font-poppins font-bold tracking-tighter ${sizeClass} text-gray-700`}>
        {text}
      </h1>
    </div>
  );
};

// Prop validations
Title.propTypes = {
  text: PropTypes.string.isRequired, // Ensure text is a required string
  size: PropTypes.number,            // Ensure size is an optional number
};

// Default Props
Title.defaultProps = {
  size: 1, // Default size is 1
};

export {Title};
