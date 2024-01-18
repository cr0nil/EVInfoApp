import { NetworkStatus, useApolloClient, useQuery } from "@apollo/client";

import { GET_VEHICLE_LIST_ALL } from "../queries/getVehicleListAll";

interface Props {
  search: string;
}

export const useVehicleListAll = (search: string) => {
  const client = useApolloClient();
  const dataCache =
    client.readQuery({
      query: GET_VEHICLE_LIST_ALL,
    }) ?? [];
  const { loading, error, data, fetchMore } = useQuery(GET_VEHICLE_LIST_ALL, {
    variables: { search },
  });

  data &&
    client.writeQuery({
      query: GET_VEHICLE_LIST_ALL,
      data: {
        vehicleList: data?.vehicleList, //to do
      },
    });
  return {
    loading,
    error,
    data: data?.vehicleList,
    loadMore: () => {
      fetchMore({
        variables: { page: data?.vehicleList.length / 10 + 1 },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prevResult;
          }
          fetchMoreResult.vehicleList = [
            ...prevResult.vehicleList,
            ...fetchMoreResult.vehicleList,
          ];
          return { ...fetchMoreResult };
        },
      });
    },
    refetch: () => {
      client.writeQuery({
        query: GET_VEHICLE_LIST_ALL,
        data: {
          vehicleList: data?.vehicleList,
        },
      });
    },
  };
};
