import { allowedOrigins } from "./allowedOrigins.js";
export const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin)
            callback(null, true);
        else
            callback(new Error("Not Allowed By Cores"));
    },
    optionsSuccessStatus: 200,
};
//# sourceMappingURL=corsOption.js.map