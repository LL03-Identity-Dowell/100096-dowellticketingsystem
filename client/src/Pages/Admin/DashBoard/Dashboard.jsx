import PropTypes from 'prop-types';  // Import PropTypes for prop validation
import Header from '@/components/Header'; // Importing the Header component

import { Container, Grid, Typography, Box, Card, CardContent, Table,TablePagination, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {
    AccountCircleOutlined as AccountCircle,
    NotificationsActiveOutlined as NotificationsIcon,
    MailOutlined as MailIcon,
} from '@mui/icons-material';
import IconBreadcrumbs from '@/components/BreadCrumbs';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import SearchBar from '@/components/SearchBar';
import ChatList from './ChatList';
import LastChat from './LastChat/LastChat';
import Footer from '@/components/shared/Footer';
import  { useEffect, useState } from 'react';
import { getAllLineManagers, getAllTickets } from '@/services/api.services';


// Reusable StatCard component to display each stat in a card
function StatCard({ title, value, icon: Icon }) {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Icon sx={{ fontSize: 36, marginRight: 2 }} />
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
    { label: 'Home', href: '/', icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
    { label: 'Admin', href: '/admin', icon: <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
    { label: 'DashBoard', href: '/admin/dashboard', icon: <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
  ];

  const [tableData, setTableData] = useState([]);
  const [tableloading, setTableLoading] = useState(true);
  const [tableerror, setTableError] = useState(null);
  const [ticketsData, setTicketsData] = useState([]);
  const [ticketsloading, setTicketsLoading] = useState(true);
  const [ticketserror, setTicketsError] = useState(null);
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Max items per page

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        setTableLoading(true);
        const response = await getAllLineManagers();
        console.log(response.data); // Assuming the API response is in `response.data`
        setTableData(response.data.data);
      } catch (err) {
        setTableError('Failed to fetch line managers');
        console.error('Error:', err);
      } finally {
        setTableLoading(false);
      }
    };
    const fetchOpenTickets = async () => {
      try {
        const response = await getAllTickets();
        console.log(response.data); // Assuming the API response is in `response.data`
        setTicketsData(response.data.data);
      } catch (err) {
        setTicketsError('Failed to fetch open tickets');
        console.error('Error:', err);
      } finally {
        setTicketsLoading(false);
      }
    }
    fetchOpenTickets();
    fetchManagers();
  }, []);
  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };
  

  

  return (
    <>
      <Header /> {/* This renders the Header component */}
      <Container sx={{ mt: 4, mb:5 }}>
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
          
        </Typography>

        <Grid container spacing={3}>
          {/* Stat Cards Grid */}
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Line Managers"
              value={`${tableData ? tableData.length : 0}`}
              icon={AccountCircle}  // You can use any Material Icon
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Active Tickets"
              value={`${ticketsData?ticketsData.length:0}`}
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
              Line Managers
            </Typography>
            
            
            <TableContainer  className='topic-container'>
                <Table>
                  <TableHead  className='head'>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'Bold', color: 'white' }}>{' '}</TableCell>
                      <TableCell style={{ fontWeight: 'Bold', color: 'white' }}>Desk Name</TableCell>
                      <TableCell style={{ fontWeight: 'Bold', color: 'white' }}>Service Manager</TableCell>
                      <TableCell style={{ fontWeight: 'Bold', color: 'white' }}>Ticket Waiting</TableCell>
                    </TableRow>
                  </TableHead>
                  {tableloading? (
                    <Typography>Loading...</Typography>
                  ) : (
                    <TableBody>
                    {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Slice data for current page
                      .map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.role}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                  )}
                  
                </Table>
              </TableContainer>

              {/* Pagination Controls */}
              <TablePagination
                component="div"
                count={tableData.length} // Total number of items
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPageOptions={[5, 10, 20]} // Options for items per page
              />
            
          </Grid>

          {/* Chat Room Section */}
          {<ChatList />}
        </Grid>
        

        {/* Summary Section */}
        {<LastChat />}
      </Container>
      <Footer /> {/* This renders the Header component */}
    </>
  );
}
