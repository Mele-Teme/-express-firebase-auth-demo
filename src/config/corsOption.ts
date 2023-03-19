import { allowedOrigins } from "./allowedOrigins.js";
export const corsOptions = {
  origin: (origin: string, callback: Function) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) callback(null, true);
    else callback(new Error("Not Allowed By Cores"));
  },
  optionsSuccessStatus: 200,
};
