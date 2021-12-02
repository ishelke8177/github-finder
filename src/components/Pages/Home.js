import React, { Fragment } from 'react';
import Search from '../users/Search';
import UsersList from '../users/UsersList';

const Home = () => {
  return (
    <Fragment>
      <Search />
      <UsersList />
    </Fragment>
  );
};

export default Home;
