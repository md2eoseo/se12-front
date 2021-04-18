import styled from 'styled-components';
import Category from './Category';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Categories() {
  return (
    <Container>
      <Category />
    </Container>
  );
}

export default Categories;
