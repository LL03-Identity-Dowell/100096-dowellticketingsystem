// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateTicket from './Pages/Client/Ticket/CreateTicket';
import Queuing from './Pages/Client/Ticket/Queuing';
import Forms from './Pages/Linemanager/Forms';

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<CreateTicket />} />
        <Route path="/queuing/:id" element={<Queuing/>} />
        <Route path="/linemanager" element={<Forms />} />
      </Routes>
    </Router>
  );
};

export default App;
