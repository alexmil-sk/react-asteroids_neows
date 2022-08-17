import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import classes from './AsteroidItem.module.css';
import dangerous from '../../assets/images/dangerous.png';
import notdangerous from '../../assets/images/notdangerous.png';
import {IoInformationCircleSharp} from "react-icons/io5";


function AsteroidItem({asteroid, isDistKm, sendDestroyOrder}) {
  
  const navigate = useNavigate();
  const {close_approach_data} = asteroid;
  
  
  const [closeApproach, setCloseApproach] = useState([]);
  const [isHazardous, setIsHazardous] = useState(false);
  const [approachDates, setApproachDates] = useState([]);
  
  
  const diameterMax = asteroid['estimated_diameter'].meters['estimated_diameter_max'];
  const diameterMin = asteroid['estimated_diameter'].meters['estimated_diameter_min'];
  const diameterAverage = Number(((diameterMax + diameterMin) / 2).toFixed()).toLocaleString('ru-RU');
  
  
  function getApproachDist() {
    const newCloseApproach = [...closeApproach];
    newCloseApproach.push(asteroid['close_approach_data']
      .map(date => ({
        approachData: date['epoch_date_close_approach'],
        distanceKm: date['miss_distance'].kilometers,
        distanceLuna: date['miss_distance'].lunar
      }))
      .filter(date => date.approachData > Date.now())
    );
    setCloseApproach(newCloseApproach);
  }
  
  useEffect(() => {
    getApproachDist();
    potentialHazardHandler();
    getShortCloseApproachData();
  }, []);
  
  function getDistKm() {
    return closeApproach.map(item => Number((+item[0].distanceKm).toFixed(0)).toLocaleString('ru-RU'));
  }
  
  function getDistLuna() {
    return closeApproach.map(item => Number((+item[0].distanceLuna).toFixed(2)).toLocaleString('ru-RU'));
  }
  
  function potentialHazardHandler() {
    setIsHazardous(asteroid['is_potentially_hazardous_asteroid']);
  }
  
  function setOrderFromItem(asteroid) {
    sendDestroyOrder(asteroid);
    
  }
  
  function navigation() {
    navigate(`/asteroids/${asteroid.id}`);
  }
  
  function getShortCloseApproachData() {
    let arr = close_approach_data.filter(item => item.epoch_date_close_approach > Date.now());
    return setApproachDates((arr[0].close_approach_date_full).slice(0, 12))
  }
  
  
  return (
    <div className={classes.AsteroidItem}>
      <div className={classes.AsteroidItemBlock}>
        <div className={classes.AsteroidItemBlockContainer}>
          <p className={classes.AsteroidBlockData}>{approachDates}</p>
          <div className={classes.AsteroidItemContainer}>
            <div className={classes.itemPic}>
              {
                isHazardous
                  ? <img src={dangerous} alt="dangerous"/>
                  : <img src={notdangerous} alt="notdangerous"/>
              }
            
            </div>
            <div className={classes.itemContent}>
              <p className={classes.itemContentTitle} onClick={() => navigation()}>{asteroid.name}</p>
              <span  onClick={() => navigation()}><IoInformationCircleSharp/></span>
              <p className={classes.itemContentDiameter}><span>&#8960;</span>&nbsp;{diameterAverage}&nbsp;м</p>
              {
              
              }
              <p className={classes.itemContentDist}>
                {
                  isDistKm ? `${getDistKm()} km` : `${getDistLuna()} lunar orb`
                }
              </p>
              <p className={classes.itemContentDangerous}>
                {
                  isHazardous ? 'Dangerous' : 'Not dangerous'
                }
              </p>
            </div>
          </div>
          <div className={classes.itemContentBtn}>
            <button
              onClick={() => setOrderFromItem(asteroid)}
            >Destroy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsteroidItem;
