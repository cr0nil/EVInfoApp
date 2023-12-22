import {useEffect, useState} from 'react';
import {NetworkStatus, useQuery} from '@apollo/client';

import {GET_VEHICLE_LIST_ALL} from '../queries/getVehicleListAll';

interface Props {
  categoryId: string;
}

export const useVehicleListAll = () => {
  const {loading, error, data} = useQuery(GET_VEHICLE_LIST_ALL);

  return {
    loading,
    error,
    data,
  };
};
