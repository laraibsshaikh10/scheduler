import { useState } from 'react';

const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory(prev => 
      replace ? [...prev.slice(0, prev.length - 1), newMode] : [...prev, newMode]
    );
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, prev.length - 1));
      setMode(history[history.length - 2]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;

