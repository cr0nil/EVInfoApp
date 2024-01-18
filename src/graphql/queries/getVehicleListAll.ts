import { gql } from "@apollo/client";

export interface GetCategoryProductsVars {
  id: string;
  pageSize?: number;
  currentPage?: number;
}

export const GET_VEHICLE_LIST_ALL = gql`
  query vehicleListAll($search: String, $page: Int) {
    vehicleList(page: $page, size: 10, search: $search) {
      id
      naming {
        make
        model
        chargetrip_version
      }
      media {
        image {
          thumbnail_url
        }
      }
    }
  }
`;
