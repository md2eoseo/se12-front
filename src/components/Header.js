import { useReactiveVar } from '@apollo/client';
import styled from 'styled-components';
import { isLoggedInVar } from '../client';
import Login from './Login';
import MyMenu from './MyMenu';
import logo from './home_logo.png';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  min-height: 128px;
`;

const LeftMenu = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoBox = styled.div``;

const Logo = styled.img`
  height: 128px;
`;

const RightMenu = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Container>
      <LeftMenu></LeftMenu>
      <LogoBox>
        <a href="/">
          <Logo alt="logoImg" src={logo} />
        </a>
      </LogoBox>
      <RightMenu>{isLoggedIn ? <MyMenu /> : <Login />}</RightMenu>
    </Container>
  );
}

export default Header;
