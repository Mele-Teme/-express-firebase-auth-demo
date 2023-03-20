import { useQuery } from "../graphql/query/useQuery.js";

export const getHasuraClaims = async (
  uid: string,
  firstName: string,
  lastName: string
) => {
  const { fetchUserRole } = useQuery();
  const claims = await fetchUserRole(uid)
    .then((result) => {
      const typedResult = result as {
        default_role: { role: string };
        allowed_roles: Array<{ name: string }>;
      };

      const roleWithoutDefault = typedResult.allowed_roles.filter(
        (roles) => roles.name !== typedResult.default_role.role
      );
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
