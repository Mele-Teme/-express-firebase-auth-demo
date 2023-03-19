import { graphQLClient } from "../config/graphQLConfig.js";
import { gql } from "graphql-request";
export const getHasuraClaims = async (uid, firstName, lastName) => {
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
            name: `${firstName} ${lastName}`,
            metadata: {
                roles,
                user_id: uid,
            },
        };
    })
        .catch((error) => {
        return {
            name: `${firstName} ${lastName}`,
            metadata: {
                roles: ["anonymous"],
                user_id: uid,
            },
        };
    });
    return claims;
};
//# sourceMappingURL=getHasuraClaims.js.map