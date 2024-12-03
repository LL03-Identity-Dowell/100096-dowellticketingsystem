import {useNavigate, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {getTicketByIdApi} from '@/services/api.services';

const Queuing = () => {
  const {id} = useParams();

  const [remainingTime, setRemainingTime] = useState(0);
  const [ticketData, setTicketData] = useState([]);
  const navigate = useNavigate()

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // API Call
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await getTicketByIdApi(id);
        console.log(response.data.statusCode);
        if (response.data.statusCode === 200) {
          const ticketResponse = response.data.data;
          setTicketData(ticketResponse);
          console.log(ticketResponse);
          setRemainingTime(ticketResponse.waiting_time * 60);
          console.log(ticketResponse._id)
          navigate(`/chatroom/${ticketResponse._id}`)
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTicket();
  }, [id]);

  return (
    <div className="max-w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-3 justify-center items-center">
        <p className="font-poppins text-5xl tracking-time text-gray-800 text-center font-bold">{formatTime(remainingTime)}</p>
        <h1 className="font-bold font-poppins tracking-tight text-3xl text-green-800">Ticket Creation Successful</h1>
        <p className="font-poppins text-md tracking-time text-gray-800 text-center">
          Your average waiting time is<span className="font-bold text-xl"> {ticketData.waiting_time} </span> minutes.
        </p>
        <div className="flex gap-3">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 flex items-center font-poppins tracking-tight px-6 rounded-md">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Queuing;
