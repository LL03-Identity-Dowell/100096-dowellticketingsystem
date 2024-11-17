// src/routes/authRoutes.js
import ProfilePage from '../Pages/ProfilePage/ProfilePage';
import SettingsPage from '../Pages/SettingsPage/SettingsPage';
import DashBoard from '../Pages/Dashboard/Dashboard';

const AuthRoutes = [
  { path: '/profile', element: <ProfilePage /> },
  { path: '/settings', element: <SettingsPage /> },
  { path: '/dashboard', element: <DashBoard /> },
];

export default AuthRoutes;