import styled from 'styled-components';

const IngredientStyled = styled.main`
display: flex;
flex-wrap: wrap;
justify-content: center;
padding: 15px 0;
margin-bottom: 65px;
gap: 25px;

.card-item {
  width: 35%;
  border: 0;
  padding: 10px;
  background-color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15);
}

.card-p {
  padding: 5px 15px 10px;
  margin: 0;
  font-size: 1.1rem;
  text-align: center;
}

.img-item {
  padding: 0;
  border-radius: 0.5rem 0.5rem 0 0;
  max-width: 100%;
  height: auto;
}

`;

export default IngredientStyled;
