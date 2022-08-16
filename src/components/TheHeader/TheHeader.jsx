import React from 'react';
import classes from './TheHeader.module.css';
import TheNav from "../TheNav/TheNav.jsx";

function TheHeader({arrayOrders}) {
  return (
    <div className={classes.TheHeader}>
      <div className={classes.head}>
        <p className={classes.title}>ARMAGEDDON V2</p>
        <p className={classes.text}>A service for ordering the destruction of asteroids dangerously approaching the Earth.</p>
      </div>
      <TheNav arrayOrders={arrayOrders}/>
    </div>
  );
}

export default TheHeader;
