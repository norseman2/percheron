import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { API } from 'aws-amplify'
//API.get API.post API.put

function App() {
  const [reservations, updateReservations] = useState([])
  async function callApi() {
    try {
      const data = await API.get('percheronapi','/reservations')
      console.log('data:',data)
      updateReservations(data.reservations)
    } catch(err){
      console.log('error:',err)
    }
  }  
  useEffect(()=>{
    callApi()
  },[])
  return (
    <div className="App">
      <header className="App-header">
        {
          reservations.map((r,i) => <span>{r.ClientIntitule}</span>)
        }
      </header>
    </div>
  );
}

export default App;
