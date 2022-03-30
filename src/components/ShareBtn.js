import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ type, id }) {
  const [isShared, setIsShared] = useState(false);

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        className="btn btn-primary mr-1"
        onClick={ () => {
          navigator.clipboard.writeText(`http://localhost:3000/${type}/${id}`);
          setIsShared(true);
        } }
      >
        <img src={ shareIcon } alt="icone para compartilhar" />
      </button>

      {isShared && <p>Link copied!</p>}
    </>
  );
}

ShareBtn.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ShareBtn;
