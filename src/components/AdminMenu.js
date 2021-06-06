import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #487be1;
  width: 240px;
  height: 100vh;
  position: sticky;
  top: 0;
`;

const Button = styled.button`
  width: 240px;
  height: 80px;
  border: 0;
  background-color: #487be1;
  color: #d9e5ff;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: cornflowerblue;
  }
`;

function AdminMenu() {
  return (
    <Container>
      <Link to="/">
        <Button>상품 관리</Button>
      </Link>
      <Link to="/sales">
        <Button>상품 판매정보 관리</Button>
      </Link>
      <Link to="/banners">
        <Button>공지/이벤트 관리</Button>
      </Link>
    </Container>
  );
}

export default AdminMenu;
