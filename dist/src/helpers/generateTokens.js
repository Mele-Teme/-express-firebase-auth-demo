import jwt from "jsonwebtoken";
export const generateAccessTokens = (claims) => {
    const accessToken = jwt.sign(claims, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30s",
    });
    return accessToken;
};
export const generateRefreshTokens = (claims) => {
    const refreshToken = jwt.sign(claims, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "3m",
    });
    return refreshToken;
};
export const generateNewAccessToken = async (refreshToken) => {
    let accessToken = null;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
        if (decoded) {
            const typedDecoded = decoded;
            const claims = {
                name: typedDecoded.name,
                metadata: typedDecoded.metadata,
            };
            accessToken = generateAccessTokens(claims);
        }
    });
    return accessToken;
};
//# sourceMappingURL=generateTokens.js.map