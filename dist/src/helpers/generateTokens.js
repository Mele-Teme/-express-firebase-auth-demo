import jwt from "jsonwebtoken";
export const generateTokens = (claims) => {
    const accessToken = jwt.sign(claims, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ uid: claims.metadata.user_id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    return { accessToken, refreshToken };
};
//# sourceMappingURL=generateTokens.js.map