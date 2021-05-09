import { useLocation, useParams } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    width: 100%;
  }
`;

function useQueryString() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const queries = useQueryString();
  const term = queries.get('term');

  return <Container>{term}</Container>;
}

export default Search;
