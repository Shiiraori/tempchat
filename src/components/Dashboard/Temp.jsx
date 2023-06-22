import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/firebase';
import {
  collection,
  addDoc
} from "firebase/firestore";

const NumberGenerator = () => {
  const [intervalId, setIntervalId] = useState(null);
  const [buttonLabel, setButtonLabel] = useState('Give Number');

  const startNumberGenerator = () => {
    if (intervalId) {
      // If intervalId exists, it means the generator is running, so we should stop it
      clearInterval(intervalId);
      setIntervalId(null);
      setButtonLabel('Give Number');
    } else {
      // If intervalId doesn't exist, it means the generator is not running, so we should start it
      const id = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * 26);; 
        addDoc(collection(db, `/temp`), {
          number: randomNumber,
          date: Date.now(),
        });
      }, 10000); // 10 seconds

      setIntervalId(id);
      setButtonLabel('Stop');
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup function to clear the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div>
      <button onClick={startNumberGenerator}>{buttonLabel}</button>
    </div>
  );
};

export default NumberGenerator;
