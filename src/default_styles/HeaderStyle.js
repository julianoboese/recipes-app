import styled from 'styled-components';

const HeaderStyles = styled.header`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

color: firebrick;

.header-container {
  height: 60px;
  background-color: gold;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgb(0, 0, 0, 0.2);
}

svg {
  margin: 0 5vw;
  aspect-ratio: 1;
  font-size: 1.5em !important;
  border-radius: 50%;
  padding: 5px;
  color: firebrick;
}

border-radius: 0 0 20px 20px;
margin-bottom: 10px;

background-color: firebrick;
transition: 0.5s;

form {
  z-index: 0;
  transition: 1s;
  border-radius: 0 0 20px 20px;
  height: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin-bottom: 10px;
  color: #333138;
  
  .search-inputs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    
    .radio-buttons {
      margin: 1vh 2vw;
      cursor: pointer;
      color: gold;
    }
  }
  
  button {
    background-color: gold;
    color: firebrick;
    border: 0;
    border-radius: 0 50px 50px 0;
    padding: 0.5rem 0.8rem;
    font-weight: 700;
    height: 6vh;

  }
  
  input[type="text"] {
    border: 0px;
    height: 6vh;
    margin: 5px 0;
    padding: 5px 20px;
    border-radius: 50px 0 0 50px;
  }
}

.search-form-shown {
  height: 19vh;
  z-index: 0;
  transform: translateY(0px);
  opacity: 1;
}

.search-form-hidden {
  height: 0vh;
  z-index: 0;
  transform: translateY(0px);
  opacity: 0;
}

.radio-container {
  display: flex;
}

`;

export default HeaderStyles;
