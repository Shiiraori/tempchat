import React, { useState, useEffect, useRef } from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from '../../firebase/firebase';
import { useNavigate } from "react-router-dom";
import { Chart } from 'chart.js/auto';
import { toast } from 'react-toastify';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
  doc,
  orderBy,
  query
} from "firebase/firestore";

const TemperatureChart = () => {
  const [tempdata, setTempData] = useState([]);
  const navigate = useNavigate();
  const chartRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          query(
            collection(db, `/temperature`),
            orderBy("myTimestamp", "asc")
          ),
          (snapshot) => {
            setTempData(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
              }))
            );
          }
        );

        return () => {
          unsubscribeSnapshot();
        };
      } else {
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const lineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: tempdata.map(() => ""), // Empty labels array
          datasets: [
            {
              label: "Temperature Data",
              data: tempdata.map((data) => data.temperature),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                display: false, // Hide the x-axis ticks
              },
            },
          },
        },
      });

      return () => {
        lineChart.destroy();
      };
    }
  }, [tempdata]);

  return (
    <div className="container">
      <div className="row justify-content-center">

          {/* <div>Line Chart</div> */}
          <div className="" style={{}}>
            <canvas ref={chartRef} style={{ width: "1000px", height: "300px" }} />

        </div>
      </div>
    </div>
  );
};

export default TemperatureChart;
