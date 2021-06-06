import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Home from './Home';
import SearchPage from './SearchPage';
import { Route } from 'react-router';
import ItemPage from './ItemPage';
import BagPage from './BagPage';
import BuyNow from './BuyNow';
import BagBuy from './BagBuy';
import MyOrdersPage from './MyOrdersPage';
import PaySuccess from './PaySuccess';
import PayCancel from './PayCancel';
import PayFail from './PayFail';

const Container = styled.div`
  width: 100%;
`;

function CustomerMain({ categories, categoriesLoading }) {
  return (
    <Container>
      <Route path="/pay/fail" component={PayFail} />
      <Route path="/pay/cancel" component={PayCancel} />
      <Route path="/pay/success" component={PaySuccess} />
      <Route path="/myorders" component={MyOrdersPage} />
      <Route path="/bag" component={BagPage} />
      <Route path="/buynow" component={BuyNow} />
      <Route path="/bagbuy" component={BagBuy} />
      <Route path="/item" component={ItemPage} />
      <Route path="/search" component={SearchPage} />
      <Route exact path="/" component={Home} categories={categories} categoriesLoading={categoriesLoading} />
    </Container>
  );
}

export default CustomerMain;
