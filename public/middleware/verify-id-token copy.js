import admin from "../config/firebase-config.js";
export const verifyIDToken = async (req, res, next) => {
    const idToken = req.body.idToken;
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        if (decodedToken) {
            req.uid = decodedToken.uid;
            return next();
        }
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
};
//# sourceMappingURL=verify-id-token%20copy.js.map