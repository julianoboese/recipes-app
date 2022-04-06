import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import shareIcon from '../images/shareIcon.svg';

function DoneCard({ recipe, index }) {
  const { id, type, category, nationality, alcoholicOrNot, name, image, doneDate,
    tags } = recipe;

  const [isShared, setIsShared] = useState(false);

  return (
    <div className="card card-done">
      <Link to={ `/${type}s/${id}` }>
        <img
          className="card-image"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Link to={ `/${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` } className="card-title">
          {name}
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` } className="done-date">
        {doneDate}
      </p>
      <button
        type="button"
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        className="share-btn"
        onClick={ () => {
          navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
          setIsShared(true);
        } }
      >
        <FontAwesomeIcon icon={ faCopy } />
      </button>
      {isShared && global.alert('Link Copied!')}
      <p data-testid={ `${index}-horizontal-top-text` } className="card-description done">
        {type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot}
      </p>
      {tags.slice(0, 2).map((tag) => (
        <div
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
          className="card-description done"
        >
          {tag}
        </div>
      ))}
    </div>
  );
}

DoneCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};

export default DoneCard;
