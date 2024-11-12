import {getTicketByIdApi} from '@/services/api.services';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

const Queuing = () => {
  const {id} = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await getTicketByIdApi(id);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTicket();
  }, [id]);


  
  return <div>Queuing</div>;
};

export default Queuing;
