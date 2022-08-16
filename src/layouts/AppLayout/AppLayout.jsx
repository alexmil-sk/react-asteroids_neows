import React, { useState} from 'react';
import classes from './AppLayout.module.css';
import {Outlet} from 'react-router-dom';
import TheHeader from "../../components/TheHeader/TheHeader.jsx";



function AppLayout({arrayOrders}) {
  
  
  //const [fotoBg, setFotoBg] = useState('');
  
  //useEffect(() => {
  //  fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  //    .then(res => res.json())
  //    .then(data => setFotoBg(data.url))
  //}, []);
  
  return (
    <div
      className={classes.AppLayout}
      // style={{
      //   backgroundImage: fotoBg,
      //   backgroundRepeat: 'no-repeat',
      //   backgroundPosition: 'center',
      //   backgroundSize: 'cover',
      //   width: '100vw',
      //   height: '100vh'
      // }}
    >
     <div className={classes.AppLayoutContainer}>
       <TheHeader arrayOrders={arrayOrders}/>
       
       <Outlet />
       
     </div>
    </div>
  );
}

export default AppLayout;
