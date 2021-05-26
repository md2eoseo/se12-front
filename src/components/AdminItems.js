import styled from 'styled-components';
import ItemManage from './ItemManage';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AdminSearchBar from './AdminSearchBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const Button = styled.div`
  padding: 0px 0px 20px 660px;
`;

const AddButton = styled.button`
  width: 110px;
  height: 50px;
  margin-right: 20px;
  font-size: 18px;
  color: white;
  background-color: #487be1;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: cornflowerblue;
  }
`;

const Label = styled.h2`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const GET_ITEMS_QUERY = gql`
  query getItems($term: String, $minPrice: Int, $maxPrice: Int, $sortMethod: SortMethod) {
    getItems(term: $term, minPrice: $minPrice, maxPrice: $maxPrice, sortMethod: $sortMethod) {
      ok
      error
      items {
        id
        author
        publisher
        activate
        createdAt
        updatedAt
        imgUrl
        name
        price
      }
    }
  }
`;

function useQueryString() {
  return new URLSearchParams(useLocation().search);
}

function AdminItems() {
  const queries = useQueryString();
  const term = queries.get('term');
  const minPrice = Number(queries.get('minPrice'));
  const maxPrice = Number(queries.get('maxPrice'));
  const sortMethod = queries.get('sortMethod');
  const { loading, data, refetch } = useQuery(GET_ITEMS_QUERY, {
    variables: { ...(term && { term }), ...(minPrice && { minPrice }), ...(maxPrice && { maxPrice }), ...(sortMethod && { sortMethod }) },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Container>
      <Label>상품 관리</Label>
      <AdminSearchBar initialTerm={term} initialMinPrice={minPrice} initialMaxPrice={maxPrice} initialSortMethod={sortMethod} />
      <Button>
        <Link to="/additem">
          <AddButton>상품 등록</AddButton>
        </Link>
      </Button>
      {loading && '상품 불러오는 중...'}
      {data &&
        data.getItems.items.map(item => (
          <ItemManage
            key={item.id}
            itemId={item.id}
            imgUrl={item.imgUrl}
            name={item.name}
            price={item.price}
            author={item.author}
            publisher={item.publisher}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            activate={item.activate}
          />
        ))}
    </Container>
  );
}

export default AdminItems;
