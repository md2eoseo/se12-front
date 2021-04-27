import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Category from './Category';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 50px;
  background-color: #487be1;
  color: #d9e5ff;
`;

const Label = styled.h2`
  margin-bottom: 20px;
`;

const SEE_CATEGORIES_QUERY = gql`
  query seeCategories {
    seeCategories {
      ok
      error
      categories {
        id
        name
      }
    }
  }
`;

function Categories() {
  const { loading, data } = useQuery(SEE_CATEGORIES_QUERY);

  return (
    <Container>
      <Label>카테고리</Label>
      {loading && '카테고리 불러오는 중...'}
      {data && data.seeCategories.categories.map(category => <Category key={category.id} categoryId={category.id} name={category.name} />)}
    </Container>
  );
}

export default Categories;
