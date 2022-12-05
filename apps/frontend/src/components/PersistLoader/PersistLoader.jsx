import React from 'react';
import { Puff } from 'react-loader-spinner';

import styles from './PersistLoader.module.scss';

const PersistLoader = () => {
  return (
    <Puff
      height="100"
      width="100"
      radius={1}
      color="#0089EB"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass={styles.puff}
      visible={true}
    />
  );
};

export default PersistLoader;
