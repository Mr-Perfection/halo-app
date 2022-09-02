import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from 'urql';

import paths from 'constants/nav';
import { useAppDispatch } from 'app/store';
import { GetCustomerBySlugDocument } from 'generated/graphql';
import { isEmpty } from 'lodash';
import { setCustomer } from 'components/features/Customer/customerSlice';
import LoadingPage from 'components/pages/Loading';

function InternalRoute({ element }: { element: JSX.Element }) {
  const dispatch = useAppDispatch();
  const { customerSlug } = useParams();
  const [customerResult] = useQuery({
    query: GetCustomerBySlugDocument,
    variables: { slug: customerSlug },
  });
  const { data, fetching } = customerResult;
  const customerResultData = data?.getCustomer;

  useEffect(() => {
    if (!fetching && !isEmpty(customerResultData)) {
      dispatch(setCustomer(customerResultData));
    }
  }, [customerResultData, fetching, dispatch]);

  // TODO: create loading screen.
  if (fetching) return (<LoadingPage />);
  if (isEmpty(customerResultData)) {
    return (<Navigate to={paths.NOT_FOUND} replace />);
  }

  return element;
}

export default InternalRoute;
