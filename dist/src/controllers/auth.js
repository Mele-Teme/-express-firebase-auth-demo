import admin from "../config/firebase-config.js";
import { getHasuraClaims } from "../helpers/getHasuraClaims.js";
import { generateAccessTokens, generateRefreshTokens, verifyRefreshToken, } from "../helpers/generateTokens.js";
import { graphQLClient } from "../config/graphQLConfig.js";
import { gql } from "graphql-request";
export const loginController = async (req, res) => {
    try {
        const { uid, firstName, lastName } = req.user;
        const developerClaim = await getHasuraClaims(uid, firstName, lastName);
        const accessToken = generateAccessTokens(developerClaim);
        const refreshToken = generateRefreshTokens(developerClaim);
        await graphQLClient.request(gql `
        mutation ($uid: String!, $refreshToken: String) {
          update_users_by_pk(
            pk_columns: { id: $uid }
            _set: { refresh_token: $refreshToken }
          ) {
            refresh_token
          }
        }
      `, {
            uid,
            refreshToken,
        });
        res.json({ accessToken, uid });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL ERROR");
    }
};
export const refreshController = async (req, res) => {
    try {
        console.log(req.body.uid);
        const uid = req.body.uid;
        console.log(process.env.HASURA_GRAPHQL_URL);
        const response = await graphQLClient.request(gql `
        query ($uid: String!) {
          user: users_by_pk(id: $uid) {
            refresh_token
          }
        }
      `, {
            uid,
        });
        const { user } = response;
        const refreshToken = user.refresh_token;
        if (refreshToken) {
            verifyRefreshToken(refreshToken);
            res.json({ response });
        }
        else {
            res.status(440).send("SESSION EXPIRED");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL ERROR");
    }
};
export const logoutController = async (req, res) => {
    const sessionCookie = req.cookies.__session || "";
    res.clearCookie("__session", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    });
    try {
        if (sessionCookie) {
            // cancelling or invalidating user refresh token
            const decodedClaims = await admin
                .auth()
                .verifySessionCookie(sessionCookie);
            await admin.auth().revokeRefreshTokens(decodedClaims.sub);
        }
        res.status(200).json({ success: true });
    }
    catch (error) {
        res.status(404).send("Revoke Refresh Token Error");
    }
};
//# sourceMappingURL=auth.js.map