import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { useMutations } from "../graphql/mutation/useMutation.js";
import { generateAccessTokens } from "../helpers/generateTokens.js";
import { getHasuraClaims } from "../helpers/getHasuraClaims.js";

export const registerSupplierController = (req: Request, res: Response) => {
  const { accessToken, tinNumber, subCityId, socialAccount } =
    req.body.input.object;

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (error, decoded) => {
      if (decoded) {
        const { name, metadata, email } = decoded as {
          name: string;
          email: string;
          metadata: { roles: Array<string>; user_id: string };
          iat: number;
          exp: number;
        };

        const { user_id } = metadata;

        const { registerAsSupplier } = useMutations();

        const { success, error } = await registerAsSupplier(user_id, {
          id: user_id,
          social_media: socialAccount,
          subcity_id: subCityId,
          tin_number: tinNumber,
        });

        if (success) {
          const _name = name.split(" ");
          const first_name = _name[0];
          const last_name = _name[1];
          const claims = await getHasuraClaims(
            user_id,
            first_name,
            last_name,
            email
          );

          const accessToken = generateAccessTokens(claims);
          return res.json({ accessToken });
        }
        if (error) return res.status(500).send("INTERNAL ERROR");
      } else {
        return res.status(498).send("INVALID JWT");
      }
    }
  );
};
