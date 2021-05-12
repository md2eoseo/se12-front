import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  width: 250px;
  height: 70px;
  border: 0;
  background-color: #487be1;
  color: #d9e5ff;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: cornflowerblue;
  }
`;

function Category({ categoryId, name }) {
  return (
    <Link to={`/search?categoryId=${categoryId}`}>
      <Button categoryId={categoryId}>{name}</Button>
    </Link>
  );
}

export default Category;
