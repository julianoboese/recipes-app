import styled from 'styled-components';

const ProfileStyled = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 2rem;
gap: 2.5rem;

.profile {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.image-gravatar {
  border-radius: 50px;
  border: 8px inset firebrick;
}

.email {
  font-size: 1.3rem;
  color: firebrick;
  border-bottom: 8px solid gold;
  border-radius: 8px;
  padding-bottom: 3px;
  width: min-content;
  height: min-content;
  font-weight: 700;
}

.btn-section {
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 0 auto;
  gap: 0.7rem;
}

.btn-section button {
  background-color: firebrick;
  border: 0;
  border-radius: 50px;
  color: gold;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.5rem;
}
`;

export default ProfileStyled;
