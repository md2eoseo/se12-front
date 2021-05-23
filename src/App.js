import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { client, isAdminVar } from './client';
import Footer from './components/Footer';
import Header from './components/Header';
import AdminPage from './routes/AdminPage';
import HomePage from './routes/HomePage';
import SearchPage from './routes/SearchPage';
import SignUpPage from './routes/SignUpPage';
import ItemPage from './routes/ItemPage';
import AddItem from './components/AddItem';
import AdminItemInfo from './components/AdminItemInfo';
import AuthRoute from './routes/AuthRoute';

function App() {
  const isAdmin = useReactiveVar(isAdminVar);
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Switch>
          <AuthRoute authenticated={isAdmin} path="/additem" render={props => <AddItem {...props} />} />
          <AuthRoute authenticated={isAdmin} path="/iteminfo" render={props => <AdminItemInfo {...props} />}/>
          <AuthRoute authenticated={isAdmin} path="/banners" render={props => <AdminPage {...props} />} />
          <AuthRoute authenticated={isAdmin} path="/items" render={props => <AdminPage {...props} />} />
          <Route path="/item" component={ItemPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/" exact component={HomePage} />
          <Route
            render={() => (
              <div className="error">
                잘못된 접근입니다.
                <Link to="/">홈으로 돌아가기</Link>
              </div>
            )}
          />
        </Switch>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
