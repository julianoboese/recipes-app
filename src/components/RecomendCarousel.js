import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function RecomendCarousel({ recomendations }) {
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
    console.log(recomendations);
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
        <div className={ activeCarousel[0] }>
          <img className="w-50" src="https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg" alt="First slide" />
          <img className="w-50" src="https://www.themealdb.com/images/media/meals/58oia61564916529.jpg" alt="First slider" />
        </div>
        <div className={ activeCarousel[1] }>
          <img className="w-50" src="https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg" alt="Second slide" />
          <img className="w-50" src="https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg" alt="Third slide" />
        </div>
        <div className={ activeCarousel[2] }>
          <img className="w-50" src="https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg" alt="Third slide" />
          <img className="w-50" src="https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg" alt="Second slide" />
        </div>
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
  recomendations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
};
export default RecomendCarousel;
