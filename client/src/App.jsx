// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateTicket from './Pages/Client/Ticket/CreateTicket';
import Queuing from './Pages/Client/Ticket/Queuing';

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<CreateTicket />} />
        <Route path="/queuing/:id" element={<Queuing/>} />
      </Routes>
    </Router>
  );
};

export default App;
