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
