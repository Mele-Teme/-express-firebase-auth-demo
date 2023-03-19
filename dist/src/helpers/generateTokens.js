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
// [1] null {
// [1]   name: 'Getaye1 Temesgen1',
// [1]   metadata: {
// [1]     roles: [ 'customer', 'admin', 'supplier' ],
// [1]     user_id: 'wKhRtltQ75PvwyUsroGMTjBmwTD2'
// [1]   },
// [1]   iat: 1679250700,
// [1]   exp: 1679855500
// [1] }
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