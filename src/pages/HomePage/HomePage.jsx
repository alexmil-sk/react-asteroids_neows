import React, {useEffect, useRef, useState} from 'react';
import classes from './HomePage.module.css';
import AsteroidsList from "../../components/AsteroidsList/AsteroidsList.jsx";


function HomePage({sendDestroyOrder}) {
  
  const [isDistKm, setIsDistKm] = useState(true);
  const [testDb, setTestDb] = useState([]);
  
  
  const refInputKm = useRef();
  const refInputLunar = useRef();
  
  
  // const [asteroids, setAsteroids] = useState([]);
  
  // useEffect(() => {
  //function getAsteroidsArray() {
  //   fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY')
  //     .then(res => res.json())
  //     .then(data => setAsteroids(data['near_earth_objects']))
  //}
  // }, []);
  
  useEffect(() => {
    refInputKm.current.hidden = true;
    refInputLunar.current.hidden = true;
    getAsteroidsArray();
  }, []);
  
  function getAsteroidsArray() {
    fetch('http://127.0.0.1:5173/src/db/db.json')
      .then(res => res.json())
      .then(data => setTestDb(data['near_earth_objects']))
  }
  
  function distTypeHandler(e) {
    if (e.target.value === 'lunarOrb') {
      setIsDistKm(false);
    } else {
      setIsDistKm(true);
    }
  }
  
  function toggleDangerAsteroidHandler(e) {
    
    if (e.target.checked) {
      const newTestDb = [...testDb];
      setTestDb(newTestDb.filter(item => item.is_potentially_hazardous_asteroid === true));
    } else if (!e.target.checked) {
      getAsteroidsArray();
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
            <div>
              <label className={classes.dangerous}>
                <input
                  type="checkbox"
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
