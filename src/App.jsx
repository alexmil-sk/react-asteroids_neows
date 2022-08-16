import React, { useState} from "react";
import VideoLayout from "./layouts/VideoLayout/VideoLayout.jsx";
import AppLayout from "./layouts/AppLayout/AppLayout.jsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import AsteroidInfoPage from "./pages/AsteroidInfoPage/AsteroidInfoPage.jsx";
import OrdersPage from "./pages/OrdersPage/OrdersPage.jsx";
import NotfoundPage from "./pages/NotfoundPage/NotfoundPage.jsx";
import EntryPage from "./pages/EntryPage/EntryPage.jsx";
import useLocalStorage from './hooks/useLocalStorage.jsx';


function App() {
  
  const [isLogin, setIsLogin] = useState(false);
  const [arrayOrders, setArrayOrders] = useLocalStorage([], 'arrayOrders');
  
  
  function loginHandler() {
    setIsLogin(true);
  }
  
  
  function sendDestroyOrder(data) {
    const newArrayOrders = [...arrayOrders];
    const newOrder = newArrayOrders.find(item => item.id === data.id);
    
    
    if (!newArrayOrders.length || !newOrder) {
      newArrayOrders.push(data);
      setArrayOrders(newArrayOrders);
    } else {
      console.log('asteroid is already in order...')
    }
  }
  
  function removeFromOrder(id) {
    setArrayOrders(arrayOrders.filter(item => item.id !== id));
  }
  
  return (
    <div>
      <Routes>
        <Route path="/" element={
          isLogin ? <AppLayout arrayOrders={arrayOrders}/> : <VideoLayout loginHandler={loginHandler}/>
        }>
          <Route index element={<EntryPage/>}/>
          <Route path="asteroids" element={<HomePage sendDestroyOrder={sendDestroyOrder}/>}/>
          <Route path="asteroids/:id" element={<AsteroidInfoPage sendDestroyOrder={sendDestroyOrder}/>}/>
          <Route path="orders" element={<OrdersPage arrayOrders={arrayOrders} removeFromOrder={removeFromOrder}/>}/>
          <Route path="*" element={<NotfoundPage/>}/>
        </Route>
      </Routes>
    </div>
  )
  
}

export default App;
