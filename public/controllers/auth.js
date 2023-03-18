import admin from "../config/firebase-config.js";
import { getHasuraClaims } from "../helpers/getHasuraClaims.js";
export const loginController = async (req, res) => {
    try {
        const uid = req.user.uid;
        const developerClaim = await getHasuraClaims(uid);
        const customToken = await admin
            .auth()
            .createCustomToken(uid, developerClaim);
        res.json({ customToken });
    }
    catch (error) {
        res.status(500).send("INTERNAL ERROR");
    }
};
export const setSessionCookieController = async (req, res) => {
    const idToken = req.body.input.token;
    const expiresIn = 60 * 60 * 24 * 5 * 1000; //5 days
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
        console.log("e2--->", error);
        res.status(401).send("UNAUTHORIZED REQUEST!");
    }
};
export const logoutController = (req, res) => {
    res.clearCookie("__session", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    });
    res.status(200).json({ success: true });
};
//# sourceMappingURL=auth.js.map