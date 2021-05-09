import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Categories from '../components/Categories';
import Item from '../components/Item';
import SearchBar from '../components/SearchBar';

const SEARCH_ITEMS_QUERY = gql`
  query searchItems($term: String!, $categoryId: Int, $minPrice: Int, $maxPrice: Int, $lastId: Int) {
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
  const { loading, data } = useQuery(SEARCH_ITEMS_QUERY, { variables: { term } });

  return (
    <Container>
      <Categories />
      <SearchMain>
        <SearchBar initialTerm={term} />
        {loading ? `"${term}" 검색중...` : `"${term}" 검색 결과`}
        <Items>
          {data?.searchItems?.ok &&
            data.searchItems.items.map(item => (
              <Item key={item.id} itemId={item.id} imgUrl={item.imgUrl} name={item.name} price={item.price} />
            ))}
        </Items>
      </SearchMain>
    </Container>
  );
}

export default Search;
