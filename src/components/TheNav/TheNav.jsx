import React from 'react';
import classes from './TheNav.module.css';
import {NavLink} from 'react-router-dom';
import CustomLink from '../CustomLink/CustomLink.jsx';

const setActive = ({ isActive }) =>
  isActive ? classes.activeClassName : '';

function TheNav({arrayOrders}) {
  
  return (
    <>
      <nav className={classes.TheNav}>
        <div className={classes.TheNavContainer}>
          <CustomLink
            to="/"
          >Entry scene</CustomLink>
          <CustomLink
            to="/asteroids"
            className={setActive}
          >Asteroids</CustomLink>
          <NavLink
            to="/orders"
            className={setActive}
          >Orders
            <span className={classes.Badge}>{arrayOrders.length}</span>
          </NavLink>
        </div>
      </nav>
      
    </>
  );
}

export default TheNav;
