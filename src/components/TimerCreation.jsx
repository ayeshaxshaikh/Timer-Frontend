import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Timer.css'

function TimerCreation() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createTimer = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://drs-timer-backend.onrender.com/createTimer', {
        method: 'POST',
      });

     
      if (!response.ok) {
        throw new Error('Failed to create timer');
      }

      const data = await response.json();
      window.open(`/${data.uniqueId}`, '_blank');
    } catch (error) {
      console.error('Error creating timer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="control-container">
      <h1>Create New Timer</h1>
      <button onClick={createTimer} disabled={loading} className='create-btn'>
        {loading ? 'Creating...' : 'Create Timer'}
      </button>
    </div>
  );
}

export default TimerCreation;
