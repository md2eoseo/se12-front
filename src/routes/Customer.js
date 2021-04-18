import styled from 'styled-components';
import Categories from '../components/Categories';
import CustomerMain from '../components/CustomerMain';

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
`;

function Customer() {
  return (
    <Container>
      <Categories />
      <CustomerMain />
    </Container>
  );
}

export default Customer;
