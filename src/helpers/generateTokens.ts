import jwt from "jsonwebtoken";
export const generateAccessTokens = (claims: {
  name: string;
  metadata: { roles: Array<string>; user_id: string };
}) => {
  const accessToken = jwt.sign(claims, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};
export const generateRefreshTokens = (claims: {
  name: string;
  metadata: { roles: Array<string>; user_id: string };
}) => {
  const refreshToken = jwt.sign(claims, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "3d",
  });
  return refreshToken;
};

export const generateNewAccessToken = async (refreshToken: string) => {
  let accessToken = null;
  let newRefreshToken = null;
  
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (decoded) {
        const { name, metadata, exp } = decoded as {
          name: string;
          metadata: { roles: Array<string>; user_id: string };
          iat: number;
          exp: number;
        };
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
    }
  );

  return { accessToken, newRefreshToken };
};
