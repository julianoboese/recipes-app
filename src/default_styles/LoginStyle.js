import styled from 'styled-components';

const LoginStyle = styled.form`
height: 100%;
color: white;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

* {
  margin-bottom: 20px;
}

input {
  width: 40vw;
  padding: 7px;
}

button {
  width: 40vw;
  background-color: #7f5af0;
  border: 0;
  border-radius: 5px;
  color: #fffffe;
  font-size: 1.2rem;
  font-style: bold;
  padding: 0.6rem;
}

button:disabled {
  background-color: #8872cb;
}
`;

export default LoginStyle;
