import { gql } from "@apollo/client";

export interface GetCategoryProductsVars {
  id: string;
  pageSize?: number;
  currentPage?: number;
}

export const GET_VEHICLE_DETAILS_QUERY = gql`
  query vehicle($vehicleId: ID!) {
    vehicle(id: $vehicleId) {
      naming {
        make
        model
        chargetrip_version
      }
      media {
        image {
          url
        }
        brand {
          thumbnail_url
        }
      }
      battery {
        usable_kwh
      }
      range {
        best {
          highway
          city
          combined
        }
        worst {
          highway
          city
          combined
        }
        chargetrip_range {
          best
          worst
        }
      }
      routing {
        fast_charging_support
      }
      connectors {
        standard
      }
      performance {
        acceleration
        top_speed
      }
    }
  }
`;
