import React, {useEffect, useState} from 'react';
import classes from './PhotosPage.module.css';
import axios from 'axios';

function PhotosPage() {
  
  const [fetching, setFetching] = useState(false);
  const [photos, setPhotos] = useState([]);
  
  //======= < PAGINATION > ==================================================
  
  useEffect(() => {
    getPhotos();
    document.addEventListener('scroll', loadScrollHandler);
    return function () {
      document.removeEventListener('scroll', loadScrollHandler);
    };
  }, []);
  
  useEffect(() => {
    if(fetching) {
      getPhotos();
    }
  }, [fetching]);
  
  function getPhotos() {
    axios.get('https://api.nasa.gov/planetary/apod?count=2&thumbs=true&api_key=yq6e5IV45VYcAzM8DgttuZhDir0TJu5f5O9GzE6z')
      .then(res => {
        setPhotos([...photos, ...res.data]);
      })
      .finally(() => setFetching(false))
  }
  
  const loadScrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true);
    }
  }
  
  //======= </ PAGINATION > ==================================================
  
  
  return (
    <>
      <div className={classes.PhotosPage}>
        <div className={classes.PhotosPageContainer}>
          
            {
              photos.map((photo) =>
                <div key={photo.id} className={classes.PhotosPageContainerItem}>
                  <h3>{photo.title}</h3>
                  <img src={photo['url']} alt="photo"/>
                </div>)
            }
        </div>
      </div>
    
    </>
  );
}

export default PhotosPage;
