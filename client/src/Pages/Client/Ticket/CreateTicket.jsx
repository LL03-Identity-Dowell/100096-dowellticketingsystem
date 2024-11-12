import TicketSelect from '@/components/client/ticketSelect';
import logo from '../../../assets/logo2.png';
import { products, supportDepartment } from '@/constants/data';
import { useState } from 'react';
import { createTicketApi } from '@/services/api.services';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreateTicket = () => {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertColor, setAlertColor] = useState('');
  const navigate = useNavigate(); 

  const [ticketData, setTicketData] = useState({
    display_name: '',
    email: '',
    department: '',
    product: '',
    link_id: '633b2ac1f1b4b2a5d29eb435',
    workspace_id: '633b2ac1f1b4b2a5d29eb432',
  });
  const departments = supportDepartment;
  const dowellProducts = products;

  const handleInputChange = (value, name) => {
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitTicket = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(true);
    setAlertMessage('Please wait while we create your ticket...');
    setAlertColor('blue');

    try {
      const ticketResponse = await createTicketApi(ticketData);
      if (ticketResponse.status === 201 && ticketResponse.data?.id) {
        setAlertMessage('Ticket created successfully!');
        setAlertColor('green');
        
        
        setTimeout(() => {
          navigate(`/queuing/${ticketResponse.data.id}`);
        }, 3000); 
      } else {
        throw new Error('Failed to create ticket');
      }
    } catch (error) {
      setAlertMessage(error.response?.data?.message || 'Error creating ticket');
      setAlertColor('red');
    } finally {
      setLoading(false);
      setTimeout(() => setAlert(false), 3000); 
    }
  };

  return (
    <div className="min-h-screen max-w-full bg-gray-100 relative">
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col gap-3 justify-center items-center">
          <img src={logo} alt="" className="w-32" />
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="font-poppins font-bold tracking-tighter text-3xl text-gray-700">
              Welcome to Dowell Customer Support
            </h1>
            <p className="font-poppins tracking-tight text-md text-gray-800">
              Create your ticket
            </p>
          </div>
          <form className="my-2 flex flex-col gap-4" onSubmit={submitTicket}>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="display_name">Name</label>
              <TicketSelect
                handleInputChange={handleInputChange}
                name="display_name" 
                placeholder="Andrea Sandreas"
                className="w-[350px] font-poppins tracking-tight" 
                fieldType="input"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="email">Email address</label>
              <TicketSelect
                handleInputChange={handleInputChange}
                name="email"
                placeholder="example@gmail.com"
                className="w-[350px] font-poppins tracking-tight"
                fieldType="input"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="department">Department</label>
              <TicketSelect
                handleInputChange={handleInputChange}
                name="department"
                data={departments}
                placeholder="Select Department"
                className="w-[350px] font-poppins tracking-tight"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="product">Products</label>
              <TicketSelect
                handleInputChange={handleInputChange}
                name="product"
                data={dowellProducts}
                placeholder="Select Product"
                className="w-[350px] font-poppins tracking-tight"
              />
            </div>
            <div className="flex flex-col gap-1 w-full mt-4 mb-8">
              <button
                type="submit"
                className={`bg-green-700 hover:bg-green-900 text-white font-poppins tracking-tight font-bold py-2 px-4 rounded-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Submit Ticket'} 

              </button>
            </div>
          </form>
        </div> 


        {/* Alerts */} 


        {alert && (
          <div
            className={`absolute top-4 right-4 bg-${alertColor}-100 border border-${alertColor}-400 text-${alertColor}-700 px-4 py-3 rounded`}
          >
                        <p>{alertMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTicket;
