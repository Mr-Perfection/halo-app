/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { Suspense } from 'react';

// project imports
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

// eslint-disable-next-line max-len
const Loadable = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => (props: any) => {
  return (
    <Suspense fallback={<Loader />}>
      {/* @ts-ignore */}
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
