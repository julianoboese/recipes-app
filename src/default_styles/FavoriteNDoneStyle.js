import styled from 'styled-components';

const FavoriteNDoneStyled = styled.main`
.filter-section {
  width: 83%;
  display: flex;
  justify-content: center;
  margin: 10px auto;
  gap: 0.5rem;
}

.filter-item {
  background-color: firebrick;
  color: gold;
  border: 0;
  border-radius: 50px;
  padding: 0.5rem 0.8rem;
  font-weight: 700;
}

.filter-item:first-child {
  padding: 0 1rem;
}

.card-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin-bottom: 65px;
  gap: 15px;
}

.card {
  width: 40%;
  height: min-content;
  border: 0;
  padding: 0;
  background-color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15);
}

.card-done {
  gap: 0.5rem;
}

.card-image {
  padding: 0;
  border-radius: 0.5rem 0.5rem 0 0;
  max-width: 100%;
  height: auto;
}

.share-btn {
  position: absolute;
  right: 7px;
  top: 7px;
  border: 0;
  background-color: rgba(255, 255, 255, 0);
  font-size: 1.5rem;
  color: firebrick;
}

.favorite-btn {
  position: absolute;
  right: 7px;
  top: 110px;
  border: 0;
  background-color: rgba(255, 255, 255, 0);
  font-size: 1.5rem;
  color: firebrick;
}

a {
  text-decoration: none;
}

.card-title {
  color: black;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0;
}

.card-description {
  margin: 0.5rem 0;
  text-align: center;
  font-size: small;
}

.done {
  margin: 0;
}

.done:last-child {
  margin-bottom: 0.5rem;
}

.done-date {
  position: absolute;
  right: 7px;
  top: 110px;
}

`;

export default FavoriteNDoneStyled;
