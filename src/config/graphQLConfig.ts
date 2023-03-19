import { GraphQLClient } from "graphql-request";
export const graphQLClient = new GraphQLClient(
  "https://hibirlink.hasura.app/v1/graphql",
  {
    headers: {
      "x-hasura-admin-secret":
        "ALW4fsKJCfRuPMxgVFmqyAdEWXmP7yfb1622b382ea36769ba07c1f626e252fbec2fa03a2745acfa3e30df1c3ed853eYFWVkgGj3dUvKJ9pG5BVcZMEkujKEpAXPY",
    },
  }
);
