import { graphQLClient } from "../config/graphQLConfig.js";
import { gql } from "graphql-request";
export const getHasuraClaims = async (uid) => {
    const claims = await graphQLClient
        .request(gql `
        query ($uid: String!) {
          default_role: users_by_pk(id: $uid) {
            role
          }
          allowed_roles: role {
            name
          }
        }
      `, {
        uid,
    })
        .then((result) => {
        const typedResult = result;
        const roleWithoutDefault = typedResult.allowed_roles.filter((roles) => roles.name !== typedResult.default_role.role);
        roleWithoutDefault.splice(0, 0, { name: typedResult.default_role.role });
        const roles = roleWithoutDefault.map((role) => role.name);
        return {
            metadata: {
                roles,
                user_id: uid,
            },
        };
    })
        .catch((error) => {
        console.log("Fetch Role Error: --->", error);
        return null;
    });
    return claims;
};
//# sourceMappingURL=getHasuraClaims.js.map