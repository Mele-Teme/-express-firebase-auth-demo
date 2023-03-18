import admin from "../config/firebase-config.js";
export const verifyIDToken = async (req, res, next) => {
    const idToken = req.body.input.token;
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        // if (decodedToken.email_verified) {
        const user = await admin.auth().getUser(decodedToken.uid);
        // const userName = user.displayName?.split(" ");
        req.user = {
            uid: user.uid,
            email: user.email,
            firstName: "Geatye",
            lastName: "temesgen",
        };
        return next();
        // } else return res.sendStatus(403).send("Email Not Verified");
    }
    catch (error) {
        console.log("Verify Token Error: ---->", error);
        return res.status(401).send("UNAUTHORIZED REQUEST!");
    }
};
export const verifyIDTokenForSessionCreation = async (req, res, next) => {
    const idToken = req.body.input.token;
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        // Only process if the user just signed in in the last 3 minutes.
        if (new Date().getTime() / 1000 - decodedToken.auth_time < 3 * 60) {
            req.user = {
                uid: decodedToken.uid,
                email: decodedToken.email,
                firstName: null,
                lastName: null,
            };
            return next();
        }
        else {
            console.log("e1==> RECENT SIGN IN REQUIRED!");
            res.status(401).send("RECENT SIGN IN REQUIRED!");
        }
    }
    catch (error) {
        console.log("Verify Token Error: ---->", error);
        return res.status(401).send("UNAUTHORIZED REQUEST!");
    }
};
//# sourceMappingURL=verifyIDToken.js.map