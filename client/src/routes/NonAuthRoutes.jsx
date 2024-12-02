// src/routes/nonAuthRoutes.js
import Healthcheck from '../Pages/ServerHealthStatus/ServerHealthStatus';
import CreateTicket from '../Pages/Client/Ticket/CreateTicket';
import CreateRoom from '../Pages/Client/Room/CreateRoom';
import Queuing from '../Pages/Client/Ticket/Queuing';
import Forms from '../Pages/Linemanager/Forms';

const NonAuthRoutes = [
  { path: '/healthcheck', element: <Healthcheck /> },
  { path: '/', element: <CreateTicket /> },
  { path: '/queuing/:id', element: <Queuing/> },
  { path: '/linemanager', element: <Forms /> },
  { path: '/room', element: <CreateRoom /> },
];

export default NonAuthRoutes;