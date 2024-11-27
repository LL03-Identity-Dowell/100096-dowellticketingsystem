// src/pages/ProfilePage/ProfilePage.js
import Header from '@/components/Header';
import Footer from '@/components/shared/Footer';
import { Container, Grid, Box, Typography, Avatar, TextField } from '@mui/material';
import Button from '@/components/Button/Button';
import IconBreadcrumbs from '@/components/BreadCrumbs';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';

const ProfilePage = () => {
  // Sample data for breadcrumbs
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
    { label: 'Admin', href: '/admin', icon: <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
    { label: 'Profile', href: '/admin/profile', icon: <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
  ];

  return (
    <div>
      <Header /> {/* This renders the Header component */}
      <Container sx={{ mt: 4, mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
                {/* Breadcrumbs */}
                <IconBreadcrumbs Items={breadcrumbItems} />
            </Box>
        <Grid container spacing={4}>
          {/* Left section for Profile Information */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar 
                alt="User Avatar" 
                src="/path-to-avatar.jpg" 
                sx={{ width: 120, height: 120, marginBottom: 2 }}
              />
              <Typography variant="h5">John Doe</Typography>
              <Typography variant="body1" color="textSecondary">
                johndoe@example.com
              </Typography>
              <Button variant="contained" sx={{ mt: 2 }} label={'Edit Profile'} />
            </Box>
          </Grid>

          {/* Right section for User Details */}
          <Grid item xs={12} md={8}>
            <Box sx={{ backgroundColor: '#f9f9f9', p: 4, borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" gutterBottom>Personal Information</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  label="Full Name"
                  value="John Doe"
                  variant="outlined"
                  fullWidth
                  disabled
                />
                <TextField
                  label="Email Address"
                  value="johndoe@example.com"
                  variant="outlined"
                  fullWidth
                  disabled
                />
                <TextField
                  label="Phone Number"
                  value="(123) 456-7890"
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </Box>

              {/* Account Settings Section */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>Account Settings</Typography>
                <Button variant="outlined" color="warning" label="Change Password" fullWidth />
              </Box>

              {/* Other settings or user-specific actions */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Additional Actions</Typography>
                <Button variant="outlined" fullWidth label="Logout" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer /> {/* This renders the Footer component */}
    </div>
  );
};

export default ProfilePage;
