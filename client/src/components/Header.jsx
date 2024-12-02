import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import logo from '../assets/logo.png';
import { Avatar, Tooltip } from '@mui/material';
import { useNavigate, useLocation  } from 'react-router-dom';
import useScreenType from '../hooks/useScreenType';
import SideBar from './shared/SideBar';

export default function Header() {
  const { isMobile } = useScreenType();
  const navigate =useNavigate();
  const location = useLocation();  // Use useLocation to get the current URL

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);

  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      style={{marginTop:'50px'}}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* Profile menu item */}
      {!location.pathname.includes('/admin/profile') && (
        <MenuItem onClick={() => { navigate('/admin/profile'); handleMenuClose(); }}>
          Profile
        </MenuItem>
      )}

      {/* Settings menu item */}
      {!location.pathname.includes('/admin/settings') && (
        <MenuItem onClick={() => { navigate('/admin/settings'); handleMenuClose(); }}>
          Settings
        </MenuItem>
      )}

      {/* View Manager menu item */}
      {!location.pathname.includes('/admin/linemanager') && (
        <MenuItem onClick={() => { navigate('/admin/linemanager'); handleMenuClose(); }}>
          View Manager
        </MenuItem>
      )}

      {/* Dashboard menu item */}
      {!location.pathname.includes('/admin/dashboard') && (
        <MenuItem onClick={() => { navigate('/admin/dashboard'); handleMenuClose(); }}>
          DashBoard
        </MenuItem>
      )}

      {/* Log Out menu item */}
      {!location.pathname.includes('/admin/logout') && (
        <MenuItem onClick={() => { navigate('/admin/logout'); handleMenuClose(); }}>
          Log Out
        </MenuItem>
      )}
    </Menu>
  );
  
  const [open, setOpen] = React.useState(false);
  const sidebaritems =[
    {href:'/admin/linemanager',name:'Topics', icon:<InboxIcon />},
    {href:'/admin/linemanager',name:'LineManagers', icon:<InboxIcon />},
    {href:'/admin/linemanager',name:'Links', icon:<InboxIcon />}
  ]
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{marginTop:'10px', marginBottom:'10px'}}
          >
            <Avatar alt="CustomerSupport" src={logo} sx={{width:'70px'}} />
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className='title-text'
            sx={{ display: { xs: 'none', sm: 'block' }, maxWidth:'438px', marginLeft:'30px' }}
          >
            Customer Support | Line Manager
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon className='icon' />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon className='icon' />
              </Badge>
            </IconButton>
            {isMobile?<IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuOutlinedIcon sx={{ fontSize: 40}} />
            </IconButton>:
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <Tooltip title="Profile">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                
                >
                {anchorEl?<AccountCircle sx={{ fontSize: 40 }} /> :<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />}
                </IconButton>
            </Tooltip>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuOutlinedIcon sx={{ fontSize: 40}}/>
            </IconButton>
            </Box>}
            
          </Box>
          
        </Toolbar>
        {/* SideBar for Mobile */}
        <SideBar open={open} onClose={toggleDrawer(false)} sidebaritems={sidebaritems} />
      </AppBar>
      
      {renderMenu}
    </Box>
  );
}
