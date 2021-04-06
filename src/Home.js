import React from 'react';
import Header from './Header';

function Home({ location, history }) {
  return (
    <>
      <Header />
      <div className="hello">Hello</div>
    </>
  );
}

export default Home;
