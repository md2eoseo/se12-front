import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { client } from './client';
import AdminBanners from './components/AdminBanners';
import AdminItems from './components/AdminItems';
import Footer from './components/Footer';
import Header from './components/Header';
import Admin from './routes/Admin';
import Home from './routes/Home';
import SignUp from './routes/SignUp';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Switch>
          <Route path="/banners" component={Admin} />
          <Route path="/items" component={Admin} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" exact component={Home} />
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
