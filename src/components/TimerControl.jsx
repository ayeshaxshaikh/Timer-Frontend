
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://timer-backend-2.onrender.com');

function TimerControl() {
  const [time, setTime] = useState(15);
  const [isRunning, setIsRunning] = useState(false); 
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [uniqueId, setUniqueId] = useState('');

  useEffect(() => {
    let storedId = localStorage.getItem('uniqueTimerId');
    if (storedId) {
      setUniqueId(storedId);
      socket.emit('joinRoom', storedId);
      socket.emit('resetTimer', storedId); 
    }
  }, []);

  const handleStartTimer = () => {
    setIsRunning(true);
    setIsResetDisabled(false);
    socket.emit('startTimer', uniqueId);
  };

  const handleResetTimer = () => {
    setTime(15);
    setIsRunning(false);
    setIsResetDisabled(true);
    socket.emit('resetTimer', uniqueId); 
  };

  useEffect(() => {
    socket.on('timerUpdate', (newTime) => {
      setTime(newTime);
      if (newTime === 15) {
        setIsRunning(false);
        setIsResetDisabled(true);
      }
    });

    socket.on('timerStateUpdate', (state) => {
      setTime(state.time);
      setIsRunning(state.isRunning);
      setIsResetDisabled(!state.isRunning && state.time === 15);
    });

    return () => {
      socket.off('timerUpdate');
      socket.off('timerStateUpdate');
    };
  }, [uniqueId]);

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
      <div className='button-container'>
        <button onClick={handleStartTimer} disabled={isRunning || time === 0}>
          Start Timer
        </button>
        <button onClick={handleResetTimer} disabled={isResetDisabled} style={{ marginLeft: '10px' }}>
          Reset Timer
        </button>
      </div>
    </div>
  );
}

export default TimerControl;
