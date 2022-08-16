import React, {useEffect, useState} from 'react';
import classes from './AsteroidInfo.module.css';
import dangerous from '../../assets/images/dangerous.png';
import notdangerous from '../../assets/images/notdangerous.png';

function AsteroidInfo({asteroid}) {
  
  const {id, name, estimated_diameter, close_approach_data, is_potentially_hazardous_asteroid} = asteroid;
  
  const [diameterMeter, setDiameterMeter] = useState({});
  const [approachDates, setApproachDates] = useState([]);
  const [approachVelocity, setApproachVelocity] = useState([]);
  const [orbitingBody, setOrbitingBody] = useState([]);
  const [minDistance, setMinDistance] = useState([]);
  
  
  useEffect(() => {
     setTimeout(()=> {
       getCloseApproachData();
     }, 0)
  }, [asteroid]);
  
  
   function getCloseApproachData() {
     setApproachDates(close_approach_data.map(item => item.close_approach_date_full));
     setApproachVelocity(close_approach_data.map(item => +item.relative_velocity.kilometers_per_hour));
     setOrbitingBody(close_approach_data.map(item => item.orbiting_body));
     setMinDistance(close_approach_data.map(item => item.miss_distance));
     setDiameterMeter(estimated_diameter.meters);
   }
   
   
  return (
    <div className={classes.AsteroidInfo}>
      
      <div className={classes.AsteroidInfoCard}>
        <img src={
          is_potentially_hazardous_asteroid ? dangerous : notdangerous
        } alt={
          is_potentially_hazardous_asteroid ? 'dangerous' : 'notdangerous'
        }/>
        <p>Full name:</p>
        <h4>{name}</h4>
        <p>ID:</p>
        <h4>{id}</h4>
        <p>Estimated Diameter</p>
        <p>min</p>
        <h4>{Number((+diameterMeter.estimated_diameter_min).toFixed()).toLocaleString('ru-RU')}
          &nbsp;m
        </h4>
        <p>max</p>
        <h4>{
          Number((+diameterMeter.estimated_diameter_max).toFixed()).toLocaleString('ru-RU')
        }
          &nbsp;m
        </h4>
        <p>Potential hazard</p>
        <h4>{is_potentially_hazardous_asteroid ? 'Hazardous' : 'Not hazardous'}</h4>
      </div>
      <div className={classes.AsteroidApproaches}>
        <p>List of All Approaches</p>
        <p>[date & time]</p>
        <p>[velocity, km/hour]</p>
        <p>[orbiting]</p>
        <p>[distance, km]</p>
        <p>[distance, lunar orbit]</p>
        <ul>
          {
            approachDates.map((date, idx) =>
              <li className={classes.listChild} key={idx}>{date}</li>)}
        </ul>
        <ul>
          {
            approachVelocity.map(speed =>
            <li className={classes.listChild} key={speed}>
              {
                Number(speed.toFixed()).toLocaleString('ru-RU')
              }
            </li>)
          }
        </ul>
        <ul>
          {
            orbitingBody.map((orbit, idx) =>
              <li className={classes.listChild} key={idx}>{orbit}</li>)
          }
        </ul>
        <ul>
          {
            minDistance.map(dist =>
            <li className={classes.listChild} key={dist.kilometers}>
              {
                Number((+dist.kilometers).toFixed()).toLocaleString('ru-RU')
              }
            </li>)
          }
        </ul>
        <ul>
          {
            minDistance.map(dist =>
              <li className={classes.listChild} key={dist.lunar}>
                {
                  Number((+dist.lunar).toFixed(2)).toLocaleString('ru-RU')
                }
              </li>)
          }
        </ul>
      </div>
      
    </div>
  );
}

export default AsteroidInfo;
