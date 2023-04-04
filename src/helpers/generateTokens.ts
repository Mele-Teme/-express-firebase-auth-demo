import jwt from "jsonwebtoken";
export const generateAccessTokens = (claims: {
  name: string;
  email: string;
  metadata: { roles: Array<string>; user_id: string };
}) => {
  const accessToken = jwt.sign(claims, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
    // expiresIn: "30s",
  });
  return accessToken;
};
export const generateRefreshTokens = (claims: {
  name: string;
  email: string;
  metadata: { roles: Array<string>; user_id: string };
}) => {
  const refreshToken = jwt.sign(claims, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10d",
    // expiresIn: "1m",
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
        const { name, metadata, email, exp } = decoded as {
          name: string;
          email: string;
          metadata: { roles: Array<string>; user_id: string };
          iat: number;
          exp: number;
        };
        const claims = {
          name,
          email,
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
