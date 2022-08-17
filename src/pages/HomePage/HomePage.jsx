import React, {useEffect, useRef, useState} from 'react';
import classes from './HomePage.module.css';
import AsteroidsList from "../../components/AsteroidsList/AsteroidsList.jsx";
import { GrUpdate } from "react-icons/gr";


function HomePage({sendDestroyOrder, getAsteroidsArray, toggleDangerAsteroidHandler, testDb, isChecked}) {
  
  const [isDistKm, setIsDistKm] = useState(true);
  
  
  const refInputKm = useRef();
  const refInputLunar = useRef();
  
  
  useEffect(() => {
    refInputKm.current.hidden = true;
    refInputLunar.current.hidden = true;
  }, []);
  

  function distTypeHandler(e) {
    if (e.target.value === 'lunarOrb') {
      setIsDistKm(false);
    } else {
      setIsDistKm(true);
    }
  }
  
  
  return (
    <div className={classes.HomePage}>
      <div className={classes.HomePageContainer}>
        <div className={classes.head}>
          <div className={classes.title}>
            <h3>Upcoming arrivals</h3>
          </div>
          <hr className={classes.line}/>
          <div className={classes.info}>
            <div className={classes.distance}>
              <div>Display distance:</div>
              <label className={isDistKm ? classes.labelActive : classes.label}>
                <input
                  onClick={distTypeHandler}
                  ref={refInputKm}
                  type="radio"
                  name="dist"
                  value="kmDist"
                /> in kilometers</label>
              &nbsp;|&nbsp;
              <label className={!isDistKm ? classes.labelActive : classes.label}>
                <input
                  onClick={distTypeHandler}
                  ref={refInputLunar}
                  type="radio"
                  name="dist"
                  value="lunarOrb"
                />in lunar orbits
              </label>
            </div>
            <div className={isChecked ? classes.updateBtnDisable : classes.updateBtn}>
              <span
                onClick={getAsteroidsArray}
              >
                <GrUpdate />
                &nbsp;Update DB
              </span>
            </div>
            <div>
              <label className={classes.dangerous}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={toggleDangerAsteroidHandler}/>
                <span>Show only dangerous</span>
              </label>
            </div>
          </div>
        </div>
        <div className={classes.asteroidsList}>
          <AsteroidsList testDb={testDb} isDistKm={isDistKm} sendDestroyOrder={sendDestroyOrder}/>
        </div>
        <div className={classes.bottom}>
          <p>2022 © All rights and the Planet are reserved</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
