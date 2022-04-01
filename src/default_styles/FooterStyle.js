import styled from 'styled-components';

// const translateY = `

// `;

const FooterStyle = styled.ul`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

padding: 0;
margin: 0;
width: 100%;
position: fixed;
bottom: 0;
display: flex;
justify-content: space-evenly;
align-items: center;
background-color: white;
height: 70px;
border-radius: 10px;

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
      color: #222327;
      position: relative;
      display: block;
      line-height: 75px;
      font-size: 1.5em;
      text-align: center;
      transition: 0.5s;
    }

    .text {
      color: #222327;
      position: absolute;
      font-weight: 400;
      font-size: 0.75em;
      letter-spacing: 0.05em;
      transition: 0.5s;
      opacity: 0;
      transform: translateY(20px)
    }
  }
}

li:hover {
  a {
    .icon {
      transform: translateY(-35px);
    }
    .text {
      opacity: 1;
      transform: translateY(10px);
    }
  }
}


`;

export default FooterStyle;
