import { Grid, Typography, Box } from '@mui/material';
import Button from '../../../components/Button/Button';
import CheckBox from '../../../components/CheckBox';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import LevelSelector from './LevelSelector';
import ChatUI from './ChatUI';

export default function LastChat() {

  const handleGoBack =() =>{
    console.log('going back to pevious page');
  }

  
  return (
    
    <Box sx={{ mt: 4, mb:5 }} className='summarybox-container'>
        <Grid item xs={12} md={4}>
            <Box className="summarybox" >
                <Typography variant="h6" gutterBottom>
                    <span style={{ color: 'black', fontSize: '0.875rem', fontWeight: 'bold', margin:"12px" }}>
                        Summary of Last Chat
                    </span>
                </Typography>
            </Box>
            <Box style={{margin:'16px'}}>
                <Button label ={"Verify ID"} startIcon={<CheckBox isChecked={true} />} />
                <Button label ={"ReOpen Ticket"} />
                <Button label ={"Close Ticket"} />
                <LevelSelector />
            </Box>

            <Box className='box-container' >
              <Box className="box" style={{ display: 'flex', alignItems: 'center' }}>
                {/* ArrowBack Icon */}
                <ArrowBackOutlinedIcon onClick={handleGoBack} style={{ cursor: 'pointer', color:'white', marginRight: '18px' }} />
                
                {/* Typography for the name */}
                <Typography variant="h6" gutterBottom>
                  <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 'bold' }}>
                    Mr. Oguledo sdsd
                  </span>
                </Typography>
              </Box>
                <ChatUI />
            </Box>
        </Grid>
    </Box>
  );
}
