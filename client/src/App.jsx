import { Route, Routes } from 'react-router-dom';
import AuthRoutes from './routes/AuthRoutes';        // Import auth routes
import NonAuthRoutes from './routes/NonAuthRoutes';  // Import non-auth routes
import PrivateRoute from './routes/PrivateRoute';
const App = () => {
  return (
    <Routes>
      
      {/* Call Non-Auth Routes for login, register, etc */}
      {NonAuthRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}

      {/* Call Auth Routes for profile, settings, etc */}
      
      {AuthRoutes.map((route, index) => (
        <Route 
          key={index}
          path={route.path} 
          element={<PrivateRoute >{route.element}</PrivateRoute>} 
        />
      ))}
    </Routes>
  );
};

export default App;