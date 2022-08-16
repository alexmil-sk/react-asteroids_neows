import React from 'react';
import classes from './NotfoundPage.module.css';
import {Link} from "react-router-dom";

function NotfoundPage() {
  return (
    <>
      <Link to="/asteroids">Back to the asteroids list</Link>
      <h1>NotfoundPage</h1>
      
    </>
  );
}

export default NotfoundPage;
