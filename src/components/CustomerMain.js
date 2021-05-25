import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Home from './Home';
import SearchPage from './SearchPage';
import { Route } from 'react-router';
import ItemPage from './ItemPage';

const Container = styled.div`
  width: 100%;
`;

function CustomerMain({ categories, categoriesLoading }) {
  return (
    <Container>
      <Route path="/item" component={ItemPage} />
      <Route path="/search" component={SearchPage} />
      <Route exact path="/" component={Home} categories={categories} categoriesLoading={categoriesLoading} />
    </Container>
  );
}

export default CustomerMain;
