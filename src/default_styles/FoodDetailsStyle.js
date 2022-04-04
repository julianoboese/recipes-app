import styled from 'styled-components';

const FoodDetailsStyled = styled.main`
background-color: gold;
.food-thumbnail {
  width: 100%;
}

.header-title {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  color: firebrick;
}

.title-box {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-image: 
  linear-gradient(to top, rgba(255, 215, 0, 1), rgba(255, 215, 0, 0));
}

.title-box > h1 {
  font-size: 1.8rem;
  margin: 0;
  padding-left: 1rem;
}

.title-box > p {
  padding-top: 0.1rem;
  padding-right: 1rem;
  font-size: 0.8rem;
  font-style: italic;
}

.action-buttons {
  position: absolute;
  right: 10px;
  top: 30px;
  display: flex;
  gap:  10px;
}

.action-buttons > button {
  border: 0;
  background-color: rgba(255, 255, 255, 0);
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.8);
}

.ingredients-section {
  color: firebrick;
  padding-left: 1rem;
  margin: 0;
}

.ingredients-section h3 {
  font-size: 1.3rem;
}

.ingredients-section ul {
  margin: 0;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-left: 6px solid firebrick;
}

.ingredients-section li {
  list-style-type: none;
  padding-left: 6px;
}

.instructions-section {
  padding-left: 1rem;
  color: firebrick;
}

.instructions-section h3 {
  font-size: 1.3rem;
}

.instructions-section p {
  width: 90%;
}

.video-section h3 {
  padding: 1rem;
  font-size: 1.3rem;
  color: firebrick;
}

.video-section iframe {
  width: 100%;
  margin-bottom: 1.5rem;
}

.start-button {

}
`;

export default FoodDetailsStyled;
