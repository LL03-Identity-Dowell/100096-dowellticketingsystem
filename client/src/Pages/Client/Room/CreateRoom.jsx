import * as React from 'react';
import { FormControl, Box, InputLabel, FormHelperText, MenuItem } from '@mui/material';
import Button from '@/components/Button/Button';
import { TextField, Select } from '@/components/ui/input';
import { Title } from '@/components/ui/Typography';

export default function CreateRoom() {
  const [roomName, setRoomName] = React.useState('');
  const [workspaceId, setWorkspaceId] = React.useState('');
  const [workspaces] = React.useState([
    { id: 'ws1', name: 'Workspace 1' },
    { id: 'ws2', name: 'Workspace 2' },
    { id: 'ws3', name: 'Workspace 3' },
  ]); // A list of workspace IDs. This can be fetched from an API

  const [errors, setErrors] = React.useState({
    roomName: '',
    workspaceId: '',
  });

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleWorkspaceIdChange = (event) => {
    setWorkspaceId(event.target.value);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!roomName) {
      formErrors.roomName = 'Room name is required';
    }
    if (!workspaceId) {
      formErrors.workspaceId = 'Workspace ID is required';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log('Room Name:', roomName);
      console.log('Workspace ID:', workspaceId);
    }
  };

  return (
    <Box
      sx={{
        width: '60vh',
        padding: '20px',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '80vh',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundColor: 'white',
      }}
    >
      <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
        <Title text="Create Room" />
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '16px', // Ensures consistent spacing between fields
        }}
      >
        <TextField
          label="Room Name"
          fullWidth
          value={roomName}
          onChange={handleRoomNameChange}
          error={!!errors.roomName}
          helperText={errors.roomName}
          sx={{marginBottom:'16px'}}
        />

        <FormControl fullWidth error={!!errors.workspaceId} sx={{marginTop:'16px'}}>
          <InputLabel id="workspace-id-label">Workspace ID</InputLabel>
          <Select
            labelId="workspace-id-label"
            value={workspaceId}
            label="Workspace ID"
            onChange={handleWorkspaceIdChange}
          >
            {workspaces.map((workspace, index) => (
              <MenuItem key={index} value={workspace.id}>
                {workspace.name}
              </MenuItem>
            ))}
          </Select>
          {errors.workspaceId && <FormHelperText>{errors.workspaceId}</FormHelperText>}
        </FormControl>

        <Button
          type="submit"
          label="Create Room"
          color="primary"
          fullWidth
          size="large"
          sx={{ marginTop: '16px' }}
        />
      </Box>
    </Box>
  );
}
