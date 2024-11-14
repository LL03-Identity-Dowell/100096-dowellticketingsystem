// src/routes/nonAuthRoutes.js
import Healthcheck from '../Pages/ServerHealthStatus/ServerHealthStatus';
import DashBoard from '../Pages/Dashboard';

const NonAuthRoutes = [
  { path: '/', element: <DashBoard /> },
  { path: '/healthcheck', element: <Healthcheck /> },
];

export default NonAuthRoutes;
