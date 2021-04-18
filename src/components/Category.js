import styled from 'styled-components';

const Container = styled.div`
  font-size: 20px;
  margin: 10px 0;
`;

function Category({ categoryId, name }) {
  return <Container categoryId={categoryId}>{name}</Container>;
}

export default Category;
