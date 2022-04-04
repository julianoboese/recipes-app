import styled from 'styled-components';

const FoodDetailsStyled = styled.main`
background-color: gold;
.food-thumbnail {
  width: 100%;
}

.title {
  position: absolute;
  width: 100%;
  top: 313px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: firebrick;
  padding: 10px 1rem;
  background-image: 
  linear-gradient(to top, rgba(255, 215, 0, 1), rgba(255, 215, 0, 0));
}

.title > h1 {
  font-size: 2rem;
  margin: 0;
}

.title > p {
  padding-top: 0.1rem;
  font-size: 0.8rem;
  font-style: italic;
}

.action-buttons {
  position: absolute;
  right: 10px;
  top: 332px;
  display: flex;
  gap:  10px;
}

.action-buttons > button {
  border: 0;
  background-color: rgba(255, 255, 255, 0);
  font-size: 1.5rem;
  color: firebrick;
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
`;

export default FoodDetailsStyled;
