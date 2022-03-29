import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      className="fixed-bottom d-flex justify-content-between mx-3"
      data-testid="footer"
    >
      <Link to="/drinks">
        <button type="button" className="btn btn-primary">
          <img
            src={ drinkIcon }
            alt="imagem de um drink"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </Link>

      <Link to="/explore">
        <button type="button" className="btn btn-primary">
          <img
            src={ exploreIcon }
            alt="imagem de uma bússola"
            data-testid="explore-bottom-btn"
          />
        </button>
      </Link>

      <Link to="/foods">
        <button type="button" className="btn btn-primary">
          <img
            src={ mealIcon }
            alt="imagem de garfo e colher cruzados"
            data-testid="food-bottom-btn"
          />
        </button>
      </Link>

    </footer>
  );
}

export default Footer;
