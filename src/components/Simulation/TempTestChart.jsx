import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const LineChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const fetchData = async (userId) => {
          const snapshot = await onSnapshot(query(collection(db, `users/${userId}/simulatetemp`)));

          const data = snapshot.docs.map((doc) => {
            const { number, date } = doc.data();
            return { x: new Date(date), y: number };
          });

          setChartData({
            datasets: [
              {
                label: 'Temperature',
                data: data,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
              },
            ],
          });
        };

        fetchData(user.uid);
      } else {
        navigate('/');
      }
    });
  }, []);

  return <Line data={chartData} />;
};

export default LineChart;
