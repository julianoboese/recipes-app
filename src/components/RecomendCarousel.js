import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function RecomendCarousel({ recomendations, loading }) {
  const activeClassName = 'carousel-item active';
  const commumClassName = 'carousel-item';

  const [activeCarousel, setActiveCarousel] = useState([
    activeClassName, commumClassName, commumClassName,
  ]);

  useEffect(() => {
    setActiveCarousel([
      activeClassName, commumClassName, commumClassName,
    ]);
  }, []);

  const handleCarouselChange = (event) => {
    const isAtEndOfCarousel = activeCarousel[2].includes('active');

    const numberOfActive = activeCarousel
      .filter((item) => item.includes('active')).length;

    if (event.target.className.includes('next') && !isAtEndOfCarousel) {
      activeCarousel[numberOfActive] = activeClassName;
    }

    if (event.target.className.includes('prev') && numberOfActive > 1) {
      activeCarousel[numberOfActive - 1] = commumClassName;
    }
  };

  return (
    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {!loading && activeCarousel.map((carouselPosition, index) => {
          let recomIndex = [];
          const POSITION_1TH_ARR = 0;
          const POSITION_2TH_ARR = 1;
          const POSITION_3TH_ARR = 2;
          const POSITION_4TH_ARR = 3;
          const POSITION_5TH_ARR = 4;
          const POSITION_6TH_ARR = 5;
          if (index === 0) recomIndex = [POSITION_1TH_ARR, POSITION_2TH_ARR];
          if (index === 1) recomIndex = [POSITION_3TH_ARR, POSITION_4TH_ARR];
          if (index === 2) recomIndex = [POSITION_5TH_ARR, POSITION_6TH_ARR];

          return (
            <div key={ index } className={ carouselPosition }>
              <div className="d-flex mw-100 my-3">
                <div
                  className="w-50 card"
                  data-testid={ `${recomIndex[0]}-recomendation-card` }
                >
                  <img
                    className="w-100"
                    src={ recomendations[recomIndex[0]].imgUrl }
                    alt="First slide"
                  />
                  <p>{recomendations[recomIndex[0]].category}</p>
                  <h4
                    data-testid={ `${recomIndex[0]}-recomendation-title` }
                  >
                    {recomendations[recomIndex[0]].name}

                  </h4>
                </div>

                <div
                  className="w-50 card"
                  data-testid={ `${recomIndex[1]}-recomendation-card` }
                >
                  <img
                    className="w-100"
                    src={ recomendations[recomIndex[1]].imgUrl }
                    alt="First slider"
                  />
                  <p>{recomendations[recomIndex[1]].category}</p>
                  <h4
                    data-testid={ `${recomIndex[1]}-recomendation-title` }
                  >
                    {recomendations[recomIndex[1]].name}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <a
        onClick={ handleCarouselChange }
        className="carousel-control-prev"
        href="#carouselControlsBackward"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        onClick={ handleCarouselChange }
        className="carousel-control-next"
        href="#carouselControlForward"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

RecomendCarousel.propTypes = {
  loading: PropTypes.bool.isRequired,
  recomendations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
};
export default RecomendCarousel;
