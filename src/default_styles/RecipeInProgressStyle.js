import styled from 'styled-components';

const RecipeInProgress = styled.main`
background-color: whitesmoke;
padding-bottom: 60px;
.food-thumbnail {
  width: 100%;
}

.home-btn {
  position: absolute;
  top: 3.5vh;
  z-index: 1000;
}

.header-title {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  color: #0C1821;
}

.title-box {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-image: 
  linear-gradient(to top, rgba(245, 245, 245, 1), rgba(245, 245, 245, 0));
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
  color: firebrick;
}

.ingredients-section {
  color: #0C1821;
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
  border-left: 6px solid #0C1821;
}

.ingredients-section li {
  list-style-type: none;
  padding-left: 6px;
}

.instructions-section {
  padding-left: 1rem;
  color: #0C1821;
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
  color: #0C1821;
}

.video-section iframe {
  width: 100%;
  margin-bottom: 1.5rem;
}

.link-start-btn {
  position: fixed;
  bottom: 5px;
  left: 30%;
}

.start-button {
  background-color: firebrick;
  border: 0;
  border-radius: 50px;
  color: gold;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.8rem 1rem;
}

.start-button:disabled {
  background-color: rgb(148,24,24)
}

`;

export default RecipeInProgress;
