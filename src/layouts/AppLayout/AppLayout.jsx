import React, {useEffect, useState} from 'react';
import classes from './AppLayout.module.css';
import {Outlet} from 'react-router-dom';
import TheHeader from "../../components/TheHeader/TheHeader.jsx";
import axios from 'axios';


function AppLayout({arrayOrders}) {
  
  //======== < UPLOAD FROM NASA > =======================================
  //const [fotoBg, setFotoBg] = useState('');
  
  //useEffect(() => {
  //  axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  //    .then(res => setFotoBg(res.data.url))
  //}, []);
  
  //======== </ UPLOAD FROM NASA > =======================================
  
  return (
    <div
      className={classes.AppLayout}
      //style={{ backgroundImage: `url(${fotoBg})` }}
    >
      <div className={classes.AppLayoutContainer}>
        <TheHeader arrayOrders={arrayOrders}/>
        
        <Outlet/>
      
      </div>
    </div>
  );
}

export default AppLayout;
