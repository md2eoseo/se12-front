import styled from 'styled-components';
import BagItems from './BagItems';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

function BagPage() {
  return (
    <Container>
      <BagItems />
    </Container>
  );
}

export default BagPage;
