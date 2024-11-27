import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Queuing = () => {
  const { id } = useParams();
  const position = 4;
  const waiting_time = 30; 

  const [remainingTime, setRemainingTime] = useState(waiting_time * 60); 

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

  return (
    <div className="max-w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-3 justify-center items-center">
      <p className="font-poppins text-5xl tracking-time text-gray-800 text-center font-bold">
         {formatTime(remainingTime)}
        </p>
        <h1 className="font-bold font-poppins tracking-tight text-3xl text-green-800">
          Ticket Creation Successful
        </h1>
        <p className="font-poppins text-md tracking-time text-gray-800 text-center">
          You are in position <span className="font-bold text-xl">{position}</span> with an average waiting time of<span className="font-bold text-xl"> {waiting_time} </span> minutes.
        </p>
        <div className="flex gap-3">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 flex items-center font-poppins tracking-tight px-6 rounded-md">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Queuing;
