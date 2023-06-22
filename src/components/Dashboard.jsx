import React from 'react';
import Chat from './Dashboard/Chat';
import Navbar from './NavBar/Navbar';
import Thermometer from './Dashboard/Thermometer';
import TemperatureChart from './Dashboard/TemperatureChart';

export default function Dashboard() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 border-right">
            <div style={{ maxHeight: "500px", maxWidth: "500px", paddingBottom: "20px", paddingTop: "40px" }}>
              <Thermometer /> {/* Chart for the temperature */}
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div classname="col-12 d-flex justify-content-center align-items-center" style={{ maxHeight: "500px", maxWidth: "500px", paddingBottom: "20px", paddingTop: "40px" }}>
              <TemperatureChart />
            </div>
          </div>
        </div>
        <div className="row">
          <div style= {{paddingBottom: "30px"}}className="col-md-6">
            <Chat />
          </div>
          <div className="col-md-6">
            {/* Your other content */}
          </div>
        </div>
      </div>
    </div>
  );
}
