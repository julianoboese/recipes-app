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
  /* margin-bottom: 10px; */
  display: flex;
  justify-content: space-between;
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

form {
  transition: 0.5s;
  transform: translateY(10px);
  background-color: #ea855e;
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: row;
  height: 15vh;
  align-items: center;
  font-weight: 500;
  margin-bottom: 10px;
  color: #333138;
  padding: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  .search-inputs {
    display: flex;
    flex-direction: column;
    align-items: baseline;

    .radio-buttons {
      margin: 0 2px;
    }
  }

  input {
    margin: 5px 0;
    padding: 5px;
  }
}

.search-inputs {

}

`;

export default HeaderStyles;
