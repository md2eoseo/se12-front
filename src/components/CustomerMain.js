import styled from 'styled-components';
import Banners from './Banners';
import SearchBar from './SearchBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function CustomerMain() {
  return (
    <Container>
      <SearchBar />
      <Banners />
    </Container>
  );
}

export default CustomerMain;
