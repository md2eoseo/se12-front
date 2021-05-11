import styled from 'styled-components';
import Category from './Category';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 60px;
  background-color: #487be1;
  color: #d9e5ff;
`;

const Label = styled.h2`
  margin-bottom: 30px;
`;

function Categories({ categories, categoriesLoading }) {
  return (
    <Container>
      <Label>카테고리</Label>
      {categoriesLoading && '카테고리 불러오는 중...'}
      {categories && categories.map(category => <Category key={category.id} categoryId={category.id} name={category.name} />)}
    </Container>
  );
}

export default Categories;
