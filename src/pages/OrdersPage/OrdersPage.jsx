import React from 'react';
import classes from './OrdersPage.module.css';

function OrdersPage({arrayOrders, removeFromOrder}) {
  
  
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
                      item.close_approach_data
                        .map(item => item.close_approach_date_full)
                        .filter(item => new Date(item) >= Date.now())[0]
                    }
                  </strong></p>
                  <button
                    onClick={() => removeFromOrder(item.id)}
                  >X</button>
                </div>
              )))
                : <></>
          }
      </div>
      
    </div>
  );
}

export default OrdersPage;
