import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Item from './Item';
import SearchBar from './SearchBar';

const SEARCH_ITEMS_QUERY = gql`
  query searchItems($term: String, $categoryId: Int, $minPrice: Int, $maxPrice: Int) {
    searchItems(term: $term, categoryId: $categoryId, minPrice: $minPrice, maxPrice: $maxPrice) {
      ok
      error
      items {
        id
        name
        price
        imgUrl
        author
        contents
        publisher
        pressDate
      }
    }
  }
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Items = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 5%;
`;

function useQueryString() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const queries = useQueryString();
  const term = queries.get('term');
  const categoryId = Number(queries.get('categoryId'));
  const minPrice = Number(queries.get('minPrice'));
  const maxPrice = Number(queries.get('maxPrice'));
  const { loading: itemsLoading, data: itemsData } = useQuery(SEARCH_ITEMS_QUERY, {
    variables: { ...(term && { term }), ...(categoryId && { categoryId }), ...(minPrice && { minPrice }), ...(maxPrice && { maxPrice }) },
  });
  const { loading: categoriesLoading, data: categoriesData } = useQuery(SEE_CATEGORIES_QUERY);

  return (
    <Container>
      <SearchBar
        initialTerm={term}
        initialCategoryId={categoryId}
        initialMinPrice={minPrice}
        initialMaxPrice={maxPrice}
        categories={categoriesData && categoriesData.seeCategories.categories}
        categoriesLoading={categoriesLoading}
      />
      {`${categoriesData.seeCategories.categories.filter(category => category.id === categoryId)[0]?.name || '전체'}에서 "${term || ''}"` +
        (itemsLoading ? ' 검색중...' : ' 검색 결과')}
      <Items>
        {itemsData?.searchItems?.ok &&
          itemsData.searchItems.items.map(item => (
            <Item key={item.id} itemId={item.id} imgUrl={item.imgUrl} name={item.name} price={item.price} />
          ))}
      </Items>
    </Container>
  );
}

export default SearchPage;
