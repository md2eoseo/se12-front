import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { client } from './client';
import Footer from './components/Footer';
import Header from './components/Header';
import AdminPage from './routes/AdminPage';
import HomePage from './routes/HomePage';
import SearchPage from './routes/SearchPage';
import SignUpPage from './routes/SignUp';
import ItemPage from './routes/ItemPage';
import AddItem from './components/AddItem';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Switch>
          <Route path="/banners" component={AdminPage} />
          <Route path="/additem" component={AddItem} />
          <Route path="/items" component={AdminPage} />
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
