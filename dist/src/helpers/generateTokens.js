import jwt from "jsonwebtoken";
export const generateAccessTokens = (claims) => {
    const accessToken = jwt.sign(claims, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
    return accessToken;
};
export const generateRefreshTokens = (claims) => {
    const refreshToken = jwt.sign(claims, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "3d",
    });
    return refreshToken;
};
export const generateNewAccessToken = async (refreshToken) => {
    let accessToken = null;
    let newRefreshToken = null;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
        if (decoded) {
            const { name, metadata, exp } = decoded;
            const claims = {
                name,
                metadata,
            };
            accessToken = generateAccessTokens(claims);
            const currentDate = Date.now();
            const refTokenExpDate = exp * 1000;
            // if dif is less than 1Day refresh the refreshToken
            if (refTokenExpDate - currentDate < 86400000)
                newRefreshToken = generateRefreshTokens(claims);
        }
    });
    return { accessToken, newRefreshToken };
};
//# sourceMappingURL=generateTokens.js.map