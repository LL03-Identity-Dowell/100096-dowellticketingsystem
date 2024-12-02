import { servicesAxiosInstance } from './config';


export const getServerStatus = async () => {
  const response = await servicesAxiosInstance.get('/api/v1/self');
  return response.data;
};

export const getServerHealth = async () => {
  const response = await servicesAxiosInstance.get('/api/v1/health');
  return response.data;
};

export const createTicketApi = async (ticketData) => {
  return await  servicesAxiosInstance.post('/api/v1/create-ticket', ticketData);
}

export const getTicketByIdApi = async (id) => {
  return await servicesAxiosInstance.get(`/api/v1/tickets/${id}`);
}
export const getAllTickets = async () => {
  return await servicesAxiosInstance.get(`/api/v1/tickets`);
}

export const getAllLineManagers = async () => {
  return await servicesAxiosInstance.get(`/api/v1/lineManagers/get-all-lineManagers`);
}

export const getAllManagersbyUserId = async (user_id) => {
  return await servicesAxiosInstance.get(`/api/v1/lineManagers/get-lineManagers?user_id=${user_id}`);
}

export const getAllWorkSpaces = async () => {
  return await servicesAxiosInstance.get(`/api/v1/workspaces/`);
}
export const addRoomToWorkspace = async (workspaceId, room_name) => {
  return await servicesAxiosInstance.post(`/api/v1/workspaces/?workspaceId=${workspaceId}/rooms`,{
                  "room_name":room_name, 
              });
}
export const getRoomsFromWorkspace = async (workspaceId) => {
  return await servicesAxiosInstance.get(`/api/v1/workspaces/?workspaceId=${workspaceId}/rooms`);
}