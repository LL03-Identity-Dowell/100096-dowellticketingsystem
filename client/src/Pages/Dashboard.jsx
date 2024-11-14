import * as React from 'react';
import PropTypes from 'prop-types';  // Import PropTypes for prop validation
import Header from '../components/Header'; // Importing the Header component
import { Container, Grid, Typography, Box, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from "@mui/material";
import {
    AccountCircleOutlined as AccountCircle,
    NotificationsActiveOutlined as NotificationsIcon,
    MailOutlined as MailIcon,
} from '@mui/icons-material';
import IconBreadcrumbs from '../components/BreadCrumbs';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import SearchBar from '../components/SearchBar';
// Reusable StatCard component to display each stat in a card
function StatCard({ title, value, icon: Icon }) {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Icon sx={{ fontSize: 40, marginRight: 2 }} />
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 1 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

// Adding prop validation for StatCard
StatCard.propTypes = {
  title: PropTypes.string.isRequired,  // title should be a string and is required
  value: PropTypes.string.isRequired,  // value should be a string and is required
  icon: PropTypes.elementType.isRequired,  // icon should be a React component (e.g., Material-UI Icon)
};

export default function DashBoard() {

  // Sample data for breadcrumbs
  const breadcrumbItems = [
    { label: 'MUI', href: '/', icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
    { label: 'Core', href: '/material-ui/getting-started/installation/', icon: <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
    { label: 'Breadcrumb', href: '#', icon: <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
  ];

  // Sample data for the table
  const tableData = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { name: 'Michael Brown', email: 'michael@example.com', role: 'Editor' },
  ];

  // Sample messages for the chat room
  const [messages, setMessages] = React.useState([
    { user: 'John Doe', message: 'Hello, how are you?' },
    { user: 'Jane Smith', message: 'I am good, thanks!' },
  ]);

  const [newMessage, setNewMessage] = React.useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { user: 'You', message: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <>
      <Header /> {/* This renders the Header component */}
      <Container sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
            {/* Breadcrumbs and SearchBar in the same row */}
            <IconBreadcrumbs Items={breadcrumbItems} />

            {/* SearchBar */}
            <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                <SearchBar />
            </Box>
            <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                <SearchBar />
            </Box>
        </Box>
        <Typography variant="h5" gutterBottom>
          Dashboard Overview
        </Typography>

        <Grid container spacing={3}>
          {/* Stat Cards Grid */}
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Users"
              value="1,245"
              icon={AccountCircle}  // You can use any Material Icon
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Active Sessions"
              value="56"
              icon={NotificationsIcon}  // You can use any Material Icon
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="New Messages"
              value="12"
              icon={MailIcon}  // You can use any Material Icon
            />
          </Grid>
        </Grid>

        {/* Table and Chat Room Section */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {/* Table Section */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Users Table
            </Typography>
            <TableContainer>
              <Table>
                <TableHead className='head'>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'Bold' }}>{' '}</TableCell>
                    <TableCell style={{ fontWeight: 'Bold' }}>Desk Name</TableCell>
                    <TableCell style={{ fontWeight: 'Bold' }}>Service Manager</TableCell>
                    <TableCell style={{ fontWeight: 'Bold' }}>Ticket Waiting</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Chat Room Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className='head' gutterBottom>
              <span style={{margin:"20px"}}>Ticket Id- 3453564657577rrty5h57</span>
            </Typography>
            <Box
              sx={{
                border: '1px solid #ccc',
                padding: 2,
                maxHeight: 300,
                overflowY: 'scroll',
                mb: 2,
                backgroundColor: '#f9f9f9',
              }}
            >
              {messages.map((msg, index) => (
                <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
                  <strong>{msg.user}: </strong>{msg.message}
                </Typography>
              ))}
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Grid>
        </Grid>

        {/* Summary Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            This is a summary of your dashboard activity. You can view the statistics, user details, recent chat messages, and more. Use the sections above to manage user data and communicate with your team.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
