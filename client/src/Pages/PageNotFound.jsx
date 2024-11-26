// src/components/PageNotFound.js
import { Box, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button/Button';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', padding: '50px' }}>
      <Typography variant="h3" color="error">
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        sx={{ marginTop: 3 }}
        onClick={() => navigate('/')} // Navigate to the home page
         label='Go to Home'
      />
    </Box>
  );
};

export default PageNotFound;
