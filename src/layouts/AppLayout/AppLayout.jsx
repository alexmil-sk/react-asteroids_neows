import React, {useEffect, useState} from 'react';
import classes from './AppLayout.module.css';
import {Outlet} from 'react-router-dom';
import TheHeader from "../../components/TheHeader/TheHeader.jsx";
import axios from 'axios';


function AppLayout({arrayOrders}) {
  
  //======== < UPLOAD FROM NASA > =======================================
  const [fotoBg, setFotoBg] = useState('');
  
  useEffect(() => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=yq6e5IV45VYcAzM8DgttuZhDir0TJu5f5O9GzE6z')
      .then(res => setFotoBg(res.data.url))
  }, []);
  
  //======== </ UPLOAD FROM NASA > =======================================
  
  return (
    <div
      className={classes.AppLayout}
      style={{ backgroundImage: `url(${fotoBg})`,
        backgroundSize: '100% auto' }}
    >
      <div className={classes.AppLayoutContainer}>
        <TheHeader arrayOrders={arrayOrders} fotoBg={fotoBg}/>
        
        <Outlet/>
      
      </div>
    </div>
  );
}

export default AppLayout;
