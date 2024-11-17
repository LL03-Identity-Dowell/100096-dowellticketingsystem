import { useState } from 'react';
import { Typography, Box, TextField, IconButton, Dialog, DialogActions, DialogContent } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Avatar from '@mui/material/Avatar';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EmojiButton from '@/components/Button/EmojiButton';
import emojis from '@/utils/emojilist';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const ChatUI = () => {
  const [chatmessages, setChatMessages] = useState([
    { datetime: '2024-11-17T12:00:00Z', message: 'Hey there!', sender: 'other', senderimg:null},
    { datetime: '2024-11-17T12:05:00Z', message: 'Hello! How are you?', sender: 'me', senderimg:null },
    { datetime: '2024-11-16T12:00:00Z', message: 'I am fine, thank you.', sender: 'other', senderimg:null },
    { datetime: '2024-11-15T12:00:00Z', message: 'What about you?', sender: 'other', senderimg:null },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [openEmojiDialog, setOpenEmojiDialog] = useState(false);
  const [file, setFile] = useState(null); // State to hold the attached file

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() || file) {
      setChatMessages([
        ...chatmessages,
        { datetime: new Date().toISOString(), message: newMessage, sender: 'me', file: file },
      ]);
      setNewMessage('');
      setFile(null); // Clear file after sending
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage(newMessage + emoji); // Append the selected emoji to the message
    setOpenEmojiDialog(false); // Close the emoji picker dialog
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the file in state
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior (new line)
      handleSendMessage(); // Send the message when Enter is pressed
    }
    // Allow new line with Shift + Enter
    if (e.key === 'Enter' && e.shiftKey) {
      // Let the default behavior happen (new line)
      return;
    }
  };

  return (
    <Box sx={{ padding: 2 }} style={{background:'#f1f1f1'}}>
      {/* Chat Messages */}
      <Typography variant="body1" className='chatbody'>
        {chatmessages.map((message, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: message.sender === 'me' ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
              marginBottom: '16px',
            }}
          >
            {/* Profile picture and message */}
            {message.sender === 'other' && (
              <Avatar
                alt="Profile Picture"
                src={message.senderimg || <PersonOutlinedIcon />} // Placeholder for profile picture
                sx={{ marginRight: 1 }}
              />
            )}
            <div
              style={{
                maxWidth: '50%',
                backgroundColor: message.sender === 'me' ? '#4CAF50' : '#D9D9D9',
                color: message.sender === 'me' ? 'white' : 'black',
                padding: '10px',
                borderRadius: '16px',
                borderBottomLeftRadius: message.sender === 'me' ? '16px' : '0px',
                borderBottomRightRadius: message.sender === 'me' ? '0px' : '16px',
                wordWrap: 'break-word',
                display: 'inline-block',
              }}
            >
              <span style={{ fontSize: '0.975rem', margin: 0 }}>{message.message}</span>
              {message.file && (
                <Box sx={{ marginTop: 1, background:'transparent' }}>
                  {/* Display file preview (image, video, audio) */}
                  {message.file.type.startsWith('image') && (
                    <img src={URL.createObjectURL(message.file)} alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px' }} />
                  )}
                  {message.file.type.startsWith('video') && (
                    <video controls style={{ width: '100%' }}>
                      <source src={URL.createObjectURL(message.file)} />
                    </video>
                  )}
                  {message.file.type.startsWith('audio') && (
                    <audio controls style={{ width: '100%' }}>
                      <source src={URL.createObjectURL(message.file)} />
                    </audio>
                  )}
                  {!message.file.type.startsWith('image') && !message.file.type.startsWith('video') && !message.file.type.startsWith('audio') && (
                    <Box>{message.file.name}</Box>
                  )}
                </Box>
              )}
              <small
                style={{
                  display: 'block',
                  fontSize: '10px',
                  marginBottom: '0px',
                  color: message.sender === 'me' ? 'white' : null,
                }}
              >
                {formatDateTime(message.datetime)}
              </small>
            </div>
          </div>
        ))}
      </Typography>

      {/* Text Input Box with Attach, Emoji, and Send Icons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #ddd',
          paddingTop: '10px',
        }}
      >
        {/* Text Input */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Add onKeyDown event listener for Enter key
          sx={{ marginLeft: 1 }}
          className="textfield"
          multiline // Allow multiline input
          rows={1} // Set default rows to 1, it will expand with new lines
        />
        {/* Attach Icon */}
        <label htmlFor="file-upload">
          <IconButton component="span">
            <AttachFileIcon />
          </IconButton>
        </label>
        <input
          id="file-upload"
          type="file"
          style={{ display: 'none' }}
          accept="image/*,video/*,audio/*,application/*"
          onChange={handleFileChange}
        />

        {/* Show file preview before sending */}
        {file && (
            <Box sx={{ marginTop: 1, background:'transparent',marginLeft: 2, width:'80px' }}>
            {/* Display file preview (image, video, audio) */}
            {file.type.startsWith('image') && (
              <img src={URL.createObjectURL(file)} alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px' }} />
            )}
            {file.type.startsWith('video') && (
              <video controls style={{ width: '100%' }}>
                <source src={URL.createObjectURL(file)} />
              </video>
            )}
            {file.type.startsWith('audio') && (
              <audio controls style={{ width: '100%' }}>
                <source src={URL.createObjectURL(file)} />
              </audio>
            )}
            {!file.type.startsWith('image') && !file.type.startsWith('video') && !file.type.startsWith('audio') && (
              <span>{file.name}</span>
            )}
            <IconButton onClick={() => setFile(null)} size="small">
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
        )}

        {/* Emoji Icon */}
        <EmojiButton onClick={() => setOpenEmojiDialog(true)} />

        {/* Send Icon */}
        <IconButton onClick={handleSendMessage} disabled={!newMessage.trim() && !file} style={{ background: '#22C55E', cursor: 'pointer' }}>
          <SendOutlinedIcon className="sendoutlineicon" />
        </IconButton>
      </div>

      {/* Emoji Picker Dialog */}
      <Dialog open={openEmojiDialog} onClose={() => setOpenEmojiDialog(false)}>
        <DialogContent>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {emojis.map((emoji, index) => (
              <IconButton key={index} onClick={() => handleEmojiClick(emoji)}>
                <span style={{ fontSize: '2rem' }}>{emoji}</span>
              </IconButton>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={() => setOpenEmojiDialog(false)} color="primary">
            <CloseOutlinedIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatUI;
