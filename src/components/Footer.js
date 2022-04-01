import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChampagneGlasses,
  faCompass,
  faBowlFood,
} from '@fortawesome/free-solid-svg-icons';

import FooterStyle from '../default_styles/FooterStyle';

function Footer() {
  return (
    <FooterStyle
      data-testid="footer"
    >
      <li className="list">
        <Link to="/foods">
          <span className="icon">

            <FontAwesomeIcon icon={ faBowlFood } />

          </span>
          <span className="text">Foods</span>

        </Link>

      </li>

      <li className="list">
        <Link to="/explore">
          <span className="icon">
            <FontAwesomeIcon icon={ faCompass } />

          </span>
          <span className="text">Explore</span>
        </Link>
      </li>

      <li className="list active">
        <Link to="/drinks">
          <span className="icon">
            <FontAwesomeIcon icon={ faChampagneGlasses } />
          </span>
          <span className="text">Drinks</span>

        </Link>
      </li>
      {/* <div className="indicator" /> */}
    </FooterStyle>
  );
}

export default Footer;
