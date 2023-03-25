import { getHasuraClaims } from "../helpers/getHasuraClaims.js";
import { generateAccessTokens, generateRefreshTokens, generateNewAccessToken, } from "../helpers/generateTokens.js";
import { useMutations } from "../graphql/mutation/useMutation.js";
import { useQuery } from "../graphql/query/useQuery.js";
export const loginController = async (req, res) => {
    try {
        const { updateUserRefreshToken } = useMutations();
        const { uid, firstName, lastName } = req.user;
        const developerClaim = await getHasuraClaims(uid, firstName, lastName);
        const accessToken = generateAccessTokens(developerClaim);
        const refreshToken = generateRefreshTokens(developerClaim);
        const { error, success } = await updateUserRefreshToken(uid, refreshToken);
        if (success)
            res.json({ accessToken, uid });
        if (error) {
            console.log(error);
            res.status(500).send("INTERNAL ERROR");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL ERROR");
    }
};
export const refreshController = async (req, res) => {
    try {
        const { setRefreshTokenToNull, updateUserRefreshToken } = useMutations();
        const { fetchUserByPk } = useQuery();
        const uid = req.body.uid;
        const response = await fetchUserByPk(uid);
        const { user } = response;
        const refreshToken = user.refresh_token;
        if (refreshToken) {
            const { accessToken, newRefreshToken } = await generateNewAccessToken(refreshToken);
            if (newRefreshToken) {
                await updateUserRefreshToken(uid, newRefreshToken);
            }
            if (accessToken)
                res.json({ accessToken });
            else {
                await setRefreshTokenToNull(uid);
                res.status(440).send("SESSION EXPIRED");
            }
        }
        else {
            await setRefreshTokenToNull(uid);
            res.status(440).send("SESSION EXPIRED");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL ERROR");
    }
};
export const logoutController = async (req, res) => {
    const { uid } = req.body.input;
    const { setRefreshTokenToNull } = useMutations();
    const response = await setRefreshTokenToNull(uid);
    if (response.success) {
        res.json({ success: true });
    }
    else {
        console.log(response.error);
        res.status(500).send("INTERNAL ERROR");
    }
};
//# sourceMappingURL=auth.js.map