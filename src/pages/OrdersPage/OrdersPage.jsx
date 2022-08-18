import React, {useEffect, useState} from 'react';
import classes from './OrdersPage.module.css';
import {RiDeleteBin6Line} from "react-icons/ri";
import startBruceTeam from "../../assets/video/startBruceTeam.mp4";
import { GrClose } from "react-icons/gr";


function OrdersPage({arrayOrders, removeFromOrder, showMessage}) {
  
  const [isShow, setIsShow] = useState(false);
  
  function showVideoHandler() {
    console.log('showVideoHandler');
    setIsShow(true);
  }
  
  useEffect(() => {
    if(!arrayOrders.length) {
      showVideoHandler();
    }
  }, []);
  
  return (
    <div className={classes.OrdersPage}>
      <h1 className={arrayOrders.length ? classes.OrdersPageTitleNotSafe : classes.OrdersPageTitleSafe}>
        {arrayOrders.length ? 'Requests for destruction' : 'Earth in safe'}
      </h1>
      <div className={arrayOrders.length ? classes.ArrayOrdersList : classes.EarthInSafe}>
        {
          arrayOrders.length
            ? (arrayOrders.map(item => (
              <div key={item.id} className={classes.ArrayOrdersItem}>
                <p>Asteroid`s name:</p>
                <p><strong>{item.name}</strong></p>
                <p>ID:</p>
                <p><strong>{item.id}</strong></p>
                <p>Nearest approach day:</p>
                <p><strong>
                  {
                    item['close_approach_data']
                      .map(item => item['close_approach_date_full'])
                      .filter(item => new Date(item) >= Date.now())[0]
                  }
                </strong></p>
                <button
                  onClick={() => removeFromOrder(item.id)}
                ><RiDeleteBin6Line/></button>
              </div>
            )))
            : null
        }
        {
          arrayOrders.length
            ? (<div
              onClick={showMessage}
              className={classes.callBruceBtn}>
              <button
              >CALL BRUCE TROOPERS
              </button>
            </div>)
            : (<div className={classes.BruceVideo}>
              <div className={classes.video}>
                {
                  isShow
                    ? null
                    : (<div>
                      <video autoPlay loop={false} src={startBruceTeam}/>
                      <button
                        onClick={showVideoHandler}
                        className={classes.closeBtn}
                        ><GrClose />
                      </button>
                    </div>)
                }
              </div>
            </div>)
        }
      </div>
    </div>
  
  );
}

export default OrdersPage;
