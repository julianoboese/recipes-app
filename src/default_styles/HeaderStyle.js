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
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgb(0, 0, 0, 0.2);
}
svg {
  margin: 0 5vw;
  aspect-ratio: 1;
  font-size: 1.5em;
  /* border: 4px solid black; */
  border-radius: 50%;
  padding: 5px;
  color: firebrick;
}

form {
  background-color: #f05d23;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  height: 15vh;
  align-items: center;
  font-weight: 500;
  color: #333138;
  padding: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.search-inputs {

}

`;

export default HeaderStyles;
