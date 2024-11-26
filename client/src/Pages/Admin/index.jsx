import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // For navigation
import IconBreadcrumbs from '@/components/BreadCrumbs';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Footer from '@/components/shared/Footer';
import Header from '@/components/Header';

const AdminPage = () => {
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
    { label: 'Admin', href: '/admin', icon: <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
  ];

  // Function to handle card navigation
  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <Header /> {/* This renders the Header component */}
      <Container sx={{ mt: 4, mb: 5 }}>
        {/* Grid layout for Breadcrumbs and Content */}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
              {/* Breadcrumbs */}
              <IconBreadcrumbs Items={breadcrumbItems} />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Admin Dashboard
            </Typography>
          </Grid>

          {/* Cards layout for Admin sections */}
          <Grid container spacing={4} item xs={12}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => handleCardClick('/admin/profile')}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Profile
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      View and edit your profile information.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => handleCardClick('/admin/settings')}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Settings
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Manage your application settings.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => handleCardClick('/admin/linemanager')}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      View Manager
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      View and manage line manager details.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => handleCardClick('/admin/dashboard')}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Access your dashboard overview.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => handleCardClick('/admin/logout')}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Log Out
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Log out of your account.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Footer /> {/* This renders the Footer component */}
    </>
  );
};

export default AdminPage;
