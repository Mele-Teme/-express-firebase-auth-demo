import { useQuery } from "../graphql/query/useQuery.js";
export const getHasuraClaims = async (uid, firstName, lastName, email) => {
    const { fetchUserRole } = useQuery();
    const claims = await fetchUserRole(uid)
        .then((result) => {
        const typedResult = result;
        const roleWithoutDefault = typedResult.allowed_roles.filter((roles) => roles.name !== typedResult.default_role.role);
        roleWithoutDefault.splice(0, 0, { name: typedResult.default_role.role });
        const roles = roleWithoutDefault.map((role) => role.name);
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
            metadata: {
                roles: ["anonymous"],
                user_id: uid,
            },
        };
    });
    return claims;
};
//# sourceMappingURL=getHasuraClaims.js.map