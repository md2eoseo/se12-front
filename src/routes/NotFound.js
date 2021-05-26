import { Link } from 'react-router-dom';
import styled from 'styled-components';
import notfound from './notfound.png';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Image = styled.img`
  max-width: 50%;
  height: auto;
  display: block;
`;

const Error = styled.div`
  color: #4c4c4c;
  letter-spacing: 5px;
  font-size: 40px;
`;

const Wrapper = styled.div`
  flex-direction: column;
`;

const GoHome = styled.button`
  margin-left: 110px;
  margin-top: 60px;
  width: 175px;
  height: 50px;
  color: white;
  background-color: #747474;
  font-size: 130%;
  cursor: pointer;
  outline: none;
  border: none;
`;

function NotFound() {
  return (
    <Container>
      <Image alt="404 error" src={notfound} />
      <Wrapper>
        <Error>PAGE NOT FOUND</Error>
        <Link to="/">
          <GoHome>Go Home</GoHome>
        </Link>
      </Wrapper>
    </Container>
  );
}

export default NotFound;
