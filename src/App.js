import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { client, isAdminVar } from './client';
import Footer from './components/Footer';
import Header from './components/Header';
import AdminPage from './routes/AdminPage';
import AuthRoute from './routes/AuthRoute';
import CustomerPage from './routes/CustomerPage';
import NotFound from './routes/NotFound';
import SignUpPage from './routes/SignUpPage';

function App() {
  const isAdmin = useReactiveVar(isAdminVar);
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        {isAdmin ? (
          <Switch>
            <AuthRoute authenticated={isAdmin} path="/banners" component={AdminPage} />
            <AuthRoute authenticated={isAdmin} path="/additem" component={AdminPage} />
            <AuthRoute authenticated={isAdmin} path="/addbanner" component={AdminPage} />
            <AuthRoute authenticated={isAdmin} path="/iteminfo" component={AdminPage} />
            <AuthRoute authenticated={isAdmin} path="/edititem" component={AdminPage} />
            <AuthRoute authenticated={isAdmin} path="/editbanner" component={AdminPage} />
            <AuthRoute authenticated={isAdmin} exact path="/" component={AdminPage} />
            <Route component={NotFound} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/bag" component={CustomerPage} />
            <Route path="/buynow" component={CustomerPage} />
            <Route path="/bagbuy" component={CustomerPage} />
            <Route path="/item" component={CustomerPage} />
            <Route path="/search" component={CustomerPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route exact path="/" component={CustomerPage} />
            <Route component={NotFound} />
          </Switch>
        )}
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
