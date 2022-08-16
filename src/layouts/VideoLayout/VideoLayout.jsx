import React, {useEffect, useState} from 'react';
import classes from './VideoLayout.module.css';
import videoBg from '../../assets/video/earth-moon.mp4';
import audioSpace from '../../assets/audio/space-music-1.mp3';
import videoPoster from '../../assets/posters/video-poster.png';
import {AiFillSound} from "react-icons/ai";
import {FaLock, FaLockOpen} from "react-icons/fa";

function VideoLayout({loginHandler}) {
  
  const [userWidth, setUserWidth] = useState('');
  const [userHeight, setUserHeight] = useState('');
  const [onSound, setOnSound] = useState(false)
  const [isEnter, setIsEnter] = useState(false)
  
  function resizeWindow() {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1280) {
        setUserWidth(null);
        setUserHeight(String(window.innerHeight));
      } else {
        setUserWidth(String(window.innerWidth));
        setUserHeight(null);
      }
    }, true);
  }
  
  function toggleTheSound() {
    setOnSound(!onSound)
  }
  
  function enterHandler() {
    setIsEnter(true);
    setTimeout(() => {
      loginHandler();
    }, 500)
  }
  
  useEffect(() => {
    resizeWindow();
  }, [userWidth]);
  
  return (
    <div className={classes.VideoLayout}>
      <div
        className={classes.enterBtn}
        onClick={enterHandler}
      >
        <button
          className={isEnter ? classes.login : classes.logout}
        >
          {
            isEnter ? <FaLockOpen /> : <FaLock/>
          }
        </button>
      </div>
      <div className={classes.video}>
        <video poster={videoPoster} muted autoPlay loop width={userWidth} height={userHeight} src={videoBg}/>
      </div>
      <div>
        <audio src={audioSpace} autoPlay loop muted={!onSound}></audio>
      </div>
      <div className={classes.soundBtn}>
        <button
          className={onSound ? classes.green : classes.red}
          onClick={toggleTheSound}
        ><AiFillSound/></button>
      </div>
    </div>
  );
}

export default VideoLayout;
