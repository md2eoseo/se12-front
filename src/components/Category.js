import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 20px;
  margin: 10px 0;
`;

function Category({ categoryId, name }) {
  return <Container id={`category-${categoryId}`}>{name}</Container>;
  return (
    <Link to={`/search?categoryId=${categoryId}`}>
      <Container id={`category-${categoryId}`>{name}</Container>
    </Link>
  );
}

export default Category;
