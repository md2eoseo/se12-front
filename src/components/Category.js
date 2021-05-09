import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 20px;
  margin: 10px 0;
`;

function Category({ categoryId, name }) {
  return (
    <Link to={`/search?categoryId=${categoryId}&categoryName=${name}`}>
      <Container>{name}</Container>
    </Link>
  );
}

export default Category;
