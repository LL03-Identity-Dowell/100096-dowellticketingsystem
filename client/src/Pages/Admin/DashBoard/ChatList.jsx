import { Grid, Typography, Box } from '@mui/material';

export default function ChatList() {
  const previousMessages = [
    { datetime: '2024-11-17T12:00:00Z', message: 'Hello, how are you?' },
    { datetime: '2024-11-16T12:00:00Z', message: 'I am fine, thank you.' },
    { datetime: '2024-11-15T12:00:00Z', message: 'What about you?' },
  ];

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const today = new Date();
  
    if (date.toDateString() === today.toDateString()) {
      return `12:00 PM today`; // Example specific message
    } else if (
      date.toDateString() ===
      new Date(today.setDate(today.getDate() - 1)).toDateString()
    ) {
      return `12:00 PM yesterday`; // Example specific message
    } else {
      const time = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      const datePart = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
      return `${time} ${datePart}`;
    }
  };
  

  return (
    <Grid item xs={12} md={4}>
      <Box className="box" >
        <Typography variant="h6" gutterBottom>
          <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 'bold' }}>
            Ticket Id
            <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 'normal' }}>3453564657577rrty5h57</p>
          </span>
        </Typography>
      </Box>

      <Box className='topic-container' >
        <Typography variant="h6" gutterBottom>
          <div className='topicitem'>
            <span style={{ fontSize: '0.875rem', fontWeight: 'bold', flex: 1 }}>Topic:</span>
            <span style={{ fontSize: '0.875rem', textAlign: 'left', flex: 3 }}>Test Product</span>
          </div>

          <div className='topicitem'>
            <small style={{ fontSize: '0.875rem', fontWeight: 'bold', flex: 1 }}>Email:</small>
            <small style={{ fontSize: '0.875rem', textAlign: 'left', flex: 3 }}>example@example.com</small>
          </div>

          <div className='topicitem'>
            <small style={{ fontSize: '0.875rem', fontWeight: 'bold', flex: 1 }}>User Type:</small>
            <small style={{ fontSize: '0.875rem', textAlign: 'left', flex: 3 }}>Public</small>
          </div>

          <Typography
            sx={{ fontSize: '0.875rem', fontWeight: 'bold', textAlign: 'center', marginTop: 6 }}
          >
            Previous Chats
          </Typography>

          {previousMessages.map((message, index) => (
            <div
              key={index}
              className='item'
            >
              <small style={{ fontSize: '0.675rem', flex: 1 }}>
                {formatDateTime(message.datetime)}
              </small>
              <small style={{ fontSize: '0.875rem', textAlign: 'left', flex: 2 }}>
                {message.message}
              </small>
            </div>
          ))}
            <div
                style={{margin:'10px', height:'50px'}}
                >
              
            </div>
        </Typography>
      </Box>
    </Grid>
  );
}
