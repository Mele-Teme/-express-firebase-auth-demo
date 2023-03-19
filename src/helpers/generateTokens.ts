import jwt from "jsonwebtoken";
export const generateAccessTokens = (claims: {
  name: string;
  metadata: { roles: Array<string>; user_id: string };
}) => {
  const accessToken = jwt.sign(claims, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
  return accessToken;
};
export const generateRefreshTokens = (claims: {
  name: string;
  metadata: { roles: Array<string>; user_id: string };
}) => {
  const refreshToken = jwt.sign(claims, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return refreshToken;
};

export const verifyRefreshToken = async (refreshToken: string) => {
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      console.log(error, decoded);
    }
  );
};
