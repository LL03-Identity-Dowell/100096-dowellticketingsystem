// src/pages/SettingsPage/SettingsPage.js
import Header from "@/components/Header";
import Footer from "@/components/shared/Footer";
import { Container, Typography, TextField,Grid, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import Button from "@/components/Button/Button";
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import IconBreadcrumbs from "@/components/BreadCrumbs";
const SettingsPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
    { label: 'Admin', href: '/admin', icon: <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
    { label: 'Settings', href: '/admin/profile', icon: <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
  ];

  return (
    <>
      <Header /> {/* This renders the Header component */}

      <Container sx={{ mt: 4, mb: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
                {/* Breadcrumbs */}
                <IconBreadcrumbs Items={breadcrumbItems} />
            </Box>
        <Typography variant="h4" gutterBottom>
          Account Settings
        </Typography>

        {/* Settings Form */}
        <form>
          <Grid container spacing={3}>
            {/* Username */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                defaultValue="JohnDoe" // Example username, you can pull this dynamically
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                defaultValue="john.doe@example.com" // Example email
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
              />
            </Grid>

            {/* Language Select */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select defaultValue="en">
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  {/* Add other languages here */}
                </Select>
              </FormControl>
            </Grid>

            {/* Notification Preferences */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Notification Preferences
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Notification Frequency</InputLabel>
                <Select defaultValue="daily">
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Save Button */}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" label='Save Changes' fullWidth />
            </Grid>
          </Grid>
        </form>
      </Container>

      <Footer /> {/* This renders the Footer component */}
    </>
  );
};

export default SettingsPage;
