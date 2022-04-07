import styled from 'styled-components';

const CarouselStyle = styled.div`
position: relative;

.cards-container {
  display: flex;
}

.card {
  /* 
  
  min-width: 0;
  word-wrap: break-word;
  background-color: firebrick;
  color: gold;
  background-clip: border-box;
  max-width: 50%; */

  margin: 0 auto;

  text-decoration: none;
  color: black;
  flex-direction: column;
  display: flex;
  width: 47vw;
  border: 0;
  padding: 0;
  background-color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.15);
}

  p {
    margin: 5px auto;
  }

  h4 {
    margin: 5px auto 15px auto;
  }
}

.card img {
  border-radius: 0.5rem 0.5rem 0 0;
}

.carousel-inner {
  position: relative;
  width: 100%;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.carousel-item {
  position: relative;
  display: none;
  float: left;
  width: 100%;
  margin-right: -100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: -webkit-transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 15%;
  padding: 0;
  color: #fff;
  text-align: center;
  background: none;
  border: 0;
  opacity: 0.5;
  transition: opacity 0.15s ease;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: 50% / 100% 100% no-repeat;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.carousel-item.active,
.carousel-item-next,
.carousel-item-prev {
  display: block;
}

.carousel-control-prev:hover, .carousel-control-prev:focus,
.carousel-control-next:hover,
.carousel-control-next:focus {
  color: #fff;
  text-decoration: none;
  outline: 0;
  opacity: 0.9;
}

.carousel-control-prev {
  left: 0;
}

.carousel-control-next {
  right: 0;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: 50% / 100% 100% no-repeat;
}

.carousel-control-prev-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z'/%3e%3c/svg%3e");
}

.carousel-control-next-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z'/%3e%3c/svg%3e");
}
`;

export default CarouselStyle;
