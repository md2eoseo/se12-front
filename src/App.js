import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { client, isAdminVar } from './client';
import Footer from './components/Footer';
import Header from './components/Header';
import AdminPage from './routes/AdminPage';
import AuthRoute from './routes/AuthRoute';
import CustomerPage from './routes/CustomerPage';
import SignUpPage from './routes/SignUpPage';

function App() {
  const isAdmin = useReactiveVar(isAdminVar);
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Switch>
          {isAdmin ? (
            <>
              <AuthRoute authenticated={isAdmin} path="/banners" render={props => <AdminPage {...props} />} />
              <AuthRoute authenticated={isAdmin} path="/additem" render={props => <AdminPage {...props} />} />
              <AuthRoute authenticated={isAdmin} path="/addbanner" render={props => <AdminPage {...props} />} />
              <AuthRoute authenticated={isAdmin} path="/iteminfo" render={props => <AdminPage {...props} />} />
              <AuthRoute authenticated={isAdmin} path="/edititem" render={props => <AdminPage {...props} />} />
              <AuthRoute authenticated={isAdmin} path="/editbanner" render={props => <AdminPage {...props} />} />
              <AuthRoute authenticated={isAdmin} exact path="/" render={props => <AdminPage {...props} />} />
              <Route
                render={() => (
                  <div className="error">
                    잘못된 접근입니다.
                    <Link to="/">홈으로 돌아가기</Link>
                  </div>
                )}
              />
            </>
          ) : (
            <>
              <Route path="/item" render={props => <CustomerPage {...props} />} />
              <Route path="/search" render={props => <CustomerPage {...props} />} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/" exact render={props => <CustomerPage {...props} />} />
              <Route
                render={() => (
                  <div className="error">
                    잘못된 접근입니다.
                    <Link to="/">홈으로 돌아가기</Link>
                  </div>
                )}
              />
            </>
          )}
        </Switch>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
