import React from 'react';
import UserResults from '../users/UserResults';
import UsersSearch from '../users/UsersSearch';

const Home = () => {
  return (
    <>
      <UsersSearch />
      <UserResults />
    </>
  );
};

export default Home;
