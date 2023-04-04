import { useQuery } from "../graphql/query/useQuery.js";

export const getHasuraClaims = async (
  uid: string,
  firstName: string,
  lastName: string,
  email: string
) => {
  const { fetchUserRole } = useQuery();
  const claims = await fetchUserRole(uid)
    .then((result) => {
      const typedResult = result as {
        default_role: { role: string };
        allowed_roles: Array<{ role: string }>;
      };

      const roleWithoutDefault = typedResult.allowed_roles.filter(
        (r) => r.role !== typedResult.default_role.role
      );
      roleWithoutDefault.splice(0, 0, { role: typedResult.default_role.role });

      const roles = roleWithoutDefault.map((r) => r.role);

      return {
        name: `${firstName} ${lastName}`,
        email,
        metadata: {
          roles,
          user_id: uid,
        },
      };
    })
    .catch((error) => {
      return {
        name: `${firstName} ${lastName}`,
        email: email,
        metadata: {
          roles: ["anonymous"],
          user_id: uid,
        },
      };
    });

  return claims;
};
