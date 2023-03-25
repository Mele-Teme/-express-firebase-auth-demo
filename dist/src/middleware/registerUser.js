import { useMutations } from "../graphql/mutation/useMutation.js";
export const registerUser = async (req, res, next) => {
    const { uid: id, firstName, lastName, email } = req.user;
    try {
        const { insertUser } = useMutations();
        await insertUser(id, firstName, lastName, email);
    }
    finally {
        return next();
    }
};
//# sourceMappingURL=registerUser.js.map