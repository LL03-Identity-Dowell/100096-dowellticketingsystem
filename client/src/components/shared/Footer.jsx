import React from 'react';
import { Box, Typography, Avatar, IconButton, Grid, Link, Container } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '@/assets/logo.png';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#212121',
        color: '#fff',
        padding: '20px 0',
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Avatar alt="Logo" src={logo} sx={{ width: 60, height: 60, marginBottom: '10px' }} />
            <Typography variant="body2">
              Customer Support | Line Manager
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h8" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="/about" color="inherit" underline="hover" display="block">
                <small style={{color:'white'}}>About Us</small>
              </Link>
              <Link href="/contact" color="inherit" underline="hover" display="block">
                <small style={{color:'white'}}>Contact Us</small>
              </Link>
              <Link href="/faq" color="inherit" underline="hover" display="block">
                <small style={{color:'white'}}>FAQ</small>
              </Link>
            </Box>
          </Grid>

          {/* Social Icons and Notifications */}
          <Grid item xs={12} md={4}>
            <Typography variant="h8" gutterBottom>
              Stay Connected
            </Typography>
            <Box>
                <small style={{margin:'2px'}}><MailIcon /></small>
                <small style={{margin:'2px'}}><NotificationsIcon /></small>
                
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ marginTop: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'white' }}>
            <small style={{textAlign:'center'}}>© {new Date().getFullYear()} Customer Support. All rights reserved.</small>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
