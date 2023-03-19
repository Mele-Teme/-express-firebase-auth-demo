import jwt from "jsonwebtoken";
export const generateAccessTokens = (claims) => {
    const accessToken = jwt.sign(claims, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1m",
    });
    return accessToken;
};
export const generateRefreshTokens = (claims) => {
    const refreshToken = jwt.sign(claims, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    return refreshToken;
};
export const verifyRefreshToken = async (refreshToken) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
        console.log(error, decoded);
    });
};
//# sourceMappingURL=generateTokens.js.map