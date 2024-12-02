import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PropTypes from 'prop-types';  // Import PropTypes
import { useNavigate, useLocation  } from 'react-router-dom';


export default function SideBar({ open, onClose,sidebaritems }) {
    const navigate =useNavigate();
    const location = useLocation();  // Use useLocation to get the current URL

    return (
        <Drawer open={open} onClose={onClose}>
        <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
            <List>
            {['Admin'].map((text, index) => (
                <ListItem key={index} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <WhatshotIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
            <Divider />
            <List>
            {sidebaritems.map((item, index) => (
                !location.pathname.includes(item.href) && (
                    <ListItem key={index} disablePadding onClick={() => { navigate(item.href)}} >
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                )
                
            ))}
            </List>
        </Box>
        </Drawer>
    );
    }

// Adding PropTypes validation
SideBar.propTypes = {
  open: PropTypes.bool.isRequired,     // `open` should be a boolean and is required
  onClose: PropTypes.func.isRequired,  // `onClose` should be a function and is required
  sidebaritems:PropTypes.func.isRequired,
};
