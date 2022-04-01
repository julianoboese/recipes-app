import styled from 'styled-components';

const FooterStyle = styled.ul`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

padding: 0;
margin: 0 1.5vw;
width: 97%;
position: fixed;
bottom: 5px;
display: flex;
justify-content: space-around;
align-items: center;
background-color: rgb(223,223,223, 0.7);
height: 70px;
border-radius: 40px;
opacity: 1;


li {
  position: relative;
  list-style: none;
  width: 70px;
  height: 70px;
  z-index: 1;
  
  a {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    text-align: center;
    font-weight: 500;
    
    .icon {
      color: black;
      position: relative;
      display: block;
      line-height: 75px;
      font-size: 2em;
      text-align: center;
      transition: 0.5s;
      opacity: 1;
    }

    .text {
      color: black;
      position: absolute;
      font-weight: 400;
      font-size: 0.75em;
      letter-spacing: 0.05em;
      transition: 0.5s;
      opacity: 0;
      transform: translateY(20px);
    }
  }
}

li:hover {
  a {
    .icon {
      transform: translateY(-20px);
    }
    .text {
      opacity: 1;
      transform: translateY(10px);
    }
  }
}

`;

export default FooterStyle;
