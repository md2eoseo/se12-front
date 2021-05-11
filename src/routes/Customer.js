import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Categories from '../components/Categories';
import CustomerMain from '../components/CustomerMain';

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
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

function Customer() {
  const { loading, data } = useQuery(SEE_CATEGORIES_QUERY);

  return (
    <Container>
      <Categories categories={data && data.seeCategories.categories} categoriesLoading={loading} />
      <CustomerMain categories={data && data.seeCategories.categories} categoriesLoading={loading} />
    </Container>
  );
}

export default Customer;
