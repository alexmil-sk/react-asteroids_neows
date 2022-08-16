import React from 'react';
import {Link, useMatch} from 'react-router-dom';

function CustomLink({children, to}) {
  
  const match = useMatch(to);
  
  return (
    <>
      <Link
        to={to}
        style={{textDecoration: match ? 'underline' : 'none'}}
      >
        {children}
      </Link>
    </>
  );
}

export default CustomLink;
