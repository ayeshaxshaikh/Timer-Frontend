

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './Timer.css';

const socket = io('https://drs-timer-backend.onrender.com');

function TimerControl() {
  const { uniqueId } = useParams(); 
  const [time, setTime] = useState(15);
  const [isRunning, setIsRunning] = useState(false); 

  useEffect(() => {
    socket.emit('joinRoom', uniqueId);
    socket.emit('resetTimer', uniqueId); 

    socket.on('timerUpdate', (newTime) => {
      setTime(newTime);
      if (newTime === 15) {
        setIsRunning(false); 
      }
    });

    return () => {
      socket.off('timerUpdate');
    };
  }, [uniqueId]);

  const handleStartTimer = () => {
    setIsRunning(true);
    socket.emit('startTimer', uniqueId);
  };

  const handleResetTimer = () => {
    setTime(15);
    setIsRunning(false);
    socket.emit('resetTimer', uniqueId); 
  };

  return (
    <div className="control-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="timer-container">
        <div className='text'>
          <p>Review Timer</p>
        </div>
        <div className="timer-overlay">
          <p>{time}</p>
        </div>
      </div>

      <div className="button-container">
        <button onClick={handleStartTimer} disabled={isRunning || time !== 15}>
          Start Timer
        </button>
        <button onClick={handleResetTimer} disabled={!isRunning || time === 15} style={{ marginLeft: '10px' }}>
          Reset Timer
        </button>
      </div>
    </div>
  );
}

export default TimerControl;
