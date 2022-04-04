import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Link to="/foods">
      <FontAwesomeIcon icon={ faHouse } />
    </Link>
  );
}

export default Home;
