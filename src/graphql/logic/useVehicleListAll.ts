import { useEffect, useState } from "react";
import { NetworkStatus, useApolloClient, useQuery } from "@apollo/client";

import { GET_VEHICLE_LIST_ALL } from "../queries/getVehicleListAll";

interface Props {
  categoryId: string;
}

export const useVehicleListAll = (search: string) => {
  const client = useApolloClient();
  const dataCache =
    client.readQuery({
      query: GET_VEHICLE_LIST_ALL,
    }) ?? [];
  const { loading, error, data } = useQuery(GET_VEHICLE_LIST_ALL, {
    variables: { search },
  });

  data &&
    client.writeQuery({
      query: GET_VEHICLE_LIST_ALL,
      data: {
        vehicleList: [...data?.vehicleList, ...(dataCache?.vehicleList ?? [])],
      },
    });
  return {
    loading,
    error,
    data: !!data?.vehicleList
      ? [...data?.vehicleList, ...(dataCache?.vehicleList ?? [])]
      : [],
  };
};
