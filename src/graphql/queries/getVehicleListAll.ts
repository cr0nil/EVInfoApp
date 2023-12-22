import {gql} from '@apollo/client';

export interface GetCategoryProductsVars {
  id: string;
  pageSize?: number;
  currentPage?: number;
}

export interface CategoryProductsDataType {
  products: {
    total_count: number;
    items: Array<ProductInListType>;
  };
}

export const GET_VEHICLE_LIST_ALL = gql`
  query vehicleListAll {
    vehicleList(page: 1, size: 10) {
      id
      naming {
        make
        model
        version
        edition
        chargetrip_version
      }
      drivetrain {
        type
      }
      connectors {
        standard
        power
        max_electric_power
        time
        speed
      }
      adapters {
        standard
        power
        max_electric_power
        time
        speed
      }
      battery {
        usable_kwh
        full_kwh
      }
      body {
        seats
      }
      availability {
        status
      }
      range {
        chargetrip_range {
          best
          worst
        }
      }
    }
  }
`;
