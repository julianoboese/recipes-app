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
  margin-bottom: 3vh;
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
  padding: 2vh 11vw;
  transform: translate(-50%, 0);
  margin-left: 50vw;
}

.start-button:disabled {
  background-color: rgb(148,24,24);
  cursor: not-allowed;
}

.ingredients-label {
  display: flex;
  line-height: 5vh;
  align-items: center;
}

input[type="checkbox"] {
  -webkit-appearance: none;
  margin-left: 3vw;

  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  transform-origin: bottom left;
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em black;
  /* Windows High Contrast Mode */
  background-color: CanvasText;
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}

input[type="checkbox"]:focus {
  outline: max(2px, 0.15em) solid currentColor;
  outline-offset: max(2px, 0.15em);
}


`;

export default RecipeInProgress;
