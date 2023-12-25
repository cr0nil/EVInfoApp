import {useEffect, useState} from 'react';
import {NetworkStatus, useApolloClient, useQuery} from '@apollo/client';

import {GET_VEHICLE_LIST_ALL} from '../queries/getVehicleListAll';

interface Props {
  categoryId: string;
}

export const useVehicleListAll = () => {
  const client = useApolloClient();

  const {loading, error, data} = useQuery(GET_VEHICLE_LIST_ALL);
  data &&
    client.writeQuery({
      query: GET_VEHICLE_LIST_ALL,
      data,
    });
  return {
    loading,
    error,
    data,
  };
};
