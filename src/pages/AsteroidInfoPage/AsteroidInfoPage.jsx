import React, {useState, useEffect} from 'react';
import classes from './AsteroidInfoPage.module.css';
import {Link, useParams} from "react-router-dom";
import AsteroidInfo from "../../components/AsteroidInfo/AsteroidInfo.jsx";
import {BsCardList} from "react-icons/bs";
import btnDestroy from '../../assets/btn/destr-btn.png';
import btnOk from '../../assets/btn/ok-btn.png';

function AsteroidInfoPage({sendDestroyOrder}) {
  const {id} = useParams();
  const [asteroid, setAsteroid] = useState({});
  const [isOrdered, setIsOrdered] = useState(false);
  
  
  // useEffect(() => {
  //   fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY')
  //     .then(res => res.json())
  //     .then(data => setAsteroids(data['near_earth_objects']))
  // }, []);
  
  useEffect(() => {
    fetch(`http://127.0.0.1:5173/src/db/db.json`)
      .then(res => res.json())
      .then(data => data['near_earth_objects'])
      .then(arr => arr.filter(item => item.id === id))
      .then(ast => setAsteroid(ast[0]))
  }, [])
  
  function setOrderFromInfo(asteroid) {
    sendDestroyOrder(asteroid);
    setIsOrdered(true);
  }
  
  
  return (
    <div className={classes.AsteroidInfoPage}>
      <button>
        <Link to="/asteroids">
          <div><BsCardList/></div>
          Back to the asteroids list
        </Link>
      </button>
      
      <div className={classes.AsteroidInfo}>
        <button
          className={
            isOrdered ? classes.okBtn : classes.destroyBtn}
          onClick={() => setOrderFromInfo(asteroid)}
        >
          <p>{isOrdered ? 'MARKED BE DESTROYED' : 'PUSH THIS TO DESTROY'}</p>
          <img
            src={isOrdered ? btnOk : btnDestroy}
            alt={isOrdered ? btnOk : btnDestroy}
          />
        </button>
        <AsteroidInfo asteroid={asteroid}/>
      </div>
    
    </div>
  );
}

export default AsteroidInfoPage;
