import { GraphQLClient } from "graphql-request";
export const graphQLClient = new GraphQLClient(process.env.HASURA_GRAPHQL_URL, {
    headers: {
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
});
//# sourceMappingURL=graphQLConfig.js.map