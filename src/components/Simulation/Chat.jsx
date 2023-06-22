import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/firebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import axios from 'axios';

const ClothingSuggestion = () => {
    const [temperature, setTemperature] = useState(null);
    const [suggestedClothing, setSuggestedClothing] = useState('');
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          listenForTemperature(user.uid);
        } else {
          // Handle case when user is not authenticated
          setTemperature(null);
          setSuggestedClothing('');
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    const listenForTemperature = (userId) => {
      const temperatureQuery = query(
        collection(db, `/simulatetemp`),
        orderBy('date', 'desc'),
        limit(1)
      );
  
      const unsubscribe = onSnapshot(temperatureQuery, (snapshot) => {
        snapshot.forEach((doc) => {
          const tempData = doc.data();
          setTemperature(tempData.number);
        });
      });
  
      return unsubscribe;
    };
  
    const suggestClothing = (temperature, userId) => {
      try {
        const clothesQuery = query(collection(db, `/clothe`));
  
        const unsubscribe = onSnapshot(clothesQuery, (snapshot) => {
          const clothesList = [];
          snapshot.forEach((doc) => {
            clothesList.push(doc.data().ClotheName);
          });
  
          axios
            .post(
              'https://api.openai.com/v1/engines/text-davinci-003/completions',
              {
                prompt: `Given the temperature ${temperature}°C, suggest what should I wear from the list. The clothe listing: ${clothesList.join(', ')}. You should start with "I suggest (what to wear) since it is a (hot or cold) weather temperature.". Recommend me one upper and lower clothes in the list. When the temperature is below 25, it is generally considered to be cold and above that is hot. Also, make the upper and lower clothing suggestions fit together.\n Be expressive when giving the suggestions.`,
                max_tokens: 400,
                temperature: 0.9,
                n: 1,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer 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', 
                  //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
                },
              }
            )
            .then((response) => {
              const suggestedText = response.data.choices[0].text.trim();
              setSuggestedClothing(suggestedText);
            })
            .catch((error) => {
              console.log(error);
            });
        });
  
        return unsubscribe;
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (temperature) {
        const userId = auth.currentUser.uid;
        const unsubscribeClothing = suggestClothing(temperature, userId);
  
        return () => {
          unsubscribeClothing();
        };
      }
    }, [temperature]);
  
    return (
      <div>
        <p>Current temperature: {temperature}°C</p>
        <div>
          <h1>Suggested clothing:</h1>
          <div>{suggestedClothing}</div>
        </div>
      </div>
    );
  };
  
export default ClothingSuggestion;
