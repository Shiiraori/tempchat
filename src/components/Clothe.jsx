import React from 'react'
import ClotheForm from './clothelist/ClotheForm'
import ClotheList from './clothelist/ClotheList'
import Navbar from './NavBar/Navbar';


export default function Clothe() {

  return (
    <div>
      <div className="pb-3">
      <Navbar/>
    </div>
      <div className="container">
        <div className="pb-2">
          <ClotheForm />
        </div>
        <div>
          <ClotheList />
        </div>
      </div>
    </div>
  );
}
