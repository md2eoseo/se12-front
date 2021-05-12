import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import AdminMenu from './AdminMenu';

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
`;

function AddItem() {
  return (
    <Container>
      <AdminMenu />
      <div>상품등록페이지</div>
    </Container>
  );
}

export default AddItem;
