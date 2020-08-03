import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { API } from 'aws-amplify'
//API.get API.post API.put
import { withAuthenticator } from 'aws-amplify-react'

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
      <h3 className="Jca-title">Jules Caillé Auto</h3>
      <table>
        <thead>
          <tr>
            <th>Date départ</th>
            <th>Date retour</th>
            <th>Agence départ</th>
            <th>Immatriculation</th>
            <th>Catégorie</th>
            <th>Durée</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
        {
          reservations.map((r,i) => 
            <tr key={r.DocumentId}>
              <td>{r.DateDepart}</td>
              <td>{r.DateRetourPrevue}</td>
              <td>{r.AgenceDepart}</td>
              <td>{r.VehImmatriculation}</td>
              <td>{r.VehCategorie}</td>
              <td>{r.Duree}</td>
              <td>{r.PrixTotalHT}</td>
            </tr>
          )
        }
        </tbody>
      </table>

    </div>
  );
}

export default withAuthenticator(App,{
  includeGreetings: true
});
