import React from 'react';
import './Navbar.css'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth  } from '../../firebase/firebase';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      toast.success("Signed Out Successfully")
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <nav className="navbar">
      <div>
        <h2 className="text__title2">TempChat</h2>
        <ul className="nav-links">
          <li><a href="/dashboard" className="link">Dashboard</a></li>
          <li><a href="/clothe" className="link">Clothes</a></li>
          <li><a href="/simulation" className="link">Simulation</a></li>
        </ul>
      </div>
      <div>
        <div></div>
        <button className="signout-btn" onClick={handleSignOut}>SignOut</button>
      </div>
    </nav>
  );
};

export default Navbar;
