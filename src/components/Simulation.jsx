import React from 'react'
import NumberGenerator from './Simulation/Temp';
import Chat from './Simulation/Chat';
import Navbar from './NavBar/Navbar';
import TemperatureChart from './Simulation/TemperatureChart';
import Thermometer from './Simulation/Thermometer';
import Temp from './Simulation/Temp';
// import LineChart from './Simulation/TempTestChart';

export default function Simulation() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div style={{paddingTop:"20px"}}>
          <Temp />
        </div>
        <div className="row">
          <div className="col-md-6 border-right">
            <div style={{ maxHeight: "500px", maxWidth: "500px", paddingBottom: "20px", paddingTop: "40px" }}>
              <Thermometer /> {/* Chart for the temperature */}
            </div>
          </div>
          <div className="col-md-6">
            <div style={{ maxHeight: "500px", maxWidth: "500px", paddingBottom: "20px", paddingTop: "40px" }}>
              <TemperatureChart />
            </div>
          </div>
        </div>
        <div className="row">
          <div style={{paddingBottom:"20px"}} className="col-md-6">
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