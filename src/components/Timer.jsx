
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Timer.css';

const socket = io('https://timer-backend-1.onrender.com');

function Timer() {
  const [timer, setTimer] = useState(15);
  const [uniqueId, setUniqueId] = useState('');

  useEffect(() => {
    let storedId = localStorage.getItem('uniqueTimerId');
    if (!storedId) {
      storedId = `timer-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
      localStorage.setItem('uniqueTimerId', storedId);
    }
    setUniqueId(storedId);
    socket.emit('joinRoom', storedId); 
  }, []);

  useEffect(() => {
    socket.on('timerUpdate', (newTime) => {
      setTimer(newTime);
    });

    return () => {
      socket.off('timerUpdate');
    };
  }, []);

  return (
    <div className='container'>
      <div className="timer-container">
        <div className='text'>
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
