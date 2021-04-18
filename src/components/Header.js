import { useReactiveVar } from '@apollo/client';
import styled from 'styled-components';
import { isLoggedInVar } from '../client';
import Login from './Login';
import MyMenu from './MyMenu';

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
          <Logo
            alt="logoImg"
            src="https://s3.ap-northeast-2.amazonaws.com/media.linkareer.com/activity_manager/logo/2020-01-171353507994430_%EA%B5%90%EB%B3%B4%EB%AC%B8%EA%B3%A0_%EB%A1%9C%EA%B3%A0.png"
          />
        </a>
      </LogoBox>
      <RightMenu>{isLoggedIn ? <MyMenu /> : <Login />}</RightMenu>
    </Container>
  );
}

export default Header;
