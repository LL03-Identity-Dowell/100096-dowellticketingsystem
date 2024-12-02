import * as React from 'react';
import { FormControl, Box, InputLabel, FormHelperText, MenuItem, CircularProgress } from '@mui/material';
import Button from '@/components/Button/Button';
import { TextField, Select } from '@/components/ui/input';
import { Title } from '@/components/ui/Typography';
import { addRoomToWorkspace, getAllWorkSpaces } from '@/services/api.services';

export default function CreateRoom() {
  const [roomName, setRoomName] = React.useState('');
  const [workspaceId, setWorkspaceId] = React.useState('');
  const [workspaces, setWorkspaces] = React.useState([]);
  const [errors, setErrors] = React.useState({
    roomName: '',
    workspaceId: '',
  });
  const [isLoading, setIsLoading] = React.useState(false); // Renamed to isLoading for clarity
  const [workspacesLoading, setWorkspacesLoading] = React.useState(false); // Separate loading state for workspaces
  const [workspacesError, setWorkspacesError] = React.useState(''); // Separate error state for workspace fetching

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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate form before proceeding
    if (validateForm()) {
      setIsLoading(true); // Set loading state to true when submitting
      try {
        console.log('Room Name:', roomName);
        console.log('Workspace ID:', workspaceId);
        const response = await addRoomToWorkspace(workspaceId, roomName); // Pass the correct API parameters
        console.log('Room created successfully:', response.data?.data);
  
        // Optionally, reset the form fields or provide feedback
        setRoomName('');
        setWorkspaceId('');
        alert('Room created successfully!'); // Replace with a toast/snackbar for better UX
      } catch (error) {
        console.error('Error creating room:', error);
  
        // Show an error message to the user (replace alert with a snackbar if needed)
        alert(error.response?.data?.message || 'An error occurred while creating the room.');
      } finally {
        setIsLoading(false); // Reset loading state after submission
      }
    }
  };
  

  React.useEffect(() => {
    const fetchWorkSpaces = async () => {
      try {
        setWorkspacesLoading(true);
        const response = await getAllWorkSpaces();
        setWorkspaces(response.data.data);
      } catch (err) {
        setWorkspacesError('Failed to fetch workspaces');
        console.error('Error:', err);
      } finally {
        setWorkspacesLoading(false);
      }
    };

    fetchWorkSpaces();
  }, []);

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
          sx={{ marginBottom: '16px' }}
        />

        <FormControl fullWidth error={!!errors.workspaceId} sx={{ marginTop: '16px' }}>
          <InputLabel id="workspace-id-label">Workspace ID</InputLabel>
          <Select
            labelId="workspace-id-label"
            value={workspaceId}
            label="Workspace ID"
            onChange={handleWorkspaceIdChange}
            disabled={workspacesLoading} // Disable select while fetching workspaces
          >
            {workspaces.map((workspace, index) => (
              <MenuItem key={index} value={workspace.workspace_id}>
                {workspace.workspace_id}
              </MenuItem>
            ))}
          </Select>
          {errors.workspaceId && <FormHelperText>{errors.workspaceId}</FormHelperText>}
        </FormControl>

        {/* Loading or Error Feedback for workspaces */}
        {workspacesLoading && <Box sx={{ textAlign: 'center', marginTop: '16px' }}>Loading workspaces...</Box>}
        {workspacesError && <Box sx={{ textAlign: 'center', color: 'red', marginTop: '16px' }}>{workspacesError}</Box>}

        <Button
          type="submit"
          label={isLoading ? 'Creating Room' : 'Create Room'}
          color="primary"
          fullWidth
          size="large"
          sx={{ marginTop: '16px' }}
          disabled={isLoading} // Disable the button during loading
          startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null} // Add spinner while loading
        />
      </Box>
    </Box>
  );
}
