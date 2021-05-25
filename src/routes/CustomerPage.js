import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Categories from '../components/Categories';
import CustomerMain from '../components/CustomerMain';
import ClipLoader from 'react-spinners/ClipLoader';

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
`;

const Loading = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
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

function CustomerPage() {
  const { loading, data } = useQuery(SEE_CATEGORIES_QUERY);

  return data ? (
    <Container>
      <Categories categories={data.seeCategories.categories} categoriesLoading={loading} />
      <CustomerMain categories={data.seeCategories.categories} categoriesLoading={loading} />
    </Container>
  ) : (
    <Loading>
      <ClipLoader color="black" size={120} />
    </Loading>
  );
}

export default CustomerPage;
