import { useReactiveVar } from '@apollo/client';
import { isAdminVar } from '../client';
import Admin from './Admin';
import Customer from './Customer';

function Home() {
  const isAdmin = useReactiveVar(isAdminVar);
  return <div className="Home">{isAdmin ? <Admin /> : <Customer />}</div>;
}

export default Home;
