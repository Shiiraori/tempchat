import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import LoginLogout from "./components/LoginLogout";
import "bootstrap/dist/css/bootstrap.min.css";
import Clothe from "./components/Clothe";
import "./components/style.css/"
import 'react-toastify/dist/ReactToastify.css';
import './components/navbar/navbar'

import Simulation from "./components/Simulation";
import Dashboard from "./components/Dashboard";


function App() {
  
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LoginLogout />} />
          <Route path="/clothe" element={<Clothe />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/dashboard" element={<Dashboard />} />


        </Routes>
      </Router>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </div>
  );
}

export default App
