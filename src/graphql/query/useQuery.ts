import { graphQLClient } from "../../config/graphQLConfig.js";
import { gql } from "graphql-request";
export const useQuery = () => {
  const fetchUserRole = async (uid: string) => {
    return await graphQLClient.request(
      gql`
        query ($uid: String!) {
          default_role: users_by_pk(id: $uid) {
            role
          }
          allowed_roles: roles {
            role
          }
        }
      `,
      {
        uid,
      }
    );
  };
  const fetchUserByPk = async (uid: string) => {
    return await graphQLClient.request(
      gql`
        query ($uid: String!) {
          user: users_by_pk(id: $uid) {
            refresh_token
          }
        }
      `,
      {
        uid,
      }
    );
  };

  return {
    fetchUserRole,
    fetchUserByPk,
  };
};
