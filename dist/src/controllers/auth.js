import admin from "../config/firebase-config.js";
import { getHasuraClaims } from "../helpers/getHasuraClaims.js";
import { generateTokens } from "../helpers/generateTokens.js";
import { graphQLClient } from "../config/graphQLConfig.js";
import { gql } from "graphql-request";
export const loginController = async (req, res) => {
    console.log("finally dershalew");
    try {
        const { uid, firstName, lastName } = req.user;
        const developerClaim = await getHasuraClaims(uid, firstName, lastName);
        const { accessToken, refreshToken } = generateTokens(developerClaim);
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
        // res.json({ accessToken });
        res.send("ok");
    }
    catch (error) {
        res.status(500).send("INTERNAL ERROR");
    }
};
export const setSessionCookieController = async (req, res) => {
    const idToken = req.body.input.token;
    const expiresIn = 60 * 60 * 24 * 7 * 1000; //5 days
    try {
        const sessionCookie = await admin
            .auth()
            .createSessionCookie(idToken, { expiresIn });
        res.cookie("__session", sessionCookie, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });
        res.status(200).json({ uid: req.user.uid });
    }
    catch (error) {
        res.status(401).send("UNAUTHORIZED REQUEST!");
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