import styled from 'styled-components';

const Container = styled.div`
  font-size: 20px;
  margin: 10px 0;
`;
const Button = styled.button`
  width: 100px;
  height: 40px;
  border: 0;
  margin-bottom: 40px;
  background-color: #487be1;
  color: #d9e5ff;
  font-size: 18px;
  cursor: pointer;
`;

function Category({ categoryId, name }) {
  return <Button categoryId={categoryId}>{name}</Button>;
}

export default Category;
