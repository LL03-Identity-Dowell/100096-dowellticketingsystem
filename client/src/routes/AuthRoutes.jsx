// src/routes/authRoutes.js
import ProfilePage from '../Pages/Admin/ProfilePage/ProfilePage';
import SettingsPage from '../Pages/Admin/SettingsPage/SettingsPage';
import DashBoard from '../Pages/Admin/DashBoard/Dashboard';
import AdminPage from '@/Pages/Admin/index';

const AuthRoutes = [
  { path: '/admin', element: <AdminPage /> },
  { path: '/admin/profile', element: <ProfilePage /> },
  { path: '/admin/settings', element: <SettingsPage /> },
  { path: '/admin/dashboard', element: <DashBoard /> },
];

export default AuthRoutes;