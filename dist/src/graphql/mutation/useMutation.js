import { graphQLClient } from "../../config/graphQLConfig.js";
import { gql } from "graphql-request";
export const useMutations = () => {
    const insertUser = async (id, firstName, lastName, email) => {
        await graphQLClient
            .request(gql `
          mutation insertUser($object: users_insert_input!) {
            insert_users_one(object: $object) {
              id
            }
          }
        `, {
            object: {
                id,
                first_name: firstName,
                last_name: lastName,
                email,
            },
        })
            .catch((e) => {
            console.log({ e });
        });
    };
    const setRefreshTokenToNull = async (uid) => {
        try {
            const response = await graphQLClient.request(gql `
          mutation ($uid: String!) {
            update_users_by_pk(
              pk_columns: { id: $uid }
              _set: { refresh_token: null }
            ) {
              refresh_token
            }
          }
        `, {
                uid,
            });
            return { success: true, error: null };
        }
        catch (error) {
            return { success: false, error };
        }
    };
    const updateUserRefreshToken = async (uid, refreshToken) => {
        try {
            await graphQLClient.request(gql `
          mutation ($uid: String!, $refreshToken: String) {
            update_users_by_pk(
              pk_columns: { id: $uid }
              _set: { refresh_token: $refreshToken }
            ) {
              refresh_token
            }
          }
        `, {
                uid,
                refreshToken,
            });
            return { success: true, error: null };
        }
        catch (error) {
            return { success: false, error };
        }
    };
    return {
        insertUser,
        setRefreshTokenToNull,
        updateUserRefreshToken,
    };
};
//# sourceMappingURL=useMutation.js.map