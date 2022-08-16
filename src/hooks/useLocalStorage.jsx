import React, {useState, useEffect} from 'react';

function useLocalStorage(initialValue, key) {
  
  const getValue = () =>  {
    const ls = localStorage.getItem(key);
    
    if(ls) {
      return JSON.parse(ls);
    }
    return initialValue;
  }
  
  const [value, setValue] = useState(getValue);
  const [] = useState();
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  
  return [value, setValue];
  
}

export default useLocalStorage;
