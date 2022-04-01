import styled from 'styled-components';

const MainStyled = styled.section`
.card-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 15px 0;
  margin-bottom: 65px;
  gap: 15px;
}
.card-item {
  width: 40%;
  border: 0;
  padding: 0;
  background-color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15);
}

.card-p {
  padding: 5px 10px 10px;
  margin: 0;
  text-align: center;
}

a {
  color: #0C1821;
  text-decoration: none;
  font-weight: 500;
  margin: 0;
}

.img-item {
  padding: 0;
  border-radius: 0.5rem 0.5rem 0 0;
  max-width: 100%;
  height: auto;
}

.emoji {
  aspect-ratio: 1;
  font-size: 30px;
}
`;

export default MainStyled;
