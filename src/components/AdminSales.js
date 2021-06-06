import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1120px;
  margin-bottom: 50px;
`;

const Label = styled.h2`
  padding: 20px;
`;

function AdminSales() {
  return (
    <Container>
      <Label>상품 판매정보 관리</Label>
    </Container>
  );
}

export default AdminSales;
