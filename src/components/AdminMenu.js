import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 50px;
`;

function AdminMenu() {
  return (
    <Container>
      <Link to="/banners">공지/이벤트 관리</Link>
      <Link to="/items">상품 관리</Link>
    </Container>
  );
}

export default AdminMenu;
