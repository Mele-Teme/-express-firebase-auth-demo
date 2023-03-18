import { graphQLClient } from "../config/graphQLConfig.js";
import { gql } from "graphql-request";
export const registerUser = async (req, res, next) => {
    const { uid: id, firstName, lastName, email } = req.user;
    try {
        graphQLClient
            .request(gql `
          mutation insertUser($object: users_insert_input!) {
            insert_users_one(object: $object) {
              id
            }
          }
        `, {
            object: {
                id,
                firstName,
                lastName,
                email,
            },
        })
            .then((value) => { })
            .catch((error) => { });
    }
    finally {
        return next();
    }
};
//# sourceMappingURL=registerUser.js.map