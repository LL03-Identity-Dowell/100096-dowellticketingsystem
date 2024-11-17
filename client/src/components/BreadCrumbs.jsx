
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Link }from 'react-router-dom';
import PropTypes from 'prop-types';  // Import PropTypes for prop validation
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function IconBreadcrumbs({Items}) {
    const breadcrumbItems = Items;
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbItems.map((item, index) => (
          item.href ? (
            <Link
              key={index}
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              to={item.href}
            >
              {item.icon}
              {item.label}
            </Link>
          ) : (
            <Typography
              key={index}
              sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
            >
              {item.icon}
              {item.label}
            </Typography>
          )
        ))}
      </Breadcrumbs>
    </div>
  );
}
IconBreadcrumbs.propTypes = {
    Items: PropTypes.elementType.isRequired,  // icon should be a React component (e.g., Material-UI Icon)
  };
  