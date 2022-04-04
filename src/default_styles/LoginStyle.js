import styled from 'styled-components';

const LoginStyle = styled.form`
height: 100vh;
color: white;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 5px;
background-color: gold;


* {
  margin-bottom: 20px;
}

h1 {
  color: firebrick;
}

input {
  width: 75%;
  padding: 7px;
  background-color: #FFF;
  border-radius: 50px;
  padding: 10px 15px;
  border: 0;
}

button {
  width: 85%;
  background-color: firebrick;
  border: 0;
  border-radius: 50px;
  color: gold;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.8rem;
}

button:disabled {
  background-color: #b22222a1;
  color: grey;
}
`;

export default LoginStyle;
