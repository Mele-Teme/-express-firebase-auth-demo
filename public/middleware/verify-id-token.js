export const verifyIDToken = async (req, res, next) => {
    const idToken = req.body.input;
    console.log(idToken);
    next();
    // try {
    //   const decodedToken = await admin.auth().verifyIdToken(idToken);
    //   if (decodedToken) {
    //     req.uid = decodedToken.uid;
    //     return next();
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return res.sendStatus(403);
    // }
};
//# sourceMappingURL=verify-id-token.js.map