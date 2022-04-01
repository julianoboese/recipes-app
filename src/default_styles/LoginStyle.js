import styled from 'styled-components';

const LoginStyle = styled.form`
height: 100%;
color: white;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 5px;


* {
  margin-bottom: 20px;
}

h1 {
  color: #0C1821;
}

input {
  width: 80%;
  padding: 7px;
  background-color: #FFF;
  border-radius: 50px;
  padding: 10px 15px;
  border: 0;
}

button {
  width: 80%;
  background-color: #333138;
  border: 0;
  border-radius: 50px;
  color: #fffffe;
  font-size: 1.2rem;
  font-style: bold;
  padding: 0.8rem;
}

button:disabled {
  background-color: #6a696e;
}
`;

export default LoginStyle;
