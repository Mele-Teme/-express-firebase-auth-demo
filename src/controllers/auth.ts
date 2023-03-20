import { Request, Response } from "express";
import admin from "../config/firebase-config.js";
import { getHasuraClaims } from "../helpers/getHasuraClaims.js";
import {
  generateAccessTokens,
  generateRefreshTokens,
  generateNewAccessToken,
} from "../helpers/generateTokens.js";
import { graphQLClient } from "../config/graphQLConfig.js";
import { gql } from "graphql-request";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { uid, firstName, lastName } = req.user;

    const developerClaim = await getHasuraClaims(uid, firstName, lastName);
    const accessToken = generateAccessTokens(developerClaim);
    const refreshToken = generateRefreshTokens(developerClaim);

    await graphQLClient.request(
      gql`
        mutation ($uid: String!, $refreshToken: String) {
          update_users_by_pk(
            pk_columns: { id: $uid }
            _set: { refresh_token: $refreshToken }
          ) {
            refresh_token
          }
        }
      `,
      {
        uid,
        refreshToken,
      }
    );
    res.json({ accessToken, uid });
  } catch (error) {
    console.log(error);

    res.status(500).send("INTERNAL ERROR");
  }
};

export const refreshController = async (req: Request, res: Response) => {
  try {
    const uid = req.body.uid;
    const response = await graphQLClient.request(
      gql`
        query ($uid: String!) {
          user: users_by_pk(id: $uid) {
            refresh_token
          }
        }
      `,
      {
        uid,
      }
    );

    const { user } = response as { user: { refresh_token: string } };
    const refreshToken = user.refresh_token;
    if (refreshToken) {
      const accessToken = await generateNewAccessToken(refreshToken);
      if (accessToken) res.json({ accessToken });
      else {
        await setRefreshTokenToNull(uid);
        res.status(440).send("SESSION EXPIRED");
      }
    } else {
      await setRefreshTokenToNull(uid);
      res.status(440).send("SESSION EXPIRED");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("INTERNAL ERROR");
  }
};

const setRefreshTokenToNull = async (uid: string) => {
  try {
    const response = await graphQLClient.request(
      gql`
        mutation ($uid: String!) {
          update_users_by_pk(
            pk_columns: { id: $uid }
            _set: { refresh_token: null }
          ) {
            refresh_token
          }
        }
      `,
      {
        uid,
      }
    );
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
};

export const logoutController = async (req: Request, res: Response) => {
  const { uid } = req.body.input;

  const response = await setRefreshTokenToNull(uid);
  if (response.success) {
    res.json({ success: true });
  } else {
    console.log(response.error);
    res.status(500).send("INTERNAL ERROR");
  }
};
