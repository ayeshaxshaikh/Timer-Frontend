
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './Timer.css'; 

const socket = io('https://drs-timer-backend.onrender.com');

function Timer() {
  const { uniqueId } = useParams(); 
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    socket.emit('joinRoom', uniqueId);
    socket.emit('resetTimer', uniqueId); 

    socket.on('timerUpdate', (newTime) => {
      setTimer(newTime);
    });

    return () => {
      socket.off('timerUpdate');
    };
  }, [uniqueId]);

  return (
    <div className="container">
      <div className="timer-container">
        <div className="text">
          <p>Review Timer</p>
        </div>
        <div className="timer-overlay">
          <p>{timer}</p>
        </div>
      </div>
    </div>
  );
}

export default Timer;
