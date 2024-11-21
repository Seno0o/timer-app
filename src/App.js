import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [link, setLink] = useState('');
  const [time, setTime] = useState(30);
  const [customTime, setCustomTime] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the app after a delay for animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // 500ms delay for animation
    return () => clearTimeout(timer);
  }, []);

  const handleStartTimer = () => {
    const timerDuration = time === 'custom' ? parseInt(customTime) : parseInt(time);
    if (isNaN(timerDuration) || timerDuration <= 0) {
      alert('Please enter a valid time');
      return;
    }
    setMessage(`Link: ${link} <br>Timer set for ${timerDuration} seconds.`);
    setTimeout(() => {
      alert(`Time's up! You can now visit the link: ${link}`);
    }, timerDuration * 1000);
  };

  return (
    <div className={`App ${isVisible ? 'fade-in' : 'fade-out'}`}>
      <h1>Set Your Timer</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleStartTimer(); }}>
        <input
          type="text"
          placeholder="Enter your link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <select value={time} onChange={(e) => {
          setTime(e.target.value);
          if (e.target.value !== 'custom') setCustomTime('');
        }}>
          <option value="30">30 seconds</option>
          <option value="60">60 seconds</option>
          <option value="90">90 seconds</option>
          <option value="120">1 minute</option>
          <option value="custom">Custom</option>
        </select>
        {time === 'custom' && (
          <input
            type="number"
            placeholder="Enter custom time in seconds"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            required
          />
        )}
        <button type="submit">Start Timer</button>
      </form>
      <div className="message" dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
}

export default App;
