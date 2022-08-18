import React from 'react';
import classes from './TheHeader.module.css';
import TheNav from "../TheNav/TheNav.jsx";

function TheHeader({arrayOrders,fotoBg}) {
  return (
    <div
      className={classes.TheHeader}
      style={{ backgroundImage: `url(${fotoBg})` }}
    >
      <div className={classes.head}>
        <p className={classes.title}>ARMAGEDDON V2</p>
        <p className={classes.text}>A service for ordering the destruction of asteroids dangerously approaching the Earth.</p>
      </div>
      <TheNav arrayOrders={arrayOrders}/>
    </div>
  );
}

export default TheHeader;
