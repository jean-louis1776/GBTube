import React from 'react';

import { Header } from '../';

import styles from './SearchFeed.module.scss';

const SearchFeed = (props) => {
  return (
    <>
      <Helmet>
        <title>GeekTube | Поиск</title>
      </Helmet>

      <Header />

      <div>SearchFeed</div>
    </>
  );
};

export default SearchFeed;
