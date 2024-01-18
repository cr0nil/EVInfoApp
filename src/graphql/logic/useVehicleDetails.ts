import { useQuery } from "@apollo/client";

import { GET_VEHICLE_DETAILS_QUERY } from "../queries/getVehicleDetails";

interface Props {
  search: string;
}

export const useVehicleDetails = (vehicleId: string) => {
  const { loading, error, data } = useQuery(GET_VEHICLE_DETAILS_QUERY, {
    variables: { vehicleId },
  });

  return {
    loading,
    error,
    data: data,
  };
};
