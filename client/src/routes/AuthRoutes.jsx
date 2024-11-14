// src/routes/authRoutes.js
import ProfilePage from '../Pages/Profile';
import SettingsPage from '../Pages/Settings';
import LineManagersPage from '../Pages/LineManagers';
import DashBoard from '../Pages/Dashboard';

const AuthRoutes = [
  { path: '/profile', element: <ProfilePage /> },
  { path: '/settings', element: <SettingsPage /> },
  { path: '/line-managers', element: <LineManagersPage /> },
  { path: '/dashboard', element: <DashBoard /> },
];

export default AuthRoutes;
