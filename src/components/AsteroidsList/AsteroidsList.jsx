import React, {useEffect, useState} from 'react';
import classes from './AsteroidsList.module.css';
import AsteroidItem from "../AsteroidItem/AsteroidItem.jsx";


function AsteroidsList({isDistKm, sendDestroyOrder, testDb}) {
  
  return (
    <div className={classes.AsteroidsList}>
      <div className={classes.AsteroidsListContainer}>
        
        {
          testDb.map(asteroid => (
            <div key={asteroid.id}>
              <AsteroidItem asteroid={asteroid} isDistKm={isDistKm} sendDestroyOrder={sendDestroyOrder}/>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default AsteroidsList;
