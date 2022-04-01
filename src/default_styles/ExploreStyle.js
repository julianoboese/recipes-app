import styled from 'styled-components';

const ExploreStyled = styled.main`
display: flex;
flex-direction: column;
margin-top: 2rem;
justify-content: center;
align-items: center;
gap: 20px;

a {
  width: 80%;
}

button {
  width: 100%;
  background-color: firebrick;
  border: 0;
  border-radius: 50px;
  color: gold;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.8rem;
}

.surprise-button {
  width: 80%;
}
`;

export default ExploreStyled;
