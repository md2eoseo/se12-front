import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Categories from '../components/Categories';
import Item from '../components/Item';
import SearchBar from '../components/SearchBar';

const SEARCH_ITEMS_QUERY = gql`
  query searchItems($term: String, $categoryId: Int, $minPrice: Int, $maxPrice: Int, $lastId: Int) {
    searchItems(term: $term, categoryId: $categoryId, minPrice: $minPrice, maxPrice: $maxPrice, lastId: $lastId) {
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
      lastId
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
  display: grid;
  grid-template-columns: 20% 80%;
`;

const SearchMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Items = styled.div`
  width: 100%;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

function useQueryString() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const queries = useQueryString();
  const term = queries.get('term');
  const categoryId = Number(queries.get('categoryId'));
  const { loading: itemsLoading, data: itemsData } = useQuery(SEARCH_ITEMS_QUERY, {
    variables: { ...(term && { term }), ...(categoryId && { categoryId }) },
  });
  const { loading: categoriesLoading, data: categoriesData } = useQuery(SEE_CATEGORIES_QUERY);

  return (
    <Container>
      <Categories categories={categoriesData && categoriesData.seeCategories.categories} categoriesLoading={categoriesLoading} />
      <SearchMain>
        <SearchBar
          initialTerm={term}
          initialCategoryId={categoryId}
          categories={categoriesData && categoriesData.seeCategories.categories}
          categoriesLoading={categoriesLoading}
        />
        {`${categoriesData.seeCategories.categories.filter(category => category.id === categoryId)[0]?.name || '전체'}에서 "${
          term || ''
        }"` + (itemsLoading ? ' 검색중...' : ' 검색 결과')}
        <Items>
          {itemsData?.searchItems?.ok &&
            itemsData.searchItems.items.map(item => (
              <Item key={item.id} itemId={item.id} imgUrl={item.imgUrl} name={item.name} price={item.price} />
            ))}
        </Items>
      </SearchMain>
    </Container>
  );
}

export default Search;
