import React, {useEffect, useState} from "react";
import VideoLayout from "./layouts/VideoLayout/VideoLayout.jsx";
import AppLayout from "./layouts/AppLayout/AppLayout.jsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import AsteroidInfoPage from "./pages/AsteroidInfoPage/AsteroidInfoPage.jsx";
import OrdersPage from "./pages/OrdersPage/OrdersPage.jsx";
import NotfoundPage from "./pages/NotfoundPage/NotfoundPage.jsx";
import EntryPage from "./pages/EntryPage/EntryPage.jsx";
import useLocalStorage from './hooks/useLocalStorage.jsx';
import axios from 'axios';


function App() {
  
  const [isLogin, setIsLogin] = useState(false);
  const [arrayOrders, setArrayOrders] = useLocalStorage([], 'arrayOrders');
  const [testDb, setTestDb] = useLocalStorage([], 'testDb');
  const [isChecked, setIsChecked] = useState(false);
  
  
  //======== < UPLOAD FROM NASA > =======================================
  
  //function getAsteroidsArray() {
  //  axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY')
  //    .then(res => setTestDb(res.data['near_earth_objects']))
  //  setArrayOrders([]);
  //}
  
  //======== < UPLOAD FROM NASA > =======================================
  
  
  function getAsteroidsArray() {
    axios.get('http://127.0.0.1:5173/src/db/db.json')
      .then(res => setTestDb(res.data['near_earth_objects']))
    setArrayOrders([]);
  }
  
  
  function loginHandler() {
    setIsLogin(true);
  }
  
  
  function sendDestroyOrder(data) {
    removeFromTestDb(data.id);
    
    const newArrayOrders = [...arrayOrders];
    const newOrder = newArrayOrders.find(item => item.id === data.id);
    
    if (!newArrayOrders.length || !newOrder) {
      newArrayOrders.push(data);
      setArrayOrders(newArrayOrders);
    }
  }
  
  function removeFromTestDb(id) {
    setTestDb(testDb.filter(item => item.id !== id));
  }
  
  
  function removeFromOrder(id) {
    setArrayOrders(arrayOrders.filter(item => item.id !== id));
  }
  
  function toggleDangerAsteroidHandler(e) {
    setIsChecked(!isChecked)
    if (e.target.checked) {
      const newTestDb = [...testDb];
      setTestDb(newTestDb.filter(item => item.is_potentially_hazardous_asteroid === true));
    } else if (!e.target.checked) {
      getAsteroidsArray();
    } else if (arrayOrders.length) {
      setTestDb(useLocalStorage(testDb, 'arrayOrders'));
    }
  }
  
  return (
    <div>
      <Routes>
        <Route path="/" element={
          isLogin ? <AppLayout arrayOrders={arrayOrders}/> : <VideoLayout loginHandler={loginHandler}/>
        }>
          <Route index element={<EntryPage/>}/>
          <Route path="asteroids" element={
            <HomePage
              testDb={testDb}
              isChecked={isChecked}
              getAsteroidsArray={getAsteroidsArray}
              sendDestroyOrder={sendDestroyOrder}
              toggleDangerAsteroidHandler={toggleDangerAsteroidHandler}/>}/>
          <Route path="asteroids/:id" element={<AsteroidInfoPage sendDestroyOrder={sendDestroyOrder}/>}/>
          <Route path="orders" element={<OrdersPage arrayOrders={arrayOrders} removeFromOrder={removeFromOrder}/>}/>
          <Route path="*" element={<NotfoundPage/>}/>
        </Route>
      </Routes>
    </div>
  )
  
}

export default App;
